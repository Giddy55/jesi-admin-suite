import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  Plus,
  FileCheck,
  Bot,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { mockDashboardKPIs } from '@/lib/mockData';

export default function Dashboard() {
  const kpis = mockDashboardKPIs;

  const quickActions = [
    {
      title: 'Onboard School',
      description: 'Add a new school to the platform',
      icon: Plus,
      action: '/schools/new',
      variant: 'primary' as const
    },
    {
      title: 'Review Content Approvals',
      description: '8 items pending approval',
      icon: FileCheck,
      action: '/content?status=pending_approval',
      variant: 'secondary' as const
    },
    {
      title: 'Resolve AI Flags',
      description: '3 high priority flags',
      icon: Bot,
      action: '/ai-quality?severity=high',
      variant: 'destructive' as const
    },
    {
      title: 'View Renewals',
      description: '12 subscriptions expiring soon',
      icon: Calendar,
      action: '/billing?renewal=soon',
      variant: 'outline' as const
    },
    {
      title: 'Send Announcement',
      description: 'Broadcast to all schools',
      icon: MessageCircle,
      action: '/support/announcements/new',
      variant: 'outline' as const
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to Jesi AI Super Admin Console
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-success">
            System Operational
          </Badge>
          <span className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="kpi-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Schools
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpis.totalSchools}</div>
            <p className="text-xs text-success mt-1">
              +12 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Teachers
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpis.activeTeachers.toLocaleString()}</div>
            <p className="text-xs text-success mt-1">
              +156 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Students
            </CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpis.activeStudents.toLocaleString()}</div>
            <p className="text-xs text-success mt-1">
              +2,341 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Uptime
            </CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{kpis.uptime}%</div>
            <p className="text-xs text-success mt-1">
              Above SLA target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common administrative tasks and workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        action.variant === 'primary' ? 'bg-primary/10' :
                        action.variant === 'destructive' ? 'bg-destructive/10' :
                        'bg-muted'
                      }`}>
                        <action.icon className={`h-4 w-4 ${
                          action.variant === 'primary' ? 'text-primary' :
                          action.variant === 'destructive' ? 'text-destructive' :
                          'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                        <p className="text-xs text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">New school registered</p>
                <p className="text-muted-foreground text-xs">Accra Technical University - 5 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Content flagged for review</p>
                <p className="text-muted-foreground text-xs">Mathematics lesson plan - 12 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">Subscription renewed</p>
                <p className="text-muted-foreground text-xs">Western Hills Academy - 1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">System maintenance completed</p>
                <p className="text-muted-foreground text-xs">Database optimization - 2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}