"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                EagleMinds
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Technologies</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                    : isScrolled
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              asChild
            >
              <Link href="/services/request">
                <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className={`relative w-10 h-10 rounded-full ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-6"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 5 },
                  }}
                  className="absolute block h-0.5 w-6 bg-current transform transition-transform origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="absolute block h-0.5 w-6 bg-current transform transition-opacity top-2.5"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -5 },
                  }}
                  className="absolute block h-0.5 w-6 bg-current transform transition-transform origin-center top-5"
                />
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="lg:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2 border-t border-white/10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                      : isScrolled
                      ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg"
                asChild
              >
                <Link href="/services/request" onClick={() => setIsMenuOpen(false)}>
                  <Zap className="w-4 h-4 mr-2" />
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}