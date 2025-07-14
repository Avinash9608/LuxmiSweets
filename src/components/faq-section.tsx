import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageCircle } from "lucide-react";

const faqData = [
  {
    question: "Do you offer cake customization?",
    answer: "Yes! You can customize cakes by design, flavor, size, and message. Just place your request via WhatsApp or email with your details."
  },
  {
    question: "How much time before should I place my order?",
    answer: "We recommend placing customized cake or large sweet orders at least 24 hours in advance."
  },
  {
    question: "Is home delivery available in Lakhna?",
    answer: "Yes, we offer home delivery within Lakhna. Delivery charges may apply based on location and order amount."
  },
  {
    question: "What is the payment method?",
    answer: "Currently, we accept Cash on Delivery or UPI on delivery. No online payment required during order."
  },
  {
    question: "What types of sweets are available?",
    answer: "We offer traditional sweets like Ladoo, Barfi, Gulab Jamun, Rasgulla, and seasonal specials. Check our Menu section for details."
  },
  {
    question: "How will I know if my order is confirmed?",
    answer: "After you place the order via WhatsApp or email, our team will confirm it shortly via message or call."
  }
];

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Frequently Asked Questions</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Have questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a
                href="https://wa.me/919123456789"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Chat on WhatsApp
              </a>
              <a
                href="mailto:orders@luxmisweets.com"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                <Mail className="mr-2 h-4 w-4" /> Email Us
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
