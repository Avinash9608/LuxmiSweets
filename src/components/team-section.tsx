
"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Ramesh Kumar",
    role: "Founder & Head Chef",
    image: "https://images.unsplash.com/photo-1708494204520-9b173ddcd627?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHJhbWVzaHxlbnwwfHwwfHx8MA%3D%3D",
    hint: "indian man portrait",
  },
  {
    name: "Sita Devi",
    role: "Sweet Specialist",
    image: "https://images.unsplash.com/photo-1575992009113-f4410734aad8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybCUyMGluZGlhfGVufDB8fDB8fHww",
    hint: "indian woman portrait",
  },
  {
    name: "Sonu Kumar",
    role: "Cake Designer",
    image: "https://images.unsplash.com/photo-1692592611113-f4c0d0f36ea0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJveSUyMGluZGlhfGVufDB8fDB8fHww",
    hint: "young indian man",
  },
  {
    name: "Ajay Kumar",
    role: "Orders & Delivery",
    image: "https://images.unsplash.com/photo-1633573745590-4154e1eb56b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGJveSUyMGluZGlhfGVufDB8fDB8fHww",
    hint: "man smiling",
  },
];

export function TeamSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 15 }
    },
  };
  
  return (
    <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
            The People Behind the Taste
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            We are a family-run business, passionate about bringing you the best handmade sweets and cakes.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              className="flex flex-col items-center space-y-3"
              variants={itemVariants}
            >
              <div className="relative w-36 h-36">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={144}
                  height={144}
                  data-ai-hint={member.hint}
                  className="rounded-full object-cover shadow-lg border-4 border-white dark:border-secondary transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-lg font-bold font-headline">{member.name}</h3>
                <p className="text-sm text-primary dark:text-accent font-semibold">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid lg:grid-cols-5 gap-12 items-center mt-16 md:mt-24 max-w-5xl mx-auto">
            <div className="lg:col-span-3 space-y-4 text-center lg:text-left">
                <h3 className="text-2xl font-bold font-headline">From a Small Counter to a Sweet Haven</h3>
                <p className="text-muted-foreground">
                  We started as a small snack counter with just samosa and tea. Over time, with love and support from our community, we’ve grown into a full sweet and cake shop. We are now crafting customized cakes for birthdays, weddings, and all your special celebrations. Every single item is handmade with care by our family, with some help from our trusted local staff.
                </p>
                 <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground mt-6">
                   “We don’t just sell sweets — we serve emotions made with love.”
                </blockquote>
            </div>
            <div className="lg:col-span-2 relative aspect-square">
                 <Image 
                    src="https://images.unsplash.com/photo-1572095755818-8fd546d228a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fENha2UlMjBzd2VldHMlMjBzaG9wfGVufDB8fDB8fHww"
                    data-ai-hint="sweet shop"
                    alt="Interior of a sweet shop"
                    fill
                    className="rounded-lg shadow-lg object-cover transform transition-transform duration-500 hover:scale-105"
                />
            </div>
        </div>

      </div>
    </section>
  );
}
