"use client";

import Link from "next/link";
import { ArrowRight, Users, Award, Target, Lightbulb, Heart, Zap, Shield, Globe, Star, TrendingUp, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex challenges",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Heart,
      title: "Quality",
      description: "We maintain the highest standards in everything we do, ensuring exceptional results",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Trust",
      description: "We build long-lasting relationships through transparency, reliability, and integrity",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Speed",
      description: "We deliver solutions quickly without compromising on quality or attention to detail",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "CEO & Founder",
      description: "10+ years in technology leadership, driving innovation and growth",
      image: "👨‍💼",
      skills: ["Strategic Planning", "Team Leadership", "Business Development"]
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      description: "Full-stack architect with expertise in scalable web applications",
      image: "👩‍💻",
      skills: ["System Architecture", "Full-Stack Development", "Cloud Solutions"]
    },
    {
      name: "Arjun Patel",
      role: "Lead Developer",
      description: "Frontend specialist passionate about creating exceptional user experiences",
      image: "👨‍💻",
      skills: ["React/Next.js", "UI/UX Design", "Performance Optimization"]
    },
    {
      name: "Kavya Reddy",
      role: "DevOps Engineer",
      description: "Infrastructure expert ensuring reliable and secure deployments",
      image: "👩‍🔧",
      skills: ["AWS/Azure", "CI/CD", "Security & Monitoring"]
    }
  ];

  const achievements = [
    {
      number: "50+",
      title: "Projects Completed",
      description: "Successfully delivered projects across various industries"
    },
    {
      number: "98%",
      title: "Client Satisfaction",
      description: "Consistently exceeding client expectations and requirements"
    },
    {
      number: "24/7",
      title: "Support Available",
      description: "Round-the-clock technical support and maintenance"
    },
    {
      number: "5+",
      title: "Years Experience",
      description: "Proven track record in delivering innovative solutions"
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
                <Users className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-sm font-medium text-white">Our Story</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold text-white mb-6 leading-none"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Us
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              We are passionate technologists dedicated to transforming businesses through 
              innovative digital solutions and cutting-edge technology.
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
                  Work With Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full backdrop-blur-sm" asChild>
                <Link href="/contact">
                  <Target className="mr-2 h-5 w-5" />
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Story */}
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
              <span className="text-sm font-medium text-blue-800">Our Journey</span>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Building the Future of Technology
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To empower businesses with innovative technology solutions that drive growth, 
                    enhance efficiency, and create meaningful digital experiences for their customers.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To become the leading technology partner for businesses worldwide, 
                    recognized for our innovation, quality, and commitment to client success.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Why Choose EagleMinds?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>5+ years of industry experience</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>50+ successful projects delivered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Expert team of skilled developers</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>Cutting-edge technology stack</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    <span>24/7 support and maintenance</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
              <Heart className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Our Values</span>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide every decision we make and every solution we deliver
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full mb-6">
              <Users className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-sm font-medium text-green-800">Our Team</span>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Meet the Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our talented team of professionals brings together diverse expertise and shared passion for innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
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
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                      {member.image}
                    </div>
                    <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center mb-4">{member.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Award className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-sm font-medium">Our Achievements</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Numbers That Matter
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our track record speaks for itself - delivering exceptional results for our clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {achievement.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-white/70">{achievement.description}</p>
                </div>
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
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Ready to Partner?</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Let's Create Something
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Amazing Together
              </span>
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Join us in building the future of technology. Let's transform your vision into reality 
              with innovative solutions and expert craftsmanship.
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
                  Get in Touch
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}