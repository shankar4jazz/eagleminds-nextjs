"use client";

import Link from "next/link";
import { ArrowRight, Code, Database, Globe, Shield, Zap, Users, Star, TrendingUp, Award, CheckCircle2, Sparkles, Rocket, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [stats, setStats] = useState({
    totalProjects: 50,
    clientSatisfaction: 98,
    totalServices: 6
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats({
          totalProjects: data.stats.totalLeads || 50, // Using leads as project inquiries
          clientSatisfaction: 98, // Keep static for now
          totalServices: data.stats.totalServices || 6
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Keep fallback values
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Navigation />
      
      {/* Hero Section - Text Left, Animated Image Right */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen gap-12 py-20">
            
            {/* Left Side - Text Content */}
            <div className="flex-1 text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
                  <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm font-medium text-white">Transforming Ideas into Digital Reality</span>
                </div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  EagleMinds
                </span>
                <br />
                <span className="text-white/90">Technologies</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed"
              >
                We craft cutting-edge digital solutions with AI-powered development, 
                cloud-native architecture, and modern user experiences that drive business growth.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-16"
              >
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full shadow-2xl" asChild>
                  <Link href="/services/request">
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm" asChild>
                  <Link href="/services">
                    <Target className="mr-2 h-5 w-5" />
                    Explore Services
                  </Link>
                </Button>
              </motion.div>

              {/* Modern Stats with Glassmorphism */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stats.totalProjects}+</div>
                  <div className="text-white/70">Project Inquiries</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stats.clientSatisfaction}%</div>
                  <div className="text-white/70">Client Satisfaction</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stats.totalServices}</div>
                  <div className="text-white/70">Services Offered</div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Animated Image/Visual */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative w-full max-w-2xl"
              >
                {/* Main Animated Container */}
                <div className="relative">
                  {/* Central Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-2xl"
                  >
                    <Code className="w-8 h-8 text-white" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, 20, 0],
                      rotate: [0, -360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl"
                  >
                    <Database className="w-10 h-10 text-white" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                    className="absolute bottom-20 left-16 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-2xl"
                  >
                    <Globe className="w-7 h-7 text-white" />
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, 25, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute bottom-10 right-10 w-18 h-18 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl"
                  >
                    <Zap className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Central Main Visual */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, 0, -2, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative z-10 w-80 h-80 mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-2xl"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-slate-800/50 to-gray-900/50 rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-60 h-60 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full border border-white/10 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="w-40 h-40 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
                        >
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{
                              duration: 15,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <Sparkles className="w-16 h-16 text-white" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Orbital Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 border-2 border-white/10 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-4 border border-white/5 rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section - Modern Card Design */}
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
              <Star className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Our Expertise</span>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Next-Gen Digital Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build scalable, secure, and innovative solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "AI-Powered Development",
                description: "Next.js 15, React 19, and AI-assisted development",
                features: ["Next.js 15 & React 19", "AI Code Generation", "Real-time Collaboration", "Performance Optimization"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Globe,
                title: "Cloud-Native SaaS",
                description: "Scalable software platforms with microservices architecture",
                features: ["Microservices Architecture", "Auto-scaling Infrastructure", "Global CDN", "Real-time Analytics"],
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Database,
                title: "Modern Data Solutions",
                description: "Advanced database design with AI-powered analytics",
                features: ["PostgreSQL & MongoDB", "Real-time Sync", "AI Analytics", "Data Visualization"],
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Serverless Architecture",
                description: "Edge computing and serverless solutions",
                features: ["Edge Functions", "Serverless APIs", "Auto-scaling", "Cost Optimization"],
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Zero-Trust Security",
                description: "Enterprise-grade security with compliance",
                features: ["Zero-Trust Architecture", "End-to-end Encryption", "GDPR Compliance", "Real-time Monitoring"],
                gradient: "from-red-500 to-rose-500"
              },
              {
                icon: Users,
                title: "Digital Transformation",
                description: "Strategic consulting for modern businesses",
                features: ["Technology Strategy", "Process Automation", "Team Training", "Performance Metrics"],
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((service, index) => (
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
                    <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="ghost" 
                      className="w-full mt-6 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all"
                      asChild
                    >
                      <Link href="/services/request">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <TrendingUp className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Latest Technologies</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Cutting-Edge
              </span>
              <br />Tech Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "Next.js 15", icon: "⚡" },
              { name: "React 19", icon: "⚛️" },
              { name: "TypeScript", icon: "🔷" },
              { name: "Tailwind CSS", icon: "🎨" },
              { name: "Prisma", icon: "🔺" },
              { name: "PostgreSQL", icon: "🐘" },
              { name: "Vercel", icon: "▲" },
              { name: "AWS", icon: "☁️" },
              { name: "Docker", icon: "🐳" },
              { name: "AI/ML", icon: "🤖" },
              { name: "GraphQL", icon: "🔗" },
              { name: "Kubernetes", icon: "⚙️" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all"
              >
                <div className="text-3xl mb-2">{tech.icon}</div>
                <div className="text-sm font-medium">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Design */}
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
              <span className="text-sm font-medium">Ready to Transform?</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Build Something
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Join 50+ companies that trust us to deliver innovative digital solutions. 
              Start your transformation journey today.
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

      {/* Footer - Modern Design */}
      <footer className="bg-gray-900 text-white py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                EagleMinds
              </h3>
              <p className="text-gray-400 mb-4">
                Transforming businesses with cutting-edge technology solutions and AI-powered innovation.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">L</span>
                </div>
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">T</span>
                </div>
                <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">G</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services" className="hover:text-white transition-colors">Web Development</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">SaaS Solutions</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">Cloud Services</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">AI Solutions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">TrackNew</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">TamilanJobs</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">ParkNew</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Custom Solutions</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 info@eagleminds.net</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>📍 Chennai, India</li>
                <li>🌐 eagleminds.net</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EagleMinds Technologies Private Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}