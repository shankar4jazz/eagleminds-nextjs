import Link from "next/link";
import { ArrowRight, Code, Database, Globe, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              EagleMinds
              <span className="text-blue-600 block">Technologies</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Modern web development and SaaS solutions that drive business growth and digital transformation
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  View Our Work
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Web Development</CardTitle>
                <CardDescription>
                  Modern, responsive websites built with the latest technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Next.js & React Applications</li>
                  <li>• E-commerce Solutions</li>
                  <li>• Custom Web Applications</li>
                  <li>• Progressive Web Apps</li>
                </ul>
              </CardContent>
            </Card>

            {/* SaaS Solutions */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>SaaS Solutions</CardTitle>
                <CardDescription>
                  Scalable software-as-a-service platforms for your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• TrackNew - Project Management</li>
                  <li>• TamilanJobs - Job Portal</li>
                  <li>• ParkNew - Parking Management</li>
                  <li>• Custom SaaS Development</li>
                </ul>
              </CardContent>
            </Card>

            {/* Database Solutions */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Database className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Database Solutions</CardTitle>
                <CardDescription>
                  Robust database design and optimization services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• PostgreSQL & MySQL</li>
                  <li>• Database Migration</li>
                  <li>• Performance Optimization</li>
                  <li>• Data Analytics</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cloud Services */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Cloud Services</CardTitle>
                <CardDescription>
                  Scalable cloud infrastructure and deployment solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• AWS & Vercel Deployment</li>
                  <li>• CI/CD Pipelines</li>
                  <li>• Cloud Migration</li>
                  <li>• DevOps Solutions</li>
                </ul>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Security & Compliance</CardTitle>
                <CardDescription>
                  Comprehensive security solutions and compliance management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Security Audits</li>
                  <li>• GDPR Compliance</li>
                  <li>• Data Protection</li>
                  <li>• Vulnerability Assessment</li>
                </ul>
              </CardContent>
            </Card>

            {/* Consulting */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Consulting Services</CardTitle>
                <CardDescription>
                  Expert guidance for your digital transformation journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Technology Strategy</li>
                  <li>• System Architecture</li>
                  <li>• Process Optimization</li>
                  <li>• Team Training</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your digital goals with modern technology solutions
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Schedule a Consultation
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">
                View Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EagleMinds Technologies</h3>
              <p className="text-gray-400">
                Modern web development and SaaS solutions for businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Web Development</Link></li>
                <li><Link href="#" className="hover:text-white">SaaS Solutions</Link></li>
                <li><Link href="#" className="hover:text-white">Cloud Services</Link></li>
                <li><Link href="#" className="hover:text-white">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">TrackNew</Link></li>
                <li><Link href="#" className="hover:text-white">TamilanJobs</Link></li>
                <li><Link href="#" className="hover:text-white">ParkNew</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@eagleminds.net</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: Chennai, India</li>
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
