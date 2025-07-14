
// This file is empty, but it's a good practice to have it for future server actions.
"use server";

import * as z from "zod";
import nodemailer from "nodemailer";

const formSchema = z.object({
  category: z.string(),
  notes: z.string().optional(),
  pickupTime: z.string(), 
  fileName: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;


const quickOrderSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  location: z.string(),
  itemName: z.string(),
  itemPrice: z.string(),
});

type QuickOrderData = z.infer<typeof quickOrderSchema>;


const generateHtmlMessage = (data: FormData) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #673AB7;">New Custom Order Request</h2>
        <p>You've received a new custom order with the following details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Category:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.category}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Pickup/Delivery Date:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.pickupTime}</td>
          </tr>
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Custom Notes:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.notes || "No notes provided."}</td>
          </tr>
          ${data.fileName ? `
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Reference Image:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">An image was attached by the customer. Please check the attachment if the email client supports it, or request it from them. (${data.fileName})</td>
          </tr>` : ''}
        </table>
        <p style="margin-top: 20px;">Please contact the customer to confirm the order details and provide payment information.</p>
        <p style="color: #673AB7; font-weight: bold;">LuxmiSweets</p>
      </div>
    `;
};

const generateQuickOrderHtmlMessage = (data: QuickOrderData) => {
    return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #673AB7;">New Quick Order Request</h2>
        <p>You've received a new quick order from the menu. Please contact the customer to confirm.</p>
        
        <h3 style="color: #673AB7; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-top: 20px;">Item Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="background-color: #f2f2f2;">
            <td style="padding: 12px; border: 1px solid #ddd; width: 30%;"><strong>Item:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.itemName}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #ddd;"><strong>Price:</strong></td>
            <td style="padding: 12px; border: 1px solid #ddd;">${data.itemPrice}</td>
          </tr>
        </table>

        <h3 style="color: #673AB7; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-top: 20px;">Customer Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f2f2f2;">
                <td style="padding: 12px; border: 1px solid #ddd; width: 30%;"><strong>Name:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data.name}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td>
            </tr>
            <tr style="background-color: #f2f2f2;">
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data.phone || "Not provided"}</td>
            </tr>
            <tr>
                <td style="padding: 12px; border: 1px solid #ddd;"><strong>Location:</strong></td>
                <td style="padding: 12px; border: 1px solid #ddd;">${data.location}</td>
            </tr>
        </table>
        
        <p style="margin-top: 20px; font-style: italic;">Please reach out to the customer to finalize the order and arrange payment.</p>
        <p style="color: #673AB7; font-weight: bold; margin-top: 30px;">LuxmiSweets</p>
      </div>
    `;
};


export async function sendOrderEmail(data: FormData) {
  const parsedData = formSchema.safeParse(data);

  if (!parsedData.success) {
    return { success: false, message: "Invalid form data." };
  }

  const { category, notes, pickupTime, fileName } = parsedData.data;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"LuxmiSweets Orders" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, 
    subject: `New Custom Order: ${category}`,
    html: generateHtmlMessage({ category, notes, pickupTime, fileName }),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Order email sent successfully!" };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, message: "Failed to send order email. Please try again." };
  }
}

export async function sendQuickOrderEmail(data: QuickOrderData) {
  const parsedData = quickOrderSchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Invalid quick order data:", parsedData.error.flatten());
    return { success: false, message: "Invalid data for quick order." };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: Number(process.env.EMAIL_PORT) === 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"LuxmiSweets Quick Orders" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Quick Order: ${parsedData.data.itemName}`,
    html: generateQuickOrderHtmlMessage(parsedData.data),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Quick order email sent successfully!" };
  } catch (error) {
    console.error("Failed to send quick order email:", error);
    return { success: false, message: "Failed to send quick order email. Please try again." };
  }
}
