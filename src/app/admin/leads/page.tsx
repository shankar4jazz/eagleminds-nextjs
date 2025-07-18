"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  User, 
  MessageSquare, 
  Eye, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  TrendingUp,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED';
  source: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  assignee?: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    status: 'NEW' as const,
    source: 'website'
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/leads');
      
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }
      
      const data = await response.json();
      // Convert date strings to Date objects
      const leadsWithDates = (data.leads || []).map((lead: any) => ({
        ...lead,
        createdAt: new Date(lead.createdAt),
        updatedAt: new Date(lead.updatedAt),
      }));
      setLeads(leadsWithDates);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      // Fallback to empty array on error
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create lead');
      }

      const newLead = await response.json();
      // Convert date strings to Date objects
      const leadWithDates = {
        ...newLead,
        createdAt: new Date(newLead.createdAt),
        updatedAt: new Date(newLead.updatedAt),
      };
      setLeads([...leads, leadWithDates]);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating lead:', error);
      alert(error instanceof Error ? error.message : 'Failed to create lead. Please try again.');
    }
  };

  const handleUpdate = async () => {
    if (!editingLead) return;
    
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leadId: editingLead.id, ...formData }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update lead');
      }

      const updatedLead = await response.json();
      // Convert date strings to Date objects
      const leadWithDates = {
        ...updatedLead,
        createdAt: new Date(updatedLead.createdAt),
        updatedAt: new Date(updatedLead.updatedAt),
      };
      setLeads(leads.map(lead => 
        lead.id === editingLead.id ? leadWithDates : lead
      ));
      setEditingLead(null);
      resetForm();
    } catch (error) {
      console.error('Error updating lead:', error);
      alert(error instanceof Error ? error.message : 'Failed to update lead. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        const response = await fetch(`/api/admin/leads?id=${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete lead');
        }

        setLeads(leads.filter(lead => lead.id !== id));
      } catch (error) {
        console.error('Error deleting lead:', error);
        alert(error instanceof Error ? error.message : 'Failed to delete lead. Please try again.');
      }
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update lead status');
      }

      const updatedLead = await response.json();
      // Convert date strings to Date objects
      const leadWithDates = {
        ...updatedLead,
        createdAt: new Date(updatedLead.createdAt),
        updatedAt: new Date(updatedLead.updatedAt),
      };
      setLeads(leads.map(lead => 
        lead.id === leadId ? leadWithDates : lead
      ));
    } catch (error) {
      console.error("Failed to update lead status:", error);
      alert("Failed to update lead status. Please try again.");
    }
  };

  const handleAssignLead = async (leadId: string, assigneeId: string) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId,
          assignedTo: assigneeId === "unassigned" ? null : assigneeId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign lead');
      }

      const updatedLead = await response.json();
      // Convert date strings to Date objects
      const leadWithDates = {
        ...updatedLead,
        createdAt: new Date(updatedLead.createdAt),
        updatedAt: new Date(updatedLead.updatedAt),
      };
      setLeads(leads.map(lead => 
        lead.id === leadId ? leadWithDates : lead
      ));
    } catch (error) {
      console.error("Failed to assign lead:", error);
      alert("Failed to assign lead. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
      status: 'NEW',
      source: 'website'
    });
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      company: lead.company || '',
      service: lead.service,
      message: lead.message,
      status: lead.status,
      source: lead.source
    });
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

  return (
    <AdminLayout title="Leads Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
            <p className="text-gray-600">Track and manage customer inquiries</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Lead
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {leads.length ? Math.round((leads.filter(l => l.status === "CONVERTED").length / leads.length) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600">Conversion Rate</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <select 
                  value={serviceFilter} 
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Services</option>
                  {services.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads List */}
        <div className="grid gap-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            filteredLeads.map((lead) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <Card className="hover:shadow-lg transition-shadow">
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
                                onClick={() => setSelectedLead(lead)}
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
                            <select 
                              value={lead.status} 
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="NEW">New</option>
                              <option value="CONTACTED">Contacted</option>
                              <option value="QUALIFIED">Qualified</option>
                              <option value="CONVERTED">Converted</option>
                              <option value="CLOSED">Closed</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Assigned To</Label>
                            <select 
                              value={lead.assignedTo || "unassigned"} 
                              onChange={(e) => handleAssignLead(lead.id, e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="unassigned">Unassigned</option>
                              <option value="1">Admin User</option>
                              <option value="2">Sales Manager</option>
                            </select>
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
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openEditModal(lead)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDelete(lead.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {filteredLeads.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No leads found.</p>
          </div>
        )}

        {/* Create/Edit Modal */}
        <AnimatePresence>
          {(showCreateModal || editingLead) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">
                      {editingLead ? 'Edit Lead' : 'Create New Lead'}
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowCreateModal(false);
                        setEditingLead(null);
                        resetForm();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Enter lead name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          placeholder="Enter company name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service">Service</Label>
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a service</option>
                        {services.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Enter lead message"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="status">Status</Label>
                        <select
                          id="status"
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value as 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED'})}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="NEW">New</option>
                          <option value="CONTACTED">Contacted</option>
                          <option value="QUALIFIED">Qualified</option>
                          <option value="CONVERTED">Converted</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="source">Source</Label>
                        <select
                          id="source"
                          value={formData.source}
                          onChange={(e) => setFormData({...formData, source: e.target.value})}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="website">Website</option>
                          <option value="referral">Referral</option>
                          <option value="linkedin">LinkedIn</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCreateModal(false);
                        setEditingLead(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={editingLead ? handleUpdate : handleCreate}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingLead ? 'Update' : 'Create'} Lead
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead Details Modal */}
        <AnimatePresence>
          {selectedLead && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Lead Details</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedLead(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

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
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}