"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedGradientTextHero } from "../animated-text";
import image from "../../app/assets/appshots-hero.png";
import { Volume2 as _Volume2 } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center pt-10 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-poppins-extrabold text-center"
        variants={itemVariants}
      >
        with{" "}
        <motion.span
          className="bg-black text-white p-1 px-2 rounded-xl text-3xl inline-block"
          variants={floatingVariants as any}
          animate="float"
        >
          appshots
        </motion.span>{" "}
        create app store <span className="underline">screenshots</span> in
        seconds
      </motion.h1>
      <motion.p
        className="font-poppins font-normal text-gray-400 text-sm max-w-md mt-8 text-center"
        variants={itemVariants}
      >
        You can now design & export screenshots for your apple connect in all
        required sizes that being 6.7", 6.1". 5.4"
      </motion.p>

      <motion.div variants={itemVariants}>
        <AnimatedGradientTextHero />
      </motion.div>

      <motion.div
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          height={500}
          alt="App screenshots"
          src={image}
          className="object-cover mt-10"
        />
      </motion.div>

      <motion.p className="mt-5 mb-3 text-xs" variants={itemVariants}>
        Built by{" "}
        <a
          className="underline"
          target="_blank"
          href="https://x.com/khushaal_04"
          rel="noopener noreferrer"
        >
          Khushaal
        </a>{" "}
        with 🫶
      </motion.p>
    </motion.div>
  );
}
