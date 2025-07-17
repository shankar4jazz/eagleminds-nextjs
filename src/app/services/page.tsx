"use client";

import Link from "next/link";
import { ArrowRight, Code, Database, Globe, Shield, Zap, Users, CheckCircle, Star, TrendingUp, Sparkles, Rocket, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: [
        "Next.js 15 & React 19 Applications",
        "E-commerce Solutions",
        "Progressive Web Apps",
        "Custom Web Applications"
      ],
      gradient: "from-blue-500 to-cyan-500",
      price: "Starting at $5,000"
    },
    {
      icon: Globe,
      title: "SaaS Solutions",
      description: "Scalable software-as-a-service platforms for growing businesses",
      features: [
        "TrackNew - Project Management",
        "TamilanJobs - Job Portal",
        "ParkNew - Parking Management",
        "Custom SaaS Development"
      ],
      gradient: "from-purple-500 to-pink-500",
      price: "Starting at $15,000"
    },
    {
      icon: Database,
      title: "Database Solutions",
      description: "Robust database design, optimization, and management services",
      features: [
        "PostgreSQL & MySQL",
        "Database Migration",
        "Performance Optimization",
        "Data Analytics"
      ],
      gradient: "from-green-500 to-emerald-500",
      price: "Starting at $3,000"
    },
    {
      icon: Zap,
      title: "Cloud Services",
      description: "Scalable cloud infrastructure and deployment solutions",
      features: [
        "AWS & Vercel Deployment",
        "CI/CD Pipelines",
        "Cloud Migration",
        "DevOps Solutions"
      ],
      gradient: "from-yellow-500 to-orange-500",
      price: "Starting at $8,000"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Comprehensive security solutions and compliance management",
      features: [
        "Security Audits",
        "GDPR Compliance",
        "Data Protection",
        "Vulnerability Assessment"
      ],
      gradient: "from-red-500 to-rose-500",
      price: "Starting at $4,000"
    },
    {
      icon: Users,
      title: "Consulting Services",
      description: "Expert guidance for your digital transformation journey",
      features: [
        "Technology Strategy",
        "System Architecture",
        "Process Optimization",
        "Team Training"
      ],
      gradient: "from-indigo-500 to-purple-500",
      price: "Starting at $2,000"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "Understanding your business requirements and goals",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Design & Architecture",
      description: "Strategic planning and technical architecture design",
      icon: "🎨"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Agile development with regular progress updates",
      icon: "⚡"
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Deployment, testing, and ongoing maintenance",
      icon: "🚀"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-48 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium text-white">Premium Digital Services</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold text-white mb-6 leading-none"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Services
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Comprehensive technology solutions designed to transform your business 
              and drive digital innovation with cutting-edge technologies.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-16"
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-2xl" asChild>
                <Link href="/services/request">
                  <Rocket className="mr-2 h-5 w-5" />
                  Request Service
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm" asChild>
                <Link href="/contact">
                  <Target className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">What We Offer</span>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Next-Generation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your business with our cutting-edge technology solutions and expert services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardHeader className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {service.price}
                      </span>
                    </div>
                    <CardDescription className="text-gray-600 text-lg">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
                        asChild
                      >
                        <Link href="/services/request">
                          Request This Service
                        </Link>
                      </Button>
                      <Button variant="outline" className="rounded-full" asChild>
                        <Link href="/contact">
                          Learn More
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Our Process</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                How We Work
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery from start to finish
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white/70">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-4 -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Award className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Ready to Start?</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Build Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Digital Future
              </span>
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Ready to transform your business? Let's discuss how we can help you achieve 
              your digital goals with our expert services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full shadow-2xl" asChild>
                <Link href="/services/request">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Project
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm" asChild>
                <Link href="/contact">
                  <Target className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}