import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Megaphone, 
  Plus, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  BarChart3,
  Users,
  Zap
} from "lucide-react";

// Mock data
const mockAnnouncements = [
  {
    id: "ANN001",
    title: "New AI Features Released",
    message: "We've added advanced lesson plan generation and curriculum mapping tools to help teachers create better content.",
    type: "feature",
    priority: "high",
    author: "Admin Team",
    createdAt: "2024-01-15T10:00:00Z",
    scheduledFor: "2024-01-16T08:00:00Z",
    status: "scheduled",
    recipients: "all_users",
    views: 0
  },
  {
    id: "ANN002", 
    title: "Scheduled Maintenance",
    message: "The platform will be undergoing maintenance on January 20th from 2:00 AM to 4:00 AM GMT. Please plan accordingly.",
    type: "maintenance",
    priority: "medium",
    author: "Tech Team",
    createdAt: "2024-01-14T15:30:00Z",
    scheduledFor: "2024-01-18T06:00:00Z",
    status: "published",
    recipients: "all_users",
    views: 1250
  }
];

const mockTickets = [
  {
    id: "TKT001",
    subject: "Unable to generate lesson plans",
    description: "When I try to generate a lesson plan for Mathematics, I get an error message.",
    priority: "high",
    status: "open",
    category: "technical",
    submitter: "Sarah Johnson",
    submitterRole: "Teacher",
    school: "Accra Senior High School",
    assignedTo: "John Doe",
    createdAt: "2024-01-15T14:30:00Z",
    updatedAt: "2024-01-15T16:45:00Z",
    resolutionTime: null,
    satisfaction: null
  },
  {
    id: "TKT002",
    subject: "Request for additional user accounts",
    description: "We need to add 5 more teacher accounts to our school subscription.",
    priority: "medium",
    status: "in_progress",
    category: "account",
    submitter: "Michael Brown", 
    submitterRole: "Admin",
    school: "Kumasi Technical Institute",
    assignedTo: "Jane Smith",
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-15T11:20:00Z",
    resolutionTime: null,
    satisfaction: null
  },
  {
    id: "TKT003",
    subject: "Cannot access student analytics",
    description: "The analytics dashboard is not loading for our school's student data.",
    priority: "low",
    status: "resolved",
    category: "technical",
    submitter: "Grace Osei",
    submitterRole: "Teacher",
    school: "Cape Coast University",
    assignedTo: "Alice Johnson",
    createdAt: "2024-01-13T16:00:00Z",
    updatedAt: "2024-01-14T10:30:00Z",
    resolutionTime: "18.5 hours",
    satisfaction: 4
  }
];

const mockKnowledgeBase = [
  {
    id: "KB001",
    category: "Getting Started",
    articles: [
      { id: "ART001", title: "How to create your first lesson plan", views: 2500, lastUpdated: "2024-01-10" },
      { id: "ART002", title: "Setting up your school profile", views: 1800, lastUpdated: "2024-01-08" },
      { id: "ART003", title: "Inviting teachers to your school", views: 1200, lastUpdated: "2024-01-05" }
    ]
  },
  {
    id: "KB002", 
    category: "Lesson Planning",
    articles: [
      { id: "ART004", title: "Using AI to generate lesson content", views: 3200, lastUpdated: "2024-01-12" },
      { id: "ART005", title: "Customizing lesson plans for different grade levels", views: 2100, lastUpdated: "2024-01-09" },
      { id: "ART006", title: "Sharing lesson plans with colleagues", views: 1600, lastUpdated: "2024-01-07" }
    ]
  },
  {
    id: "KB003",
    category: "Troubleshooting",
    articles: [
      { id: "ART007", title: "Common login issues and solutions", views: 4100, lastUpdated: "2024-01-14" },
      { id: "ART008", title: "What to do when AI generation fails", views: 2800, lastUpdated: "2024-01-11" },
      { id: "ART009", title: "Browser compatibility requirements", views: 1900, lastUpdated: "2024-01-06" }
    ]
  }
];

const mockFAQs = [
  {
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
  },
  {
    question: "Can I use the platform offline?",
    answer: "Currently, the platform requires an internet connection to access AI features and sync data."
  },
  {
    question: "How many lesson plans can I create?",
    answer: "The number of lesson plans depends on your subscription tier. Check your account settings for details."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use enterprise-grade encryption and comply with international data protection standards."
  }
];

const mockSupportMetrics = {
  totalTickets: 156,
  openTickets: 23,
  avgResolutionTime: "14.2 hours",
  satisfactionScore: 4.3,
  knowledgeBaseViews: 45200,
  announcementReach: 2850
};

