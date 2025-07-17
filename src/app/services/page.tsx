import Link from "next/link";
import { ArrowRight, Code, Database, Globe, Shield, Zap, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to transform your business and drive digital innovation
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Web Development */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Code className="h-16 w-16 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">Web Development</CardTitle>
                <CardDescription className="text-lg">
                  Modern, responsive websites built with cutting-edge technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Next.js & React Applications</h4>
                      <p className="text-gray-600 text-sm">High-performance, server-side rendered applications</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">E-commerce Solutions</h4>
                      <p className="text-gray-600 text-sm">Custom online stores with payment integration</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Progressive Web Apps</h4>
                      <p className="text-gray-600 text-sm">App-like experiences in web browsers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Custom Web Applications</h4>
                      <p className="text-gray-600 text-sm">Tailored solutions for your specific needs</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* SaaS Solutions */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Globe className="h-16 w-16 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">SaaS Solutions</CardTitle>
                <CardDescription className="text-lg">
                  Scalable software-as-a-service platforms for growing businesses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">TrackNew - Project Management</h4>
                      <p className="text-gray-600 text-sm">Comprehensive project tracking and team collaboration</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">TamilanJobs - Job Portal</h4>
                      <p className="text-gray-600 text-sm">Connecting employers with talented professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">ParkNew - Parking Management</h4>
                      <p className="text-gray-600 text-sm">Smart parking solutions for urban environments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Custom SaaS Development</h4>
                      <p className="text-gray-600 text-sm">Bespoke software solutions for your industry</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Database Solutions */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Database className="h-16 w-16 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">Database Solutions</CardTitle>
                <CardDescription className="text-lg">
                  Robust database design, optimization, and management services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">PostgreSQL & MySQL</h4>
                      <p className="text-gray-600 text-sm">Expert database design and implementation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Database Migration</h4>
                      <p className="text-gray-600 text-sm">Seamless data migration with zero downtime</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Performance Optimization</h4>
                      <p className="text-gray-600 text-sm">Query optimization and indexing strategies</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Data Analytics</h4>
                      <p className="text-gray-600 text-sm">Business intelligence and reporting solutions</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Cloud Services */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Zap className="h-16 w-16 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">Cloud Services</CardTitle>
                <CardDescription className="text-lg">
                  Scalable cloud infrastructure and deployment solutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">AWS & Vercel Deployment</h4>
                      <p className="text-gray-600 text-sm">Cloud deployment and hosting solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">CI/CD Pipelines</h4>
                      <p className="text-gray-600 text-sm">Automated deployment and testing workflows</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Cloud Migration</h4>
                      <p className="text-gray-600 text-sm">Seamless transition to cloud infrastructure</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">DevOps Solutions</h4>
                      <p className="text-gray-600 text-sm">Infrastructure as code and monitoring</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security & Compliance */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Shield className="h-16 w-16 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">Security & Compliance</CardTitle>
                <CardDescription className="text-lg">
                  Comprehensive security solutions and compliance management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Security Audits</h4>
                      <p className="text-gray-600 text-sm">Comprehensive security assessments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">GDPR Compliance</h4>
                      <p className="text-gray-600 text-sm">Data protection and privacy compliance</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Data Protection</h4>
                      <p className="text-gray-600 text-sm">Encryption and secure data handling</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Vulnerability Assessment</h4>
                      <p className="text-gray-600 text-sm">Regular security testing and monitoring</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Consulting Services */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <Users className="h-16 w-16 text-blue-600 mb-4" />
                <CardTitle className="text-2xl">Consulting Services</CardTitle>
                <CardDescription className="text-lg">
                  Expert guidance for your digital transformation journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Technology Strategy</h4>
                      <p className="text-gray-600 text-sm">Strategic planning for digital transformation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">System Architecture</h4>
                      <p className="text-gray-600 text-sm">Scalable architecture design and planning</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Process Optimization</h4>
                      <p className="text-gray-600 text-sm">Streamlining workflows and operations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Team Training</h4>
                      <p className="text-gray-600 text-sm">Skill development and knowledge transfer</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-gray-600">Understanding your business requirements and goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Planning</h3>
              <p className="text-gray-600">Strategic planning and technical architecture design</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Development</h3>
              <p className="text-gray-600">Agile development with regular progress updates</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery</h3>
              <p className="text-gray-600">Testing, deployment, and ongoing support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help transform your business with our expert services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Start Your Project
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}