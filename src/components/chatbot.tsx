
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Loader2, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { chat, ChatMessage } from "@/ai/flows/chat-flow";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', content: "Hello! I'm the LuxmiSweets assistant. How can I help you today? You can ask me about our menu, hours, or how to place an order." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A slight delay to allow the new message to render
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 100);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage];
      const botResponse = await chat(chatHistory);
      setMessages((prev) => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { role: 'bot', content: "Sorry, I'm having a little trouble right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-[calc(100vw-2rem)] max-w-sm"
            >
              <Card className="h-[70vh] flex flex-col shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between border-b">
                  <div className="flex items-center gap-2">
                    <Bot className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-lg">LuxmiSweets Assistant</CardTitle>
                  </div>
                   <Button variant="ghost" size="icon" onClick={toggleOpen} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="p-4 space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-start gap-3",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {message.role === "bot" && (
                            <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                              <Bot className="h-5 w-5" />
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                              message.role === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary"
                            )}
                          >
                            {message.content}
                          </div>
                           {message.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                           <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                              <Bot className="h-5 w-5" />
                            </Avatar>
                          <div className="bg-secondary px-4 py-2 rounded-lg flex items-center gap-2">
                             <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                             <span className="text-sm text-muted-foreground">Thinking...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about our sweets..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}>
          <Button
            onClick={toggleOpen}
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
          >
            <AnimatePresence>
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }}>
                    <X className="h-8 w-8" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }}>
                    <MessageCircle className="h-8 w-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
