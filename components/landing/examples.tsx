import Image from "next/image";
import React, { useEffect, useState } from "react";
import example1 from "../../app/assets/eg1.png";
import example2 from "../../app/assets/eg2.png";
import bgsky from "../../app/assets/bsky-eg.png";
import { motion, useInView } from "framer-motion";

function Examples() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="w-full flex flex-col items-center justify-center pt-20 min-h-screen mt-10"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.h1 className="text-2xl" variants={itemVariants}>
        a few more examples made with appshots
      </motion.h1>
      <div className="mt-10 flex items-center justify-evenly w-full max-w-5xl">
        {isLoaded && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              alt=""
              src={example1}
              height={400}
              className="object-contain"
            />
          </motion.div>
        )}
        {isLoaded && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image alt="" src={bgsky} height={500} className="object-contain" />
          </motion.div>
        )}
        {isLoaded && (
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              alt=""
              src={example2}
              height={400}
              width={200}
              className="object-contain"
            />
          </motion.div>
        )}
      </div>

      <motion.h1 className="text-lg mt-5 underline" variants={itemVariants}>
        c'mon get started, its FREE
      </motion.h1>
      <motion.p className="mt-20 mb-3 text-xs" variants={itemVariants}>
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

export default Examples;
