import Link from "next/link";
import { ArrowRight, Award, Target, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About EagleMinds
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transforming businesses through innovative technology solutions and expert software development
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/contact">
                Work With Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To empower businesses with cutting-edge technology solutions that drive growth, 
                enhance efficiency, and create meaningful digital experiences. We believe in the 
                transformative power of technology to solve real-world problems.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to be the trusted technology partner for businesses looking to 
                innovate, scale, and succeed in the digital age.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To become the leading technology solutions provider in India, recognized for our 
                innovation, quality, and commitment to client success. We envision a future where 
                every business can harness the power of modern technology.
              </p>
              <p className="text-lg text-gray-600">
                We strive to create a world where technology serves humanity, enabling businesses 
                to focus on what they do best while we handle their digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from code quality to client service.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We embrace new technologies and innovative approaches to solve complex problems.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We believe in the power of teamwork and close collaboration with our clients.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Agility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We adapt quickly to changing requirements and market conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 mb-6">
                Founded in Chennai, India, EagleMinds Technologies was born from a simple belief: 
                that technology should empower businesses, not complicate them. What started as a 
                small team of passionate developers has grown into a comprehensive technology solutions 
                provider serving clients across industries.
              </p>
              
              <p className="text-lg text-gray-600 mb-6">
                Our journey began with a focus on web development, but as our clients' needs evolved, 
                so did we. Today, we offer everything from custom software development to cloud 
                infrastructure, SaaS platforms, and digital transformation consulting.
              </p>
              
              <p className="text-lg text-gray-600 mb-6">
                We've had the privilege of working with startups, growing businesses, and established 
                enterprises, helping them navigate the digital landscape and achieve their goals. 
                Our track record speaks for itself: over 50 successful projects, 98% client satisfaction, 
                and a growing portfolio of innovative solutions.
              </p>
              
              <p className="text-lg text-gray-600">
                As we look to the future, we remain committed to our core mission: delivering 
                exceptional technology solutions that make a real difference in our clients' businesses. 
                We're not just developers or consultants – we're your technology partners, invested 
                in your success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experts behind EagleMinds Technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">CEO</span>
                </div>
                <CardTitle>Technical Leadership</CardTitle>
                <CardDescription>Chief Executive Officer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Visionary leader with 10+ years of experience in software development and business strategy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">CTO</span>
                </div>
                <CardTitle>Technical Innovation</CardTitle>
                <CardDescription>Chief Technology Officer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Technology expert specializing in modern web frameworks, cloud architecture, and system design.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">DEV</span>
                </div>
                <CardTitle>Development Team</CardTitle>
                <CardDescription>Senior Developers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Skilled developers proficient in React, Node.js, Python, and modern development practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milestones that showcase our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Projects Completed</div>
              <div className="text-gray-600">Successfully delivered projects across various industries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Client Satisfaction</div>
              <div className="text-gray-600">Consistently high client satisfaction ratings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Years Experience</div>
              <div className="text-gray-600">Years of expertise in modern web development</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-xl font-semibold text-gray-900 mb-2">Support Available</div>
              <div className="text-gray-600">Round-the-clock support for our clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss how EagleMinds Technologies can help transform your business with our expertise and dedication.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Start Your Project
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/services">
                View Our Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}