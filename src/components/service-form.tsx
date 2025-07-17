"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles, Zap, Shield, Star } from "lucide-react";

const serviceFormSchema = z.object({
  name: z.string().min(2, "Service name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service type"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  description: z.string().min(10, "Please provide more details about your project"),
  features: z.array(z.string()).min(1, "Please select at least one feature"),
  priority: z.string().default("medium"),
});

type ServiceFormData = z.infer<typeof serviceFormSchema>;

const serviceTypes = [
  { value: "web-development", label: "Web Development", icon: "🌐" },
  { value: "mobile-development", label: "Mobile Development", icon: "📱" },
  { value: "cloud-solutions", label: "Cloud Solutions", icon: "☁️" },
  { value: "ai-machine-learning", label: "AI & Machine Learning", icon: "🤖" },
  { value: "digital-marketing", label: "Digital Marketing", icon: "📊" },
  { value: "consulting-services", label: "Consulting Services", icon: "💡" },
];

const budgetRanges = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-50k", label: "$15,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "over-100k", label: "Over $100,000" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-month", label: "Within 1 Month" },
  { value: "3-months", label: "Within 3 Months" },
  { value: "6-months", label: "Within 6 Months" },
  { value: "flexible", label: "Flexible Timeline" },
];

const availableFeatures = [
  "Responsive Design",
  "Custom CMS",
  "E-commerce Integration",
  "API Development",
  "Database Design",
  "User Authentication",
  "Payment Processing",
  "Analytics Integration",
  "SEO Optimization",
  "Performance Optimization",
  "Cloud Hosting",
  "Mobile App",
  "Admin Dashboard",
  "Third-party Integrations",
];

export default function ServiceForm() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      features: [],
      priority: "medium",
    },
  });

  const selectedServiceType = watch("serviceType");

  const addFeature = (feature: string) => {
    if (!selectedFeatures.includes(feature)) {
      const newFeatures = [...selectedFeatures, feature];
      setSelectedFeatures(newFeatures);
      setValue("features", newFeatures);
    }
  };

  const removeFeature = (feature: string) => {
    const newFeatures = selectedFeatures.filter((f) => f !== feature);
    setSelectedFeatures(newFeatures);
    setValue("features", newFeatures);
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: data.serviceType,
          message: `Service Request: ${data.description}

Budget: ${data.budget}
Timeline: ${data.timeline}
Features: ${data.features.join(", ")}
Priority: ${data.priority}`,
          source: "SERVICE_FORM",
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        setSelectedFeatures([]);
        setTimeout(() => setSubmitSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="max-w-2xl mx-auto bg-gradient-to-br from-green-50/90 to-emerald-50/90 backdrop-blur-sm border-green-200/50 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
            <p className="text-green-700">
              Your service request has been submitted successfully. Our team will contact you within 24 hours.
            </p>
          </div>
          <Button
            onClick={() => setSubmitSuccess(false)}
            className="bg-green-600 hover:bg-green-700"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm border-blue-200/50 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm">
        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-blue-600" />
          Request Our Services
        </CardTitle>
        <p className="text-center text-gray-600 mt-2">
          Tell us about your project and we'll create a custom solution for you
        </p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Full Name *
              </Label>
              <Input
                id="name"
                {...register("name")}
                className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20"
                placeholder="john@company.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-gray-700 font-medium">
                Company Name
              </Label>
              <Input
                id="company"
                {...register("company")}
                className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20"
                placeholder="Your Company"
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Service Type *</Label>
            <Select onValueChange={(value) => setValue("serviceType", value)}>
              <SelectTrigger className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20">
                <SelectValue placeholder="Select a service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    <div className="flex items-center gap-2">
                      <span>{service.icon}</span>
                      {service.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceType && (
              <p className="text-red-500 text-sm">{errors.serviceType.message}</p>
            )}
          </div>

          {/* Budget and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Budget Range *</Label>
              <Select onValueChange={(value) => setValue("budget", value)}>
                <SelectTrigger className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((budget) => (
                    <SelectItem key={budget.value} value={budget.value}>
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budget && (
                <p className="text-red-500 text-sm">{errors.budget.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-700 font-medium">Timeline *</Label>
              <Select onValueChange={(value) => setValue("timeline", value)}>
                <SelectTrigger className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((timeline) => (
                    <SelectItem key={timeline.value} value={timeline.value}>
                      {timeline.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timeline && (
                <p className="text-red-500 text-sm">{errors.timeline.message}</p>
              )}
            </div>
          </div>

          {/* Features Selection */}
          <div className="space-y-4">
            <Label className="text-gray-700 font-medium">
              Features & Requirements *
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableFeatures.map((feature) => (
                <Button
                  key={feature}
                  type="button"
                  variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (selectedFeatures.includes(feature)) {
                      removeFeature(feature);
                    } else {
                      addFeature(feature);
                    }
                  }}
                  className={`justify-start text-left h-auto p-2 ${
                    selectedFeatures.includes(feature)
                      ? "bg-blue-600 text-white"
                      : "bg-white/70 backdrop-blur-sm border-gray-200/50 hover:bg-blue-50"
                  }`}
                >
                  {selectedFeatures.includes(feature) ? (
                    <Plus className="w-4 h-4 mr-2 rotate-45" />
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {feature}
                </Button>
              ))}
            </div>
            {selectedFeatures.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 border-blue-200"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {errors.features && (
              <p className="text-red-500 text-sm">{errors.features.message}</p>
            )}
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700 font-medium">
              Project Description *
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20 min-h-[120px]"
              placeholder="Please describe your project in detail. Include any specific requirements, goals, or challenges you'd like us to address..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Priority Level</Label>
            <Select onValueChange={(value) => setValue("priority", value)} defaultValue="medium">
              <SelectTrigger className="bg-white/70 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    Low Priority
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    Medium Priority
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-red-600" />
                    High Priority
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 text-lg shadow-lg"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting Request...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Submit Service Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}