export default function Support() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    type: "general",
    priority: "medium",
    recipients: "all_users",
    scheduledFor: ""
  });

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      high: "destructive",
      medium: "default",
      low: "secondary"
    };
    return <Badge variant={variants[priority] || "outline"}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      open: "destructive",
      in_progress: "default",
      resolved: "secondary",
      closed: "outline"
    };
    return <Badge variant={variants[status] || "outline"}>{status.replace('_', ' ')}</Badge>;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support & Communications</h1>
          <p className="text-muted-foreground mt-2">Manage announcements, support tickets, and knowledge base</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Megaphone className="h-4 w-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>Broadcast a message to platform users</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input 
                    placeholder="Enter announcement title"
                    value={newAnnouncement.title}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea 
                    placeholder="Enter your announcement message"
                    rows={4}
                    value={newAnnouncement.message}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, message: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={newAnnouncement.type} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="feature">New Feature</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Select value={newAnnouncement.priority} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Recipients</Label>
                  <Select value={newAnnouncement.recipients} onValueChange={(value) => setNewAnnouncement({...newAnnouncement, recipients: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_users">All Users</SelectItem>
                      <SelectItem value="schools_only">Schools Only</SelectItem>
                      <SelectItem value="teachers_only">Teachers Only</SelectItem>
                      <SelectItem value="students_only">Students Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Schedule For (Optional)</Label>
                  <Input 
                    type="datetime-local"
                    value={newAnnouncement.scheduledFor}
                    onChange={(e) => setNewAnnouncement({...newAnnouncement, scheduledFor: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Schedule
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{mockSupportMetrics.openTickets}</div>
            <p className="text-xs text-muted-foreground">of {mockSupportMetrics.totalTickets} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockSupportMetrics.avgResolutionTime}</div>
            <p className="text-xs text-muted-foreground">-2.3 hours from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction Score</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mockSupportMetrics.satisfactionScore}/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KB Views</CardTitle>
            <Eye className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{mockSupportMetrics.knowledgeBaseViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="announcements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Announcements</CardTitle>
              <CardDescription>Manage and broadcast messages to your platform users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled/Published</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAnnouncements.map((announcement) => (
                    <TableRow key={announcement.id}>
                      <TableCell className="font-medium">{announcement.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{announcement.type}</Badge>
                      </TableCell>
                      <TableCell>{getPriorityBadge(announcement.priority)}</TableCell>
                      <TableCell>
                        <Badge variant={announcement.status === 'published' ? 'default' : 'secondary'}>
                          {announcement.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(announcement.scheduledFor).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{announcement.views}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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

        <TabsContent value="tickets" className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search tickets..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tickets</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage and resolve user support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Submitter</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">{ticket.id}</TableCell>
                      <TableCell className="max-w-xs truncate">{ticket.subject}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ticket.submitter}</div>
                          <div className="text-sm text-muted-foreground">{ticket.submitterRole}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                      <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                      <TableCell>{ticket.assignedTo}</TableCell>
                      <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedTicket(ticket)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedTicket && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Ticket Details: {selectedTicket.id}
                  {getStatusBadge(selectedTicket.status)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Subject</Label>
                    <p className="text-sm">{selectedTicket.subject}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Priority</Label>
                    <div className="mt-1">{getPriorityBadge(selectedTicket.priority)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Submitter</Label>
                    <p className="text-sm">{selectedTicket.submitter} ({selectedTicket.submitterRole})</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">School</Label>
                    <p className="text-sm">{selectedTicket.school}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded">{selectedTicket.description}</p>  
                </div>
                {selectedTicket.satisfaction && (
                  <div>
                    <Label className="text-sm font-medium">Satisfaction Rating</Label>
                    <div className="flex gap-1 mt-1">
                      {renderStars(selectedTicket.satisfaction)}
                    </div>
                  </div>
                )}
                <div className="flex gap-2">
                  <Select defaultValue={selectedTicket.status}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Update Status</Button>
                  <Button variant="outline" onClick={() => setSelectedTicket(null)}>Close</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base Articles</CardTitle>
                <CardDescription>Manage help articles and tutorials</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {mockKnowledgeBase.map((category) => (
                    <AccordionItem key={category.id} value={category.id}>
                      <AccordionTrigger>{category.category}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {category.articles.map((article) => (
                            <div key={article.id} className="flex justify-between items-center p-2 border rounded">
                              <div>
                                <div className="font-medium text-sm">{article.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {article.views} views • Updated {article.lastUpdated}
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Article
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions and answers</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {mockFAQs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button className="w-full mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Support Performance</CardTitle>
                <CardDescription>Key metrics for support team performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Resolution Rate</span>
                    <span className="text-sm text-muted-foreground">85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">First Response Time</span>
                    <span className="text-sm text-muted-foreground">2.3 hours</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Customer Satisfaction</span>
                    <span className="text-sm text-muted-foreground">4.3/5</span>
                  </div>
                  <Progress value={86} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Support Team Activity</CardTitle>
                <CardDescription>Individual team member performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["John Doe", "Jane Smith", "Alice Johnson"].map((agent, index) => (
                    <div key={agent} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{agent.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{agent}</div>
                        <div className="text-xs text-muted-foreground">
                          {[12, 8, 15][index]} tickets resolved this week
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {renderStars([4, 5, 4][index])}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ticket Categories</CardTitle>
                <CardDescription>Distribution of support requests by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { category: "Technical Issues", count: 45, percentage: 35 },
                    { category: "Account Management", count: 32, percentage: 25 },
                    { category: "Feature Requests", count: 25, percentage: 20 },
                    { category: "Bug Reports", count: 18, percentage: 14 },
                    { category: "General Inquiries", count: 8, percentage: 6 }
                  ].map((item) => (
                    <div key={item.category} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{item.count}</span>
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Communication Reach</CardTitle>
                <CardDescription>Effectiveness of announcements and communications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Announcements Sent</span>
                  <span className="text-2xl font-bold text-primary">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Open Rate</span>
                  <span className="text-2xl font-bold text-secondary">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Users Reached</span>
                  <span className="text-2xl font-bold text-accent">2,850</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}