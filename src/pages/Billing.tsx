import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Edit, Eye, Plus, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
    { month: "Jan", revenue: 25000, subscriptions: 45 },
    { month: "Feb", revenue: 28000, subscriptions: 48 },
    { month: "Mar", revenue: 32000, subscriptions: 52 },
    { month: "Apr", revenue: 35000, subscriptions: 55 },
    { month: "May", revenue: 38000, subscriptions: 58 },
    { month: "Jun", revenue: 42000, subscriptions: 62 }
  ],
  totalRevenue: 200000,
  activeSubscriptions: 62,
  churnRate: 5.2,
  averageRevenuePerUser: 420
};

const mockPaymentProviders = [
  { id: "mtn", name: "MTN Mobile Money", status: "active", fees: "2.5%" },
  { id: "vodafone", name: "Vodafone Cash", status: "active", fees: "2.8%" },
  { id: "airteltigo", name: "AirtelTigo Money", status: "inactive", fees: "3.0%" },
  { id: "paypal", name: "PayPal", status: "active", fees: "3.9%" },
  { id: "stripe", name: "Stripe", status: "inactive", fees: "3.4%" }
];

export default function Billing() {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>();
  const [editingPlan, setEditingPlan] = useState<any>(null);

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
          <Dialog>
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
                  <Input placeholder="Enter school name" />
                </div>
                <div>
                  <Label>Subscription Plan</Label>
                  <Select>
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
                <Button className="w-full">Create Subscription</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

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
              <CardTitle>All Subscriptions</CardTitle>
              <CardDescription>Manage all school subscriptions and their status</CardDescription>
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
                  {mockSubscriptions.map((sub) => (
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
            <CardHeader>
              <CardTitle>Subscription Pricing Plans</CardTitle>
              <CardDescription>Configure pricing for different subscription tiers</CardDescription>
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
              <CardTitle>Payment Service Providers</CardTitle>
              <CardDescription>Manage third-party payment integrations</CardDescription>
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

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockFinancialData.monthlyRevenue.map((data, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <span className="font-medium">{data.month} 2024</span>
                    <div className="text-right">
                      <div className="font-bold">GHS {data.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{data.subscriptions} subscriptions</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}