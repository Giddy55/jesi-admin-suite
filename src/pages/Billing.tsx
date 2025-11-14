import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Edit, Eye, Filter, Plus, Send, Mail } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockSubscriptions = [
  {
    id: "SUB001",
    schoolName: "Accra Senior High School",
    plan: "Premium",
    price: 500,
    status: "active",
    startDate: "2024-01-15",
    endDate: "2025-01-14",
    teachers: 45,
    students: 1200,
    nextBilling: "2024-02-15"
  },
  {
    id: "SUB002",
    schoolName: "Kumasi Technical Institute",
    plan: "Standard",
    price: 300,
    status: "trial",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    teachers: 25,
    students: 800,
    nextBilling: "2024-02-20"
  },
  {
    id: "SUB003",
    schoolName: "Cape Coast University",
    plan: "Enterprise",
    price: 1000,
    status: "expired",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    teachers: 120,
    students: 3500,
    nextBilling: "N/A"
  }
];

const mockPricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 200,
    currency: "GHS",
    interval: "monthly",
    features: ["Up to 20 teachers", "Up to 500 students", "Basic analytics", "Email support"]
  },
  {
    id: "standard",
    name: "Standard",
    price: 300,
    currency: "GHS",
    interval: "monthly",
    features: ["Up to 50 teachers", "Up to 1000 students", "Advanced analytics", "Priority support", "Custom branding"]
  },
  {
    id: "premium",
    name: "Premium",
    price: 500,
    currency: "GHS",
    interval: "monthly",
    features: ["Up to 100 teachers", "Up to 2000 students", "Full analytics suite", "24/7 support", "API access"]
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 1000,
    currency: "GHS",
    interval: "monthly",
    features: ["Unlimited teachers", "Unlimited students", "Custom integrations", "Dedicated support", "White-label option"]
  }
];

const mockFinancialData = {
  monthlyRevenue: [
    { month: "Jan", revenue: 25000, subscriptions: 45, school: "Accra Senior High School" },
    { month: "Feb", revenue: 28000, subscriptions: 48, school: "Kumasi Technical Institute" },
    { month: "Mar", revenue: 32000, subscriptions: 52, school: "Cape Coast University" },
    { month: "Apr", revenue: 35000, subscriptions: 55, school: "Accra Senior High School" },
    { month: "May", revenue: 38000, subscriptions: 58, school: "Kumasi Technical Institute" },
    { month: "Jun", revenue: 42000, subscriptions: 62, school: "Accra Senior High School" }
  ],
  totalRevenue: 200000,
  activeSubscriptions: 62,
  churnRate: 5.2,
  averageRevenuePerUser: 420,
  revenueByRegion: [
    { region: "Greater Accra", revenue: 85000, schools: 28, percentage: 42.5 },
    { region: "Ashanti", revenue: 52000, schools: 18, percentage: 26.0 },
    { region: "Central", revenue: 35000, schools: 10, percentage: 17.5 },
    { region: "Western", revenue: 18000, schools: 4, percentage: 9.0 },
    { region: "Eastern", revenue: 10000, schools: 2, percentage: 5.0 }
  ],
  revenueBySchoolType: [
    { type: "Public Senior High", revenue: 95000, schools: 35, percentage: 47.5 },
    { type: "Private Senior High", revenue: 62000, schools: 18, percentage: 31.0 },
    { type: "Technical Institute", revenue: 28000, schools: 6, percentage: 14.0 },
    { type: "University", revenue: 15000, schools: 3, percentage: 7.5 }
  ],
  revenueByPlan: [
    { plan: "Enterprise", revenue: 82000, subscribers: 12, percentage: 41.0 },
    { plan: "Premium", revenue: 65000, subscribers: 22, percentage: 32.5 },
    { plan: "Standard", revenue: 38000, subscribers: 20, percentage: 19.0 },
    { plan: "Basic", revenue: 15000, subscribers: 8, percentage: 7.5 }
  ],
  planPopularity: [
    { plan: "Premium", subscribers: 22, growth: "+8%", totalRevenue: 65000 },
    { plan: "Standard", subscribers: 20, growth: "+5%", totalRevenue: 38000 },
    { plan: "Enterprise", subscribers: 12, growth: "+15%", totalRevenue: 82000 },
    { plan: "Basic", subscribers: 8, growth: "-2%", totalRevenue: 15000 }
  ],
  renewalRates: {
    overall: 87.5,
    byPlan: [
      { plan: "Enterprise", rate: 95.0, renewed: 11, total: 12 },
      { plan: "Premium", rate: 90.5, renewed: 20, total: 22 },
      { plan: "Standard", rate: 85.0, renewed: 17, total: 20 },
      { plan: "Basic", rate: 75.0, renewed: 6, total: 8 }
    ]
  }
};

