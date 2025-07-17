"use client";

import { ContactForm } from "@/components/contact-form";
import { Navigation } from "@/components/navigation";
import { Mail, Phone, MapPin, Clock, Star, MessageCircle, Sparkles, Rocket, Target, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get a response within 24 hours",
      primary: "info@eagleminds.net",
      secondary: "support@eagleminds.net",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our team",
      primary: "+91 (44) 1234-5678",
      secondary: "+91 (44) 8765-4321",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come to our Chennai office",
      primary: "123 Tech Park Avenue",
      secondary: "Anna Nagar, Chennai - 600040",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "We're here when you need us",
      primary: "Mon-Fri: 9:00 AM - 6:00 PM",
      secondary: "Sat: 10:00 AM - 4:00 PM",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const quickLinks = [
    {
      title: "Start a Project",
      description: "Ready to begin? Tell us about your project requirements",
      icon: Rocket,
      href: "/services/request",
      color: "blue"
    },
    {
      title: "Get a Quote",
      description: "Need pricing? We'll provide a detailed quote for your project",
      icon: Target,
      href: "/services/request",
      color: "purple"
    },
    {
      title: "Technical Support",
      description: "Existing client? Get help with your current project",
      icon: MessageCircle,
      href: "/contact",
      color: "green"
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
                <MessageCircle className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm font-medium text-white">Let's Connect</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold text-white mb-6 leading-none"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Contact Us
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Ready to transform your business? Get in touch with our team of experts. 
              We're here to help bring your vision to life.
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
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm">
                <MessageCircle className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
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
              <span className="text-sm font-medium text-blue-800">Get In Touch</span>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Multiple Ways to Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the method that works best for you. We're here to help in any way we can.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${method.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{method.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="font-medium text-gray-900 mb-1">{method.primary}</p>
                    <p className="text-sm text-gray-600">{method.secondary}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                        link.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                        link.color === 'purple' ? 'from-purple-500 to-pink-500' :
                        'from-green-500 to-emerald-500'
                      } flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <link.icon className="h-6 w-6 text-white" />
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{link.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {link.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <ContactForm />
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose EagleMinds?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>24-hour response guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Free project consultation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Transparent pricing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Dedicated project manager</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Post-launch support</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM IST</p>
                  <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM IST</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>
                <div className="mt-6 p-4 bg-green-100 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Emergency Support:</strong> Available 24/7 for critical issues
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Response Promise</h3>
                <p className="text-gray-600">
                  We guarantee a response within 24 hours during business days. 
                  For urgent matters, please call us directly at +91 (44) 1234-5678.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
              <MapPin className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Our Location</span>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Chennai's tech hub, we're easily accessible and ready to welcome you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-64 flex items-center justify-center relative">
              <div className="text-center text-white">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <p className="text-xl font-semibold">Interactive Map Coming Soon</p>
                <p className="text-blue-100 mt-2">123 Tech Park Avenue, Anna Nagar</p>
                <p className="text-blue-100">Chennai - 600040, Tamil Nadu</p>
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By Metro</h3>
                  <p className="text-sm text-gray-600">Anna Nagar Station - 5 min walk</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">By Bus</h3>
                  <p className="text-sm text-gray-600">Multiple routes available</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Parking</h3>
                  <p className="text-sm text-gray-600">Free parking available</p>
                </div>
              </div>
            </div>
          </motion.div>
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
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Ready to Begin?</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Build Something
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Incredible Together
              </span>
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Don't wait - your next breakthrough is just a conversation away. 
              Contact us today and let's start creating something amazing.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full shadow-2xl" asChild>
                <Link href="/services/request">
                  <Rocket className="mr-2 h-5 w-5" />
                  Start Your Project
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm">
                <MessageCircle className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}