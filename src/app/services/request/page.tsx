"use client";

import ServiceForm from "@/components/service-form";
import { motion } from "framer-motion";

export default function ServiceRequestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_50%,transparent_75%)] bg-[length:20px_20px]" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse delay-2000" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Start Your Project Today
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your vision into reality? Fill out our detailed service request form 
            and let our expert team create a custom solution tailored to your specific needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ServiceForm />
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Response</h3>
              <p className="text-gray-600">We respond to all service requests within 24 hours</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Team</h3>
              <p className="text-gray-600">Experienced professionals dedicated to your success</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Custom Solutions</h3>
              <p className="text-gray-600">Tailored services that fit your unique requirements</p>
            </div>
          </div>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures you get the best service from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Submit Request",
                description: "Fill out our detailed form with your project requirements",
                icon: "📝"
              },
              {
                step: "2",
                title: "Initial Consultation",
                description: "We'll contact you within 24 hours to discuss your needs",
                icon: "💬"
              },
              {
                step: "3",
                title: "Proposal & Quote",
                description: "Receive a detailed proposal with timeline and pricing",
                icon: "📊"
              },
              {
                step: "4",
                title: "Project Delivery",
                description: "We execute your project with regular updates and support",
                icon: "🚀"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-4 -translate-y-1/2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}