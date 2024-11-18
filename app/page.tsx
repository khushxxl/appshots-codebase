"use client";
import Examples from "@/components/landing/examples";
import Hero from "@/components/landing/hero";
import React from "react";

function Page() {
  return (
    <div className="w-full  max-w-7xl mx-auto ">
      <Hero />
      <Examples />
    </div>
  );
}

export default Page;
