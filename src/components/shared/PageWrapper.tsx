// src/components/shared/PageWrapper.tsx
"use client";
import { motion } from "framer-motion";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "circOut" }}
        >
            {children}
        </motion.div>
    );
};