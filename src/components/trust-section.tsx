"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, ShieldCheck, HeartHandshake } from "lucide-react";

const trustBadges = [
  {
    icon: Users,
    title: "1000+ Happy Customers",
    description: "Loved by families all over Lakhna and beyond for our authentic taste.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    icon: Calendar,
    title: "Serving Since 2015",
    description: "A legacy of trust and quality, growing with our community over the years.",
     color: "from-teal-500 to-cyan-400",
  },
  {
    icon: ShieldCheck,
    title: "Clean & Hygienic",
    description: "All items made in-house with the freshest ingredients and highest standards.",
    color: "from-blue-500 to-sky-400",
  },
  {
    icon: HeartHandshake,
    title: "Family-Crafted with Love",
    description: "Every sweet is handmade in our family kitchen, serving emotions with every bite.",
    color: "from-rose-500 to-pink-400",
  },
];

export function TrustSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section id="trust" className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-700/40"></div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground">
            Why People Trust LuxmiSweet
          </h2>
          <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
            Our commitment to quality, tradition, and our community.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              className="relative rounded-xl p-6 overflow-hidden bg-white/50 dark:bg-black/50 backdrop-blur-md shadow-lg border border-white/20"
              variants={itemVariants}
            >
              <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-bl ${badge.color} opacity-20 blur-2xl`}></div>
              <div className="relative z-10">
                <div className={`mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${badge.color} text-white shadow-md`}>
                  <badge.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold font-headline text-foreground">{badge.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
