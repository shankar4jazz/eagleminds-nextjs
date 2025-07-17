export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN' | 'CONTENT_MANAGER' | 'SUPPORT_STAFF' | 'MARKETING_MANAGER';
  createdAt: Date;
  updatedAt: Date;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDesc?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: User;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: any;
  pricing: any;
  image?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'CLOSED';
  source?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  assignee?: User;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}