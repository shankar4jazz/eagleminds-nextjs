"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye, Search, DollarSign } from "lucide-react";
import { Service } from "@/types";

export default function AdminServicesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/admin/login");
      return;
    }

    const userRole = session.user?.role;
    if (!userRole || !["ADMIN", "CONTENT_MANAGER"].includes(userRole)) {
      router.push("/admin/login");
      return;
    }

    fetchServices();
  }, [session, status, router]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockServices: Service[] = [
        {
          id: "1",
          name: "Web Development",
          slug: "web-development",
          description: "Modern, responsive websites built with cutting-edge technologies",
          features: [
            "Next.js & React Applications",
            "E-commerce Solutions",
            "Custom Web Applications",
            "Progressive Web Apps"
          ],
          pricing: {
            type: "custom",
            startingPrice: 2500,
            currency: "USD"
          },
          image: "/images/web-development.jpg",
          status: "PUBLISHED",
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-20")
        },
        {
          id: "2",
          name: "SaaS Solutions",
          slug: "saas-solutions",
          description: "Scalable software-as-a-service platforms for growing businesses",
          features: [
            "TrackNew - Project Management",
            "TamilanJobs - Job Portal",
            "ParkNew - Parking Management",
            "Custom SaaS Development"
          ],
          pricing: {
            type: "subscription",
            startingPrice: 99,
            currency: "USD"
          },
          image: "/images/saas-solutions.jpg",
          status: "PUBLISHED",
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-15")
        },
        {
          id: "3",
          name: "Database Solutions",
          slug: "database-solutions",
          description: "Robust database design, optimization, and management services",
          features: [
            "PostgreSQL & MySQL",
            "Database Migration",
            "Performance Optimization",
            "Data Analytics"
          ],
          pricing: {
            type: "hourly",
            startingPrice: 75,
            currency: "USD"
          },
          status: "DRAFT",
          createdAt: new Date("2024-01-12"),
          updatedAt: new Date("2024-01-12")
        }
      ];
      
      setServices(mockServices);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        setServices(services.filter(service => service.id !== serviceId));
      } catch (error) {
        console.error("Failed to delete service:", error);
      }
    }
  };

  const handleStatusChange = async (serviceId: string, newStatus: string) => {
    try {
      setServices(services.map(service => 
        service.id === serviceId ? { ...service, status: newStatus as any } : service
      ));
    } catch (error) {
      console.error("Failed to update service status:", error);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED": return "bg-green-100 text-green-800";
      case "DRAFT": return "bg-yellow-100 text-yellow-800";
      case "ARCHIVED": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPricingDisplay = (pricing: any) => {
    if (!pricing) return "Contact for pricing";
    
    const { type, startingPrice, currency = "USD" } = pricing;
    const symbol = currency === "USD" ? "$" : currency;
    
    switch (type) {
      case "hourly":
        return `${symbol}${startingPrice}/hour`;
      case "subscription":
        return `${symbol}${startingPrice}/month`;
      case "custom":
        return `Starting at ${symbol}${startingPrice}`;
      default:
        return "Contact for pricing";
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
            <p className="text-gray-600 mt-2">Manage your service offerings and pricing</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Service</DialogTitle>
              </DialogHeader>
              <ServiceForm onClose={() => setIsDialogOpen(false)} onSave={fetchServices} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">/{service.slug}</p>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-blue-600">+ {service.features.length - 3} more</li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-green-600">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span className="font-semibold">
                      {getPricingDisplay(service.pricing)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Select 
                    value={service.status} 
                    onValueChange={(value) => handleStatusChange(service.id, value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Updated: {service.updatedAt.toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No services found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceForm({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    features: "",
    pricingType: "custom",
    startingPrice: "",
    status: "DRAFT"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const featuresArray = formData.features.split('\n').filter(f => f.trim());
      
      // This would be replaced with actual API call
      console.log("Creating service:", {
        ...formData,
        features: featuresArray,
        pricing: {
          type: formData.pricingType,
          startingPrice: parseFloat(formData.startingPrice) || 0,
          currency: "USD"
        }
      });
      
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to create service:", error);
    }
  };

  const handleSlugGeneration = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, name: e.target.value }));
            handleSlugGeneration(e.target.value);
          }}
          required
        />
      </div>

      <div>
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={3}
          required
        />
      </div>

      <div>
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
          rows={4}
          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pricingType">Pricing Type</Label>
          <Select value={formData.pricingType} onValueChange={(value) => setFormData(prev => ({ ...prev, pricingType: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="custom">Custom</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="startingPrice">Starting Price ($)</Label>
          <Input
            id="startingPrice"
            type="number"
            value={formData.startingPrice}
            onChange={(e) => setFormData(prev => ({ ...prev, startingPrice: e.target.value }))}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Service</Button>
      </div>
    </form>
  );
}