const mockPaymentProviders = [
  { id: "mtn", name: "MTN Mobile Money", status: "active", fees: "2.5%" },
  { id: "vodafone", name: "Vodafone Cash", status: "active", fees: "2.8%" },
  { id: "airteltigo", name: "AirtelTigo Money", status: "inactive", fees: "3.0%" },
  { id: "paypal", name: "PayPal", status: "active", fees: "3.9%" },
  { id: "stripe", name: "Stripe", status: "inactive", fees: "3.4%" }
];

export default function Billing() {
  const { toast } = useToast();
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSchool, setSelectedSchool] = useState<string>('all');
  const [newSubscriptionOpen, setNewSubscriptionOpen] = useState(false);
  const [newPlanOpen, setNewPlanOpen] = useState(false);
  const [newPaymentMethodOpen, setNewPaymentMethodOpen] = useState(false);
  const [emailPreviewOpen, setEmailPreviewOpen] = useState(false);
  const [revenueFilter, setRevenueFilter] = useState<string>('all');
  const [revenueSchoolFilter, setRevenueSchoolFilter] = useState<string>('all');
  const [revenueBreakdownView, setRevenueBreakdownView] = useState<"region" | "schoolType" | "plan">("region");
  
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--chart-1))', 'hsl(var(--chart-2))'];
  
  const [newSubscription, setNewSubscription] = useState({
    schoolName: '',
    schoolEmail: '',
    plan: '',
    sendEmail: false
  });

  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    currency: 'GHS',
    interval: 'monthly',
    features: ['']
  });

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    name: '',
    fees: '',
    status: 'active'
  });

  const filteredSubscriptions = mockSubscriptions.filter(sub => {
    const matchesPlan = selectedPlan === 'all' || sub.plan.toLowerCase() === selectedPlan.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || sub.status === selectedStatus;
    const matchesSchool = selectedSchool === 'all' || sub.schoolName.toLowerCase().includes(selectedSchool.toLowerCase());
    return matchesPlan && matchesStatus && matchesSchool;
  });

  const filteredRevenue = mockFinancialData.monthlyRevenue.filter(data => {
    const matchesRevenueFilter = revenueFilter === 'all' || 
      (revenueFilter === 'high' ? data.revenue > 35000 : data.revenue <= 35000);
    const matchesSchoolFilter = revenueSchoolFilter === 'all' || data.school === revenueSchoolFilter;
    return matchesRevenueFilter && matchesSchoolFilter;
  });

  const handlePreviewEmail = () => {
    setEmailPreviewOpen(true);
  };

  const handleCreateSubscription = () => {
    if (newSubscription.sendEmail && newSubscription.schoolEmail) {
      toast({
        title: "Email Sent",
        description: `Payment link sent to ${newSubscription.schoolEmail}`,
      });
    }
    toast({
      title: "Subscription Created",
      description: `Subscription for ${newSubscription.schoolName} has been created`,
    });
    setNewSubscriptionOpen(false);
    setEmailPreviewOpen(false);
    setNewSubscription({ schoolName: '', schoolEmail: '', plan: '', sendEmail: false });
  };

  const getSelectedPlanDetails = () => {
    return mockPricingPlans.find(p => p.id === newSubscription.plan);
  };

  const handleCreatePlan = () => {
    toast({
      title: "Plan Created",
      description: `${newPlan.name} plan has been created successfully`,
    });
    setNewPlanOpen(false);
    setNewPlan({ name: '', price: '', currency: 'GHS', interval: 'monthly', features: [''] });
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment Method Added",
      description: `${newPaymentMethod.name} has been added successfully`,
    });
    setNewPaymentMethodOpen(false);
    setNewPaymentMethod({ name: '', fees: '', status: 'active' });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      trial: "secondary", 
      expired: "destructive",
      cancelled: "outline"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Subscription Management</h1>
          <p className="text-muted-foreground mt-2">Manage subscriptions, payments, and financial reports</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Dialog open={newSubscriptionOpen} onOpenChange={setNewSubscriptionOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Subscription</DialogTitle>
                <DialogDescription>Set up a new subscription for a school</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>School Name</Label>
                  <Input 
                    placeholder="Enter school name" 
                    value={newSubscription.schoolName}
                    onChange={(e) => setNewSubscription({...newSubscription, schoolName: e.target.value})}
                  />
                </div>
                <div>
                  <Label>School Email</Label>
                  <Input 
                    type="email"
                    placeholder="school@example.com" 
                    value={newSubscription.schoolEmail}
                    onChange={(e) => setNewSubscription({...newSubscription, schoolEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Subscription Plan</Label>
                  <Select value={newSubscription.plan} onValueChange={(value) => setNewSubscription({...newSubscription, plan: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPricingPlans.map(plan => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - {plan.currency} {plan.price}/{plan.interval}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg bg-muted/50">
                  <input
                    type="checkbox"
                    id="sendEmail"
                    checked={newSubscription.sendEmail}
                    onChange={(e) => setNewSubscription({...newSubscription, sendEmail: e.target.checked})}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="sendEmail" className="cursor-pointer flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Send payment link to school email
                  </Label>
                </div>
                {newSubscription.sendEmail && newSubscription.schoolEmail && newSubscription.plan && (
                  <Button 
                    variant="outline" 
                    onClick={handlePreviewEmail}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Email
                  </Button>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewSubscriptionOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateSubscription}>Create Subscription</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Email Preview Dialog */}
      <Dialog open={emailPreviewOpen} onOpenChange={setEmailPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Email Preview - Subscription Payment</DialogTitle>
            <DialogDescription>
              Preview of the email that will be sent to {newSubscription.schoolEmail}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Email Header */}
            <div className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">To:</span>
                <span className="text-sm font-medium">{newSubscription.schoolEmail}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subject:</span>
                <span className="text-sm font-medium">Complete Your Subscription Payment</span>
              </div>
            </div>

            {/* Email Body Preview */}
            <div className="bg-muted/30 p-6 rounded-lg space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Welcome to Our Platform!</h2>
                <p className="text-muted-foreground mt-2">Complete your subscription payment</p>
              </div>

              <div className="bg-background p-4 rounded-md border">
                <p className="text-sm mb-4">Dear {newSubscription.schoolName},</p>
                <p className="text-sm mb-4">
                  Thank you for choosing our platform! We're excited to have you on board.
                </p>
                <p className="text-sm mb-4">
                  You've selected the <strong>{getSelectedPlanDetails()?.name}</strong> plan. 
                  Here's a summary of your subscription:
                </p>

                <div className="bg-muted/50 p-4 rounded-md space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Plan:</span>
                    <span className="text-sm font-semibold">{getSelectedPlanDetails()?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="text-sm font-semibold">
                      {getSelectedPlanDetails()?.currency} {getSelectedPlanDetails()?.price}/{getSelectedPlanDetails()?.interval}
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <p className="text-xs font-medium mb-2">Plan Features:</p>
                    <ul className="space-y-1">
                      {getSelectedPlanDetails()?.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="text-primary">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-4 rounded-md text-center mb-4">
                  <Button className="w-full">
                    Complete Payment
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Click the button above to proceed with secure payment
                  </p>
                </div>

                <p className="text-sm mb-2">
                  If you have any questions or need assistance, please don't hesitate to contact our support team.
                </p>
                <p className="text-sm">
                  Best regards,<br />
                  The Platform Team
                </p>
              </div>

              <div className="text-xs text-muted-foreground text-center pt-4 border-t">
                This is an automated email. Please do not reply to this message.
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailPreviewOpen(false)}>
              Edit Details
            </Button>
            <Button onClick={handleCreateSubscription}>
              <Send className="h-4 w-4 mr-2" />
              Send Email & Create Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Plans</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="renewals">Renewals</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {mockSubscriptions.filter(s => s.status === 'active').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trial Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {mockSubscriptions.filter(s => s.status === 'trial').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">GHS 42,000</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">5.2%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>All Subscriptions</CardTitle>
                  <CardDescription>Manage all school subscriptions and their status</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search school..."
                    value={selectedSchool === 'all' ? '' : selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value || 'all')}
                    className="w-[180px] bg-muted/50 border-0"
                  />
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger className="w-[140px] bg-muted/50 border-0">
                      <SelectValue placeholder="All Plans" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[140px] bg-muted/50 border-0">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>School</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Teachers/Students</TableHead>
                    <TableHead>Next Billing</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.schoolName}</TableCell>
                      <TableCell>{sub.plan}</TableCell>
                      <TableCell>GHS {sub.price}/month</TableCell>
                      <TableCell>{getStatusBadge(sub.status)}</TableCell>
                      <TableCell>{sub.teachers}/{sub.students}</TableCell>
                      <TableCell>{sub.nextBilling}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="pricing" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Subscription Pricing Plans</CardTitle>
                <CardDescription>Configure pricing for different subscription tiers</CardDescription>
              </div>
              <Dialog open={newPlanOpen} onOpenChange={setNewPlanOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Pricing Plan</DialogTitle>
                    <DialogDescription>Add a new subscription plan for schools</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label>Plan Name</Label>
                        <Input 
                          placeholder="e.g., Pro" 
                          value={newPlan.name}
                          onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          value={newPlan.price}
                          onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Currency</Label>
                        <Select value={newPlan.currency} onValueChange={(value) => setNewPlan({...newPlan, currency: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GHS">Ghana Cedis (GHS)</SelectItem>
                            <SelectItem value="USD">US Dollars (USD)</SelectItem>
                            <SelectItem value="EUR">Euros (EUR)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Billing Interval</Label>
                        <Select value={newPlan.interval} onValueChange={(value) => setNewPlan({...newPlan, interval: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Features</Label>
                      {newPlan.features.map((feature, index) => (
                        <div key={index} className="flex gap-2 mt-2">
                          <Input
                            placeholder="Enter feature"
                            value={feature}
                            onChange={(e) => {
                              const features = [...newPlan.features];
                              features[index] = e.target.value;
                              setNewPlan({...newPlan, features});
                            }}
                          />
                          {index === newPlan.features.length - 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setNewPlan({...newPlan, features: [...newPlan.features, '']})}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewPlanOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreatePlan}>Create Plan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {mockPricingPlans.map((plan) => (
                  <Card key={plan.id} className="relative">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        {plan.name}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setEditingPlan(plan)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                      <CardDescription>
                        <span className="text-2xl font-bold text-primary">
                          {plan.currency} {plan.price}
                        </span>
                        /{plan.interval}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {editingPlan && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Plan: {editingPlan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Plan Name</Label>
                    <Input defaultValue={editingPlan.name} />
                  </div>
                  <div>
                    <Label>Price ({editingPlan.currency})</Label>
                    <Input type="number" defaultValue={editingPlan.price} />
                  </div>
                  <div>
                    <Label>Billing Interval</Label>
                    <Select defaultValue={editingPlan.interval}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button>Save Changes</Button>
                  <Button variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Payment Service Providers</CardTitle>
                  <CardDescription>Manage third-party payment integrations</CardDescription>
                </div>
                <Dialog open={newPaymentMethodOpen} onOpenChange={setNewPaymentMethodOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                      <DialogDescription>Add a new payment service provider</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Provider Name</Label>
                        <Input 
                          placeholder="e.g., MTN Mobile Money" 
                          value={newPaymentMethod.name}
                          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Transaction Fees</Label>
                        <Input 
                          placeholder="e.g., 2.5%" 
                          value={newPaymentMethod.fees}
                          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, fees: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Select value={newPaymentMethod.status} onValueChange={(value) => setNewPaymentMethod({...newPaymentMethod, status: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setNewPaymentMethodOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction Fees</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPaymentProviders.map((provider) => (
                    <TableRow key={provider.id}>
                      <TableCell className="font-medium">{provider.name}</TableCell>
                      <TableCell>
                        <Badge variant={provider.status === 'active' ? 'default' : 'secondary'}>
                          {provider.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{provider.fees}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={provider.status === 'active' ? 'text-destructive' : 'text-primary'}
                        >
                          {provider.status === 'active' ? 'Disable' : 'Enable'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure global payment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Currency</Label>
                <Select defaultValue="GHS">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GHS">Ghana Cedis (GHS)</SelectItem>
                    <SelectItem value="USD">US Dollars (USD)</SelectItem>
                    <SelectItem value="EUR">Euros (EUR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Payment Retry Attempts</Label>
                <Input type="number" defaultValue="3" className="w-48" />
              </div>
              <div>
                <Label>Grace Period (days)</Label>
                <Input type="number" defaultValue="7" className="w-48" />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automated Renewal Reminders</CardTitle>
              <CardDescription>Set up and manage renewal notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <Label>First Reminder (days before expiry)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                  <div>
                    <Label>Second Reminder (days before expiry)</Label>
                    <Input type="number" defaultValue="7" />
                  </div>
                  <div>
                    <Label>Final Reminder (days before expiry)</Label>
                    <Input type="number" defaultValue="1" />
                  </div>
                </div>
                <Button>Update Reminder Settings</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Renewals</CardTitle>
              <CardDescription>Schools with subscriptions expiring soon</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>School</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Kumasi Technical Institute</TableCell>
                    <TableCell>Standard</TableCell>
                    <TableCell>2024-02-20</TableCell>
                    <TableCell>
                      <Badge variant="destructive">5 days</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Send Reminder
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">GHS {mockFinancialData.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">{mockFinancialData.activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">+8 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Revenue/User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">GHS {mockFinancialData.averageRevenuePerUser}</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{mockFinancialData.churnRate}%</div>
                <p className="text-xs text-muted-foreground">-1.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generate Financial Report</CardTitle>
              <CardDescription>Create detailed financial reports for specific periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="grid gap-2">
                  <Label>Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-80 justify-start text-left font-normal",
                          !selectedDateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDateRange?.from ? (
                          selectedDateRange.to ? (
                            <>
                              {format(selectedDateRange.from, "LLL dd, y")} -{" "}
                              {format(selectedDateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(selectedDateRange.from, "LLL dd, y")
                          )
                        ) : (
                          "Pick a date range"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={selectedDateRange?.from}
                        selected={selectedDateRange}
                        onSelect={setSelectedDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label>Report Type</Label>
                  <Select defaultValue="detailed">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary Report</SelectItem>
                      <SelectItem value="detailed">Detailed Report</SelectItem>
                      <SelectItem value="subscription">Subscription Report</SelectItem>
                      <SelectItem value="revenue">Revenue Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Analyze revenue distribution across different segments</CardDescription>
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant={revenueBreakdownView === "region" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRevenueBreakdownView("region")}
                  >
                    By Region
                  </Button>
                  <Button 
                    variant={revenueBreakdownView === "schoolType" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRevenueBreakdownView("schoolType")}
                  >
                    By School Type
                  </Button>
                  <Button 
                    variant={revenueBreakdownView === "plan" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRevenueBreakdownView("plan")}
                  >
                    By Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={
                        revenueBreakdownView === "region" 
                          ? mockFinancialData.revenueByRegion.map(r => ({ name: r.region, value: r.revenue }))
                          : revenueBreakdownView === "schoolType"
                          ? mockFinancialData.revenueBySchoolType.map(s => ({ name: s.type, value: s.revenue }))
                          : mockFinancialData.revenueByPlan.map(p => ({ name: p.plan, value: p.revenue }))
                      }
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {(revenueBreakdownView === "region" 
                        ? mockFinancialData.revenueByRegion 
                        : revenueBreakdownView === "schoolType"
                        ? mockFinancialData.revenueBySchoolType
                        : mockFinancialData.revenueByPlan
                      ).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `GHS ${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {(revenueBreakdownView === "region" 
                    ? mockFinancialData.revenueByRegion 
                    : revenueBreakdownView === "schoolType"
                    ? mockFinancialData.revenueBySchoolType
                    : mockFinancialData.revenueByPlan
                  ).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-muted-foreground">
                          {'region' in item ? item.region : 'type' in item ? item.type : item.plan}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">GHS {item.revenue.toLocaleString()}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({item.schools || item.subscribers} {'schools' in item ? 'schools' : 'subs'})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Popular Plans</CardTitle>
                <CardDescription>Plan adoption and growth metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockFinancialData.planPopularity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="plan" />
                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--secondary))" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="subscribers" fill="hsl(var(--primary))" name="Subscribers" />
                    <Bar yAxisId="right" dataKey="totalRevenue" fill="hsl(var(--secondary))" name="Revenue (GHS)" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-3">
                  {mockFinancialData.planPopularity.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{plan.plan}</p>
                        <p className="text-sm text-muted-foreground">{plan.subscribers} subscribers</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={plan.growth.startsWith('+') ? "default" : "destructive"}>
                          {plan.growth}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Growth</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Renewal Rate Analysis</CardTitle>
              <CardDescription>Track subscription renewal performance by plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Renewal Rate</span>
                  <span className="text-2xl font-bold text-primary">{mockFinancialData.renewalRates.overall}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${mockFinancialData.renewalRates.overall}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {mockFinancialData.renewalRates.byPlan.map((plan, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{plan.plan}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({plan.renewed}/{plan.total} renewed)
                        </span>
                      </div>
                      <span className="text-lg font-semibold">{plan.rate}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500" 
                        style={{ 
                          width: `${plan.rate}%`,
                          backgroundColor: plan.rate >= 90 ? 'hsl(var(--primary))' : plan.rate >= 80 ? 'hsl(var(--secondary))' : 'hsl(var(--destructive))'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <div className="flex gap-2">
                <Select value={revenueSchoolFilter} onValueChange={setRevenueSchoolFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by school" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    {mockSubscriptions.map((sub) => (
                      <SelectItem key={sub.id} value={sub.schoolName}>
                        {sub.schoolName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={revenueFilter} onValueChange={setRevenueFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter revenue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Revenue</SelectItem>
                    <SelectItem value="high">High (&gt;35k)</SelectItem>
                    <SelectItem value="low">Low (≤35k)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Revenue (GHS)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="subscriptions" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="Subscriptions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}