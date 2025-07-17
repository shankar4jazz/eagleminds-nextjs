"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Mail, Phone, Building, Calendar, User, MessageSquare, Eye } from "lucide-react";
import { Lead } from "@/types";

export default function AdminLeadsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/admin/login");
      return;
    }

    const userRole = session.user?.role;
    if (!userRole || !["ADMIN", "CONTENT_MANAGER", "MARKETING_MANAGER"].includes(userRole)) {
      router.push("/admin/login");
      return;
    }

    fetchLeads();
  }, [session, status, router]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockLeads: Lead[] = [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1 (555) 123-4567",
          company: "TechCorp Inc.",
          service: "Web Development",
          message: "We need a modern website for our company with e-commerce capabilities. Looking for a full-stack solution with React and Node.js.",
          status: "NEW",
          source: "website",
          assignedTo: undefined,
          createdAt: new Date("2024-01-18T10:30:00"),
          updatedAt: new Date("2024-01-18T10:30:00")
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.johnson@startup.com",
          phone: "+1 (555) 987-6543",
          company: "StartupCo",
          service: "SaaS Solutions",
          message: "Interested in your project management SaaS solution. Need custom features for our team of 50 developers.",
          status: "CONTACTED",
          source: "website",
          assignedTo: "1",
          createdAt: new Date("2024-01-17T14:15:00"),
          updatedAt: new Date("2024-01-17T16:20:00"),
          assignee: {
            id: "1",
            email: "admin@eagleminds.net",
            name: "Admin User",
            role: "ADMIN",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01")
          }
        },
        {
          id: "3",
          name: "Michael Chen",
          email: "michael.chen@enterprise.com",
          phone: "+1 (555) 456-7890",
          company: "Enterprise Solutions Ltd.",
          service: "Database Solutions",
          message: "We have performance issues with our current database. Need optimization and migration to PostgreSQL.",
          status: "QUALIFIED",
          source: "referral",
          assignedTo: "1",
          createdAt: new Date("2024-01-16T09:45:00"),
          updatedAt: new Date("2024-01-16T11:30:00"),
          assignee: {
            id: "1",
            email: "admin@eagleminds.net",
            name: "Admin User",
            role: "ADMIN",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01")
          }
        },
        {
          id: "4",
          name: "Emily Rodriguez",
          email: "emily.rodriguez@consulting.com",
          phone: undefined,
          company: "Business Consulting Group",
          service: "Consulting Services",
          message: "Looking for technology strategy consultation for digital transformation of our client base.",
          status: "CONVERTED",
          source: "linkedin",
          assignedTo: "1",
          createdAt: new Date("2024-01-15T13:20:00"),
          updatedAt: new Date("2024-01-15T15:45:00"),
          assignee: {
            id: "1",
            email: "admin@eagleminds.net",
            name: "Admin User",
            role: "ADMIN",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01")
          }
        }
      ];
      
      setLeads(mockLeads);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      setLeads(leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus as any, updatedAt: new Date() }
          : lead
      ));
    } catch (error) {
      console.error("Failed to update lead status:", error);
    }
  };

  const handleAssignLead = async (leadId: string, assigneeId: string) => {
    try {
      setLeads(leads.map(lead => 
        lead.id === leadId 
          ? { 
              ...lead, 
              assignedTo: assigneeId,
              updatedAt: new Date(),
              assignee: {
                id: assigneeId,
                email: session?.user?.email || "",
                name: session?.user?.name || "",
                role: session?.user?.role || "ADMIN",
                createdAt: new Date(),
                updatedAt: new Date()
              }
            }
          : lead
      ));
    } catch (error) {
      console.error("Failed to assign lead:", error);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesService = serviceFilter === "all" || lead.service === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW": return "bg-blue-100 text-blue-800";
      case "CONTACTED": return "bg-yellow-100 text-yellow-800";
      case "QUALIFIED": return "bg-purple-100 text-purple-800";
      case "CONVERTED": return "bg-green-100 text-green-800";
      case "CLOSED": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "NEW": return "🆕";
      case "CONTACTED": return "📞";
      case "QUALIFIED": return "✅";
      case "CONVERTED": return "🎉";
      case "CLOSED": return "🔒";
      default: return "❓";
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "website": return "🌐 Website";
      case "referral": return "👥 Referral";
      case "linkedin": return "💼 LinkedIn";
      case "email": return "📧 Email";
      default: return "❓ Unknown";
    }
  };

  const services = [
    "Web Development",
    "SaaS Solutions", 
    "Database Solutions",
    "Cloud Services",
    "Security & Compliance",
    "Consulting Services"
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
            <p className="text-gray-600 mt-2">Track and manage customer inquiries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              Export CSV
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              📧 Email Campaign
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {leads.filter(l => l.status === "NEW").length}
                </div>
                <div className="text-sm text-gray-600">New Leads</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {leads.filter(l => l.status === "CONTACTED").length}
                </div>
                <div className="text-sm text-gray-600">Contacted</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {leads.filter(l => l.status === "QUALIFIED").length}
                </div>
                <div className="text-sm text-gray-600">Qualified</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {leads.filter(l => l.status === "CONVERTED").length}
                </div>
                <div className="text-sm text-gray-600">Converted</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {Math.round((leads.filter(l => l.status === "CONVERTED").length / leads.length) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Conversion Rate</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="CONTACTED">Contacted</SelectItem>
                  <SelectItem value="QUALIFIED">Qualified</SelectItem>
                  <SelectItem value="CONVERTED">Converted</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  {services.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="grid gap-4">
          {filteredLeads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{lead.name}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {lead.phone}
                          </div>
                        )}
                        {lead.company && (
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {lead.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(lead.status)}>
                      {getStatusIcon(lead.status)} {lead.status}
                    </Badge>
                    <Badge variant="outline">
                      {getSourceBadge(lead.source || "unknown")}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <div className="mb-3">
                      <span className="font-semibold text-sm">Service: </span>
                      <span className="text-blue-600">{lead.service}</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 mt-1 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {lead.message}
                          </p>
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-sm"
                            onClick={() => {
                              setSelectedLead(lead);
                              setIsDialogOpen(true);
                            }}
                          >
                            View full message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Status</Label>
                        <Select 
                          value={lead.status} 
                          onValueChange={(value) => handleStatusChange(lead.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NEW">New</SelectItem>
                            <SelectItem value="CONTACTED">Contacted</SelectItem>
                            <SelectItem value="QUALIFIED">Qualified</SelectItem>
                            <SelectItem value="CONVERTED">Converted</SelectItem>
                            <SelectItem value="CLOSED">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Assigned To</Label>
                        <Select 
                          value={lead.assignedTo || "unassigned"} 
                          onValueChange={(value) => handleAssignLead(lead.id, value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                            <SelectItem value="1">Admin User</SelectItem>
                            <SelectItem value="2">Sales Manager</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Created: {lead.createdAt.toLocaleDateString()}</span>
                    {lead.assignee && (
                      <span>• Assigned to: {lead.assignee.name}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No leads found.</p>
          </div>
        )}

        {/* Lead Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Lead Details</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{selectedLead.name}</h3>
                  <p className="text-gray-600">{selectedLead.email}</p>
                  {selectedLead.phone && <p className="text-gray-600">{selectedLead.phone}</p>}
                  {selectedLead.company && <p className="text-gray-600">{selectedLead.company}</p>}
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Service of Interest:</h4>
                  <p className="text-blue-600">{selectedLead.service}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Full Message:</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Lead Information:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Status:</span> 
                      <Badge className={`ml-2 ${getStatusColor(selectedLead.status)}`}>
                        {selectedLead.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Source:</span> {getSourceBadge(selectedLead.source || "unknown")}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span> {selectedLead.createdAt.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Updated:</span> {selectedLead.updatedAt.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}