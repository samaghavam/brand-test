"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/shared/button";
import { useTranslation } from "react-i18next";

export default function StepThree() {
  const router = useRouter();
  const { t } = useTranslation();

  // Animation variants
  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  // Confetti animation variants
  const confettiVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const handleRegisterAnother = () => {
    router.push("/step/1");
  };

  const handleViewBrands = () => {
    router.push("/explore");
  };

  return (
    <motion.div 
      className="text-center py-8"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {/* Confetti elements */}
      <div className="relative h-20 mb-4">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={confettiVariants}
            initial="hidden"
            animate="visible"
            className="absolute"
            style={{
              left: `${10 + (i * 8)}%`,
              top: i % 2 === 0 ? '10%' : '50%',
              width: '8px',
              height: '8px',
              borderRadius: i % 3 === 0 ? '50%' : '0',
              background: i % 3 === 0 ? '#4F46E5' : i % 3 === 1 ? '#10B981' : '#F59E0B',
              transform: `rotate(${i * 45}deg)`
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          {t('brand.success.title', 'Brand Successfully Registered!')}
        </h1>
      </motion.div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {t('brand.success.message', 'Your brand has been successfully registered in our system.')}
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={handleRegisterAnother} variant="outline">
          {t('brand.success.registerAnother', 'Register Another Brand')}
        </Button>
        
        <Button onClick={handleViewBrands}>
          {t('brand.success.viewBrands', 'View All Brands')}
        </Button>
      </div>
    </motion.div>
  );
}
