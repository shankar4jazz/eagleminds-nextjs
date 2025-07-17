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
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { Page } from "@/types";

export default function AdminPagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
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

    fetchPages();
  }, [session, status, router]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      // This would be replaced with actual API call
      // const response = await fetch('/api/admin/pages');
      // const data = await response.json();
      
      // Mock data for demonstration
      const mockPages: Page[] = [
        {
          id: "1",
          title: "Homepage",
          slug: "home",
          content: "Welcome to EagleMinds Technologies...",
          metaTitle: "EagleMinds Technologies - Web Development & SaaS Solutions",
          metaDesc: "Modern web development and SaaS solutions",
          status: "PUBLISHED",
          authorId: "1",
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-20"),
          author: {
            id: "1",
            email: "admin@eagleminds.net",
            name: "Admin User",
            role: "ADMIN",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
          }
        },
        {
          id: "2",
          title: "About Us",
          slug: "about",
          content: "EagleMinds Technologies was founded...",
          metaTitle: "About EagleMinds Technologies",
          metaDesc: "Learn about our company, mission, and values",
          status: "PUBLISHED",
          authorId: "1",
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-15"),
          author: {
            id: "1",
            email: "admin@eagleminds.net",
            name: "Admin User",
            role: "ADMIN",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
          }
        },
        {
          id: "3",
          title: "Privacy Policy",
          slug: "privacy",
          content: "This privacy policy explains...",
          metaTitle: "Privacy Policy - EagleMinds Technologies",
          metaDesc: "Our privacy policy and data protection practices",
          status: "DRAFT",
          authorId: "1",
          createdAt: new Date("2024-01-12"),
          updatedAt: new Date("2024-01-12"),
          author: {
            id: "1",
            email: "admin@eagleminds.net",
            name: "Admin User",
            role: "ADMIN",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
          }
        }
      ];
      
      setPages(mockPages);
    } catch (error) {
      console.error("Failed to fetch pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (confirm("Are you sure you want to delete this page?")) {
      try {
        // This would be replaced with actual API call
        // await fetch(`/api/admin/pages/${pageId}`, { method: 'DELETE' });
        
        setPages(pages.filter(page => page.id !== pageId));
      } catch (error) {
        console.error("Failed to delete page:", error);
      }
    }
  };

  const handleStatusChange = async (pageId: string, newStatus: string) => {
    try {
      // This would be replaced with actual API call
      // await fetch(`/api/admin/pages/${pageId}`, {
      //   method: 'PATCH',
      //   body: JSON.stringify({ status: newStatus })
      // });
      
      setPages(pages.map(page => 
        page.id === pageId ? { ...page, status: newStatus as any } : page
      ));
    } catch (error) {
      console.error("Failed to update page status:", error);
    }
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || page.status === statusFilter;
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
            <h1 className="text-3xl font-bold text-gray-900">Pages Management</h1>
            <p className="text-gray-600 mt-2">Manage website pages and content</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Page</DialogTitle>
              </DialogHeader>
              <PageForm onClose={() => setIsDialogOpen(false)} onSave={fetchPages} />
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
                  placeholder="Search pages..."
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

        {/* Pages List */}
        <div className="grid gap-6">
          {filteredPages.map((page) => (
            <Card key={page.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{page.title}</CardTitle>
                    <p className="text-gray-600 mt-1">/{page.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(page.status)}>
                      {page.status}
                    </Badge>
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
                        onClick={() => handleDeletePage(page.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {page.content.substring(0, 200)}...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By {page.author?.name}</span>
                  <span>Updated: {page.updatedAt.toLocaleDateString()}</span>
                </div>
                <div className="mt-4">
                  <Select 
                    value={page.status} 
                    onValueChange={(value) => handleStatusChange(page.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                      <SelectItem value="ARCHIVED">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No pages found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PageForm({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDesc: "",
    status: "DRAFT"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // This would be replaced with actual API call
      // await fetch('/api/admin/pages', {
      //   method: 'POST',
      //   body: JSON.stringify(formData)
      // });
      
      onSave();
      onClose();
    } catch (error) {
      console.error("Failed to create page:", error);
    }
  };

  const handleSlugGeneration = (title: string) => {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Page Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, title: e.target.value }));
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
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          rows={6}
          required
        />
      </div>

      <div>
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          value={formData.metaTitle}
          onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="metaDesc">Meta Description</Label>
        <Textarea
          id="metaDesc"
          value={formData.metaDesc}
          onChange={(e) => setFormData(prev => ({ ...prev, metaDesc: e.target.value }))}
          rows={3}
        />
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
        <Button type="submit">Create Page</Button>
      </div>
    </form>
  );
}