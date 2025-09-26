import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon,
  Users,
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Mail,
  Key,
  Server,
  Zap,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for settings
const mockAdminUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Super Admin",
    lastLogin: "2024-01-15T10:30:00Z",
    status: "active"
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Platform Admin",
    lastLogin: "2024-01-14T16:45:00Z",
    status: "active"
  },
  {
    id: "3",
    name: "Mike Wilson",
    email: "mike@example.com",
    role: "Content Admin",
    lastLogin: "2024-01-13T09:15:00Z",
    status: "inactive"
  }
];

const mockSystemSettings = {
  platformName: "EduTech Admin Platform",
  supportEmail: "support@edutech.com",
  maxUsersPerSchool: 1000,
  sessionTimeout: 60,
  backupFrequency: "daily",
  maintenanceMode: false,
  aiFeatures: true,
  realTimeUpdates: true,
  dataRetentionDays: 365
};

const mockNotificationSettings = {
  emailNotifications: true,
  pushNotifications: false,
  smsNotifications: false,
  systemAlerts: true,
  securityAlerts: true,
  performanceAlerts: true,
  userActivityAlerts: false,
  billingAlerts: true
};

export default function Settings() {
  const { toast } = useToast();
  const [systemSettings, setSystemSettings] = useState(mockSystemSettings);
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been successfully saved.",
    });
  };

  const handleUserAction = (action: string, user: any) => {
    toast({
      title: `User ${action}`,
      description: `${user.name} has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground mt-2">Configure and manage your platform settings</p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Admin Users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Platform Configuration
                </CardTitle>
                <CardDescription>Basic platform settings and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Platform Name</Label>
                  <Input 
                    value={systemSettings.platformName}
                    onChange={(e) => setSystemSettings({...systemSettings, platformName: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Support Email</Label>
                  <Input 
                    type="email"
                    value={systemSettings.supportEmail}
                    onChange={(e) => setSystemSettings({...systemSettings, supportEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Max Users Per School</Label>
                  <Input 
                    type="number"
                    value={systemSettings.maxUsersPerSchool}
                    onChange={(e) => setSystemSettings({...systemSettings, maxUsersPerSchool: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Session Timeout (minutes)</Label>
                  <Input 
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({...systemSettings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Feature Toggles
                </CardTitle>
                <CardDescription>Enable or disable platform features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">AI-Powered Features</Label>
                    <p className="text-xs text-muted-foreground">Enable AI lesson planning and content generation</p>
                  </div>
                  <Switch 
                    checked={systemSettings.aiFeatures}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, aiFeatures: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Real-time Updates</Label>
                    <p className="text-xs text-muted-foreground">Enable live collaboration and updates</p>
                  </div>
                  <Switch 
                    checked={systemSettings.realTimeUpdates}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, realTimeUpdates: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground">Put platform in maintenance mode</p>
                  </div>
                  <Switch 
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Platform Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel of your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Primary Color</Label>
                  <div className="flex gap-2 mt-2">
                    {["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                      <div 
                        key={color}
                        className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Theme Mode</Label>
                  <Select defaultValue="system">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Logo Upload</Label>
                  <Button variant="outline" className="w-full mt-2">
                    Upload Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Admin Users
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Admin
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Admin User</DialogTitle>
                      <DialogDescription>Create a new administrator account</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Full Name</Label>
                        <Input placeholder="Enter full name" />
                      </div>
                      <div>
                        <Label>Email Address</Label>
                        <Input type="email" placeholder="Enter email address" />
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="super_admin">Super Admin</SelectItem>
                            <SelectItem value="platform_admin">Platform Admin</SelectItem>
                            <SelectItem value="content_admin">Content Admin</SelectItem>
                            <SelectItem value="support_admin">Support Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Create Admin User</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription>Manage administrative users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAdminUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleUserAction('Edit', user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleUserAction('Delete', user)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Communication Channels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Email Notifications</Label>
                        <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Browser push notifications</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">SMS Notifications</Label>
                        <p className="text-xs text-muted-foreground">Critical alerts via SMS</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Alert Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">System Alerts</Label>
                        <p className="text-xs text-muted-foreground">Platform updates and maintenance</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Security Alerts</Label>
                        <p className="text-xs text-muted-foreground">Security and access notifications</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.securityAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, securityAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Performance Alerts</Label>
                        <p className="text-xs text-muted-foreground">System performance issues</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.performanceAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, performanceAlerts: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Billing Alerts</Label>
                        <p className="text-xs text-muted-foreground">Payment and subscription updates</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.billingAlerts}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, billingAlerts: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Configure security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weak">Basic (8+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                      <SelectItem value="strong">Strong (12+ chars, symbols)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">Require 2FA for all admins</span>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div>
                  <Label>Session Management</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Auto-logout inactive sessions</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Single sign-on only</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Keys & Access
                </CardTitle>
                <CardDescription>Manage API access and authentication keys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Master API Key</Label>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      type={showApiKey ? "text" : "password"}
                      value="sk-1234567890abcdef1234567890abcdef"
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Generate New API Key
                </Button>
                <Separator />
                <div>
                  <Label>Webhook URL</Label>
                  <Input 
                    placeholder="https://your-webhook-url.com"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Protection & Compliance</CardTitle>
              <CardDescription>Configure data retention and privacy settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Data Retention Period (days)</Label>
                  <Input 
                    type="number"
                    value={systemSettings.dataRetentionDays}
                    className="mt-2"
                    onChange={(e) => setSystemSettings({...systemSettings, dataRetentionDays: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label>Backup Frequency</Label>
                  <Select 
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => setSystemSettings({...systemSettings, backupFrequency: value})}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Configuration
                </CardTitle>
                <CardDescription>Manage database settings and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Connection Pool Size</Label>
                  <Input type="number" defaultValue="100" className="mt-2" />
                </div>
                <div>
                  <Label>Query Timeout (seconds)</Label>
                  <Input type="number" defaultValue="30" className="mt-2" />
                </div>
                <div>
                  <Label>Auto-vacuum</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">Enable automatic database cleanup</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Server Configuration
                </CardTitle>
                <CardDescription>Configure server resources and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Max Request Size (MB)</Label>
                  <Input type="number" defaultValue="50" className="mt-2" />
                </div>
                <div>
                  <Label>Rate Limiting (requests/minute)</Label>
                  <Input type="number" defaultValue="1000" className="mt-2" />
                </div>
                <div>
                  <Label>CORS Origins</Label>
                  <Textarea 
                    placeholder="https://example.com&#10;https://app.example.com"
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Health Monitoring</CardTitle>
              <CardDescription>Configure monitoring and alerting thresholds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>CPU Alert Threshold (%)</Label>
                  <Input type="number" defaultValue="80" className="mt-2" />
                </div>
                <div>
                  <Label>Memory Alert Threshold (%)</Label>
                  <Input type="number" defaultValue="85" className="mt-2" />
                </div>
                <div>
                  <Label>Disk Usage Alert (%)</Label>
                  <Input type="number" defaultValue="90" className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                External Integrations
              </CardTitle>
              <CardDescription>Manage third-party service integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">AI Services</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">OpenAI GPT</div>
                        <div className="text-sm text-muted-foreground">Lesson generation and content creation</div>
                      </div>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Google Gemini</div>
                        <div className="text-sm text-muted-foreground">Alternative AI model</div>
                      </div>
                      <Badge variant="outline">Disconnected</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Communication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">SendGrid</div>
                        <div className="text-sm text-muted-foreground">Email delivery service</div>
                      </div>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Twilio</div>
                        <div className="text-sm text-muted-foreground">SMS notifications</div>
                      </div>
                      <Badge variant="outline">Disconnected</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Analytics & Monitoring</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Google Analytics</div>
                        <div className="text-sm text-muted-foreground">User behavior tracking</div>
                      </div>
                      <Badge variant="default">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Sentry</div>
                        <div className="text-sm text-muted-foreground">Error tracking and monitoring</div>
                      </div>
                      <Badge variant="default">Connected</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Payment Processing</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Stripe</div>
                        <div className="text-sm text-muted-foreground">Payment processing</div>
                      </div>
                      <Badge variant="outline">Disconnected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">MTN Mobile Money</div>
                        <div className="text-sm text-muted-foreground">Local payment method</div>
                      </div>
                      <Badge variant="default">Connected</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}