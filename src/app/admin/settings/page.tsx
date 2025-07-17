"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Mail, Shield, Database, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    site: {
      name: "EagleMinds Technologies",
      description: "Modern web development and SaaS solutions",
      url: "https://eagleminds.net",
      logo: "/logo.png",
      favicon: "/favicon.ico"
    },
    contact: {
      email: "info@eagleminds.net",
      phone: "+91 (44) 1234-5678",
      address: "123 Tech Park Avenue, Anna Nagar, Chennai - 600040, Tamil Nadu, India"
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: "587",
      smtpUser: "notifications@eagleminds.net",
      smtpPassword: "",
      fromEmail: "noreply@eagleminds.net",
      fromName: "EagleMinds Technologies"
    },
    notifications: {
      emailNotifications: true,
      leadNotifications: true,
      systemAlerts: true,
      marketingEmails: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "24",
      passwordPolicy: "strong",
      loginAttempts: "5"
    },
    integrations: {
      googleAnalytics: "",
      facebookPixel: "",
      linkedinInsight: "",
      cloudinaryCloudName: "",
      cloudinaryApiKey: ""
    }
  });

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/admin/login");
      return;
    }

    const userRole = session.user?.role;
    if (!userRole || userRole !== "ADMIN") {
      router.push("/admin/dashboard");
      return;
    }

    // Load settings would go here
    // fetchSettings();
  }, [session, status, router]);

  const handleSaveSettings = async (section: string) => {
    try {
      setLoading(true);
      
      // This would be replaced with actual API call
      console.log(`Saving ${section} settings:`, settings[section as keyof typeof settings]);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      alert(`${section} settings saved successfully!`);
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  if (status === "loading") {
    return <div className="p-8">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-2">Configure your application settings</p>
        </div>

        <Tabs defaultValue="site" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="site">Site</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Site Settings */}
          <TabsContent value="site">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Site Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.site.name}
                    onChange={(e) => updateSetting('site', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.site.description}
                    onChange={(e) => updateSetting('site', 'description', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.site.url}
                    onChange={(e) => updateSetting('site', 'url', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteLogo">Logo URL</Label>
                  <Input
                    id="siteLogo"
                    value={settings.site.logo}
                    onChange={(e) => updateSetting('site', 'logo', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteFavicon">Favicon URL</Label>
                  <Input
                    id="siteFavicon"
                    value={settings.site.favicon}
                    onChange={(e) => updateSetting('site', 'favicon', e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleSaveSettings('site')}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Site Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contact.email}
                    onChange={(e) => updateSetting('contact', 'email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contact.phone}
                    onChange={(e) => updateSetting('contact', 'phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="contactAddress">Address</Label>
                  <Textarea
                    id="contactAddress"
                    value={settings.contact.address}
                    onChange={(e) => updateSetting('contact', 'address', e.target.value)}
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={() => handleSaveSettings('contact')}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Contact Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      value={settings.email.smtpHost}
                      onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={settings.email.smtpPort}
                      onChange={(e) => updateSetting('email', 'smtpPort', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    value={settings.email.smtpUser}
                    onChange={(e) => updateSetting('email', 'smtpUser', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) => updateSetting('email', 'smtpPassword', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={settings.email.fromEmail}
                      onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={settings.email.fromName}
                      onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={() => handleSaveSettings('email')}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Email Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive email notifications for system events</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="leadNotifications">Lead Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified when new leads are received</p>
                  </div>
                  <Switch
                    id="leadNotifications"
                    checked={settings.notifications.leadNotifications}
                    onCheckedChange={(checked) => updateSetting('notifications', 'leadNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemAlerts">System Alerts</Label>
                    <p className="text-sm text-gray-600">Receive alerts for system issues and updates</p>
                  </div>
                  <Switch
                    id="systemAlerts"
                    checked={settings.notifications.systemAlerts}
                    onCheckedChange={(checked) => updateSetting('notifications', 'systemAlerts', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-gray-600">Receive marketing and promotional emails</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={settings.notifications.marketingEmails}
                    onCheckedChange={(checked) => updateSetting('notifications', 'marketingEmails', checked)}
                  />
                </div>
                <Button 
                  onClick={() => handleSaveSettings('notifications')}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Notification Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) => updateSetting('security', 'twoFactorAuth', checked)}
                  />
                </div>
                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select 
                    value={settings.security.passwordPolicy} 
                    onValueChange={(value) => updateSetting('security', 'passwordPolicy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weak">Weak (6+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ characters, mixed case)</SelectItem>
                      <SelectItem value="strong">Strong (12+ characters, mixed case, numbers, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Input
                    id="loginAttempts"
                    type="number"
                    value={settings.security.loginAttempts}
                    onChange={(e) => updateSetting('security', 'loginAttempts', e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleSaveSettings('security')}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Security Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Third-Party Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="googleAnalytics">Google Analytics Tracking ID</Label>
                  <Input
                    id="googleAnalytics"
                    value={settings.integrations.googleAnalytics}
                    onChange={(e) => updateSetting('integrations', 'googleAnalytics', e.target.value)}
                    placeholder="GA-XXXXXXXXX-X"
                  />
                </div>
                <div>
                  <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                  <Input
                    id="facebookPixel"
                    value={settings.integrations.facebookPixel}
                    onChange={(e) => updateSetting('integrations', 'facebookPixel', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedinInsight">LinkedIn Insight Tag</Label>
                  <Input
                    id="linkedinInsight"
                    value={settings.integrations.linkedinInsight}
                    onChange={(e) => updateSetting('integrations', 'linkedinInsight', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cloudinaryCloudName">Cloudinary Cloud Name</Label>
                  <Input
                    id="cloudinaryCloudName"
                    value={settings.integrations.cloudinaryCloudName}
                    onChange={(e) => updateSetting('integrations', 'cloudinaryCloudName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cloudinaryApiKey">Cloudinary API Key</Label>
                  <Input
                    id="cloudinaryApiKey"
                    value={settings.integrations.cloudinaryApiKey}
                    onChange={(e) => updateSetting('integrations', 'cloudinaryApiKey', e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleSaveSettings('integrations')}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Integration Settings"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}