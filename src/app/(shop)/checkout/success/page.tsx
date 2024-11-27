"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Ödemeniz Başarıyla Tamamlandı!
          </h1>
          
          <p className="mt-4 text-gray-600">
            Siparişiniz alındı ve en kısa sürede hazırlanacak. Sipariş detaylarınız e-posta adresinize gönderilecektir.
          </p>

          <div className="mt-8 space-y-4">
            <Link
              href="/orders"
              className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Siparişlerimi Görüntüle
            </Link>
            
            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
