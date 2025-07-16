
'use server';

/**
 * @fileOverview A chatbot flow for LuxmiSweets.
 * 
 * - chat - A function that handles the chatbot conversation.
 * - ChatMessage - The type for a single chat message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import MenuItemModel from '@/models/MenuItem';
import { connectDB } from '@/lib/db';
import { menuSeedData } from '@/lib/menu-seed-data';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model', 'system', 'tool']),
  content: z.array(z.object({text: z.string()})),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatInputSchema = z.array(z.object({
  role: z.enum(['user', 'bot']),
  content: z.string(),
}));

export type ChatHistory = z.infer<typeof ChatInputSchema>;


// This is the main function the frontend will call
export async function chat(history: ChatHistory): Promise<string> {
    if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
        return "I'm sorry, the chatbot feature is not configured on the server. An API key is required.";
    }

  // Check if DB is configured, if not, use seed data as a fallback.
  const db = await connectDB();
  let menuItems;
  if (db) {
    // Using lean() for performance, as we only need plain JS objects
    menuItems = await MenuItemModel.find({}).lean();
  } else {
    // If DB is not available, use the seed data
    menuItems = menuSeedData;
  }
  
  // Format the menu items into a string for the prompt
  const menuString = menuItems.map(item => 
    `- ${item.name} (${item.category}): ₹${item.price} ${item.priceUnit || ''}`
  ).join('\n');

  const response = await chatFlow({ history, menu: menuString });
  return response || "I'm sorry, I couldn't process that. Please try again.";
}

// Define the structured input for our Genkit flow
const FlowInputSchema = z.object({
    history: ChatInputSchema,
    menu: z.string(),
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: FlowInputSchema,
    outputSchema: z.string(),
  },
  async ({ history, menu }) => {
    
    const systemPrompt = `You are a friendly and helpful customer service assistant for a local sweet shop called LuxmiSweets. Your goal is to answer customer questions accurately and encourage them to place an order.

      Here is the current menu:
      ${menu}

      Shop Information:
      - Location: Main Road, Lakhna, Bihar – 804453
      - Hours: Open Daily: 8:00 AM – 10:00 PM
      - Contact: You can place orders via WhatsApp at +91 91234 56789 or via email at orders@luxmisweets.com. You can also visit the store.
      - Custom Orders: For custom cakes or large orders, we recommend ordering at least 24 hours in advance.

      Conversation Rules:
      - Keep your answers concise and friendly.
      - If you don't know the answer, say "I'm not sure about that, but you can contact the shop directly to find out."
      - When asked about the menu, use the provided list.
      - Always be polite and helpful.
      - Do not make up information, prices, or items not on the menu.
      `;

    // Map the 'bot' role to 'model' for the Genkit history
    const messages: ChatMessage[] = history.map(msg => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        content: [{ text: msg.content }]
    }));

    // Generate the chat response using the Gemini model
    const response = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      messages: [
        { role: 'system', content: [{ text: systemPrompt }] },
        ...messages
      ],
      config: {
        temperature: 0.3,
      },
    });

    return response.text;
  }
);
