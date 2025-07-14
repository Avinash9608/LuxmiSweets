"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, MessageCircle, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import React from "react";

const formSchema = z.object({
  category: z.string({ required_error: "Please select a category." }),
  notes: z.string().max(500, "Notes must be 500 characters or less.").optional(),
  pickupTime: z.date({ required_error: "A pickup date is required." }),
  image: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function OrderForm() {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = React.useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
      form.setValue("image", event.target.files[0]);
    }
  };
  
  const generateMessage = (data: FormData) => {
    return `
New Custom Order:
Category: ${data.category}
Pickup Time: ${format(data.pickupTime, "PPP")}
Notes: ${data.notes || "No notes provided."}
${fileName ? `Reference image attached: ${fileName}` : ''}
    `.trim();
  };

  const handleWhatsAppOrder = (data: FormData) => {
    const message = generateMessage(data);
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "Redirecting to WhatsApp",
      description: "Please send the pre-filled message to place your order.",
    });
  };

  const handleEmailOrder = (data: FormData) => {
    const message = generateMessage(data);
    const subject = "New Custom Order from LuxmiSweet Delights";
    const mailtoUrl = `mailto:orders@luxmisweet.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.open(mailtoUrl, "_blank");
     toast({
      title: "Opening Email Client",
      description: "Please send the pre-filled email to place your order.",
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Create Your Custom Delight</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sweet category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cake">Cake</SelectItem>
                      <SelectItem value="Sweets">Sweets</SelectItem>
                      <SelectItem value="Cold Drink">Cold Drink</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Happy Birthday!', specific design ideas, dietary restrictions..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Delivery/Pickup Time</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel>Reference Image</FormLabel>
              <FormControl>
                 <Button variant="outline" className="w-full justify-start" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    {fileName || "Upload an image"}
                 </Button>
              </FormControl>
              <Input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
                accept="image/*"
              />
              <FormMessage />
            </FormItem>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <Button type="button" onClick={form.handleSubmit(handleWhatsAppOrder)} className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" /> Order on WhatsApp
              </Button>
              <Button type="button" onClick={form.handleSubmit(handleEmailOrder)} className="w-full">
                 <Mail className="mr-2 h-4 w-4" /> Order via Email
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
