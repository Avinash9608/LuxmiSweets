
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Loader2, Bot, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { chat, ChatHistory } from "@/ai/flows/chat-flow";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatHistory>([
    { role: 'bot', content: "Hello! I'm the LuxmiSweets assistant. How can I help you today? You can ask me about our menu, hours, or how to place an order." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (scrollAreaRef.current) {
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

    const userMessage: {role: 'user', content: string} = { role: 'user', content: input };
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
              <Card className="h-[70vh] flex flex-col shadow-2xl bg-secondary/30 backdrop-blur-lg">
                <CardHeader className="flex flex-row items-center justify-between border-b bg-background/80">
                  <div className="flex items-center gap-3">
                     <Avatar className="h-9 w-9 border-2 border-primary/50">
                      <div className="bg-primary h-full w-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                    </Avatar>
                    <div>
                      <CardTitle className="font-headline text-lg text-foreground">LuxmiSweets Assistant</CardTitle>
                      <p className="text-xs text-primary flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Online
                      </p>
                    </div>
                  </div>
                   <Button variant="ghost" size="icon" onClick={toggleOpen} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="p-4 space-y-6">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-end gap-2.5",
                            message.role === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {message.role === "bot" && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                               <div className="bg-primary h-full w-full flex items-center justify-center">
                                <Bot className="h-4 w-4 text-primary-foreground" />
                              </div>
                            </Avatar>
                          )}
                          <motion.div
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ duration: 0.3, delay: 0.1 * index }}
                            className={cn(
                              "max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm shadow-md",
                              message.role === "user"
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-background text-foreground rounded-bl-none"
                            )}
                          >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </motion.div>
                           {message.role === 'user' && (
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                    <div className="bg-muted h-full w-full flex items-center justify-center">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                </Avatar>
                            )}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex items-end gap-2.5 justify-start">
                           <Avatar className="h-8 w-8 flex-shrink-0">
                               <div className="bg-primary h-full w-full flex items-center justify-center">
                                <Bot className="h-4 w-4 text-primary-foreground" />
                              </div>
                            </Avatar>
                          <div className="bg-background px-4 py-2 rounded-lg flex items-center gap-2 rounded-bl-none shadow-md">
                             <div className="flex items-center gap-1.5">
                               <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                               <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                               <span className="h-1.5 w-1.5 bg-muted-foreground rounded-full animate-pulse"></span>
                             </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t bg-background/80 pt-4">
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
