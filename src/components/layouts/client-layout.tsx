
"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/loader";
import DefaultLayout from "@/components/layouts/default-layout";
import { motion } from "framer-motion";
import ChakraProviderWrapper from "@/providers/ChakraProvider";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.5 } },
  };

  return (
    <>
      <ChakraProviderWrapper>
       <DefaultLayout>
         {loading ? (
           <Loader />
         ) : (
           <motion.div
             initial="hidden"
             animate="enter"
             exit="exit"
             variants={variants}
           >
             {children}
           </motion.div>
         )}
       </DefaultLayout>
     </ChakraProviderWrapper>
    </>
  );
}
