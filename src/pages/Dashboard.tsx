import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  CreditCard,
  School,
  UserPlus,
  DollarSign,
  Target,
  Heart,
  MapPin,
  Sparkles
} from 'lucide-react';
import { mockDashboardKPIs } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const kpis = mockDashboardKPIs;
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Onboard School',
      description: 'Add a new school to the platform',
      icon: Plus,
      action: '/schools',
      variant: 'primary' as const
    },
    {
      title: 'View Users',
      description: 'Manage platform users',
      icon: Users,
      action: '/schools',
      variant: 'secondary' as const
    },
    {
      title: 'View Subscription',
      description: 'Check billing and plans',
      icon: CreditCard,
      action: '/billing',
      variant: 'outline' as const
    },
    {
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: TrendingUp,
      action: '/analytics',
      variant: 'outline' as const
    }
  ];

  return (
    <div className="p-6 space-y-8">
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

      {/* Platform Adoption & Growth */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Platform Adoption & Growth</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Schools
              </CardTitle>
              <School className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpis.totalSchools.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Onboarded to platform
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Learners
              </CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpis.activeStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active students
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Teachers
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpis.activeTeachers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active teachers
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reach
              </CardTitle>
              <MapPin className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">100/274</div>
              <p className="text-xs text-muted-foreground mt-1">
                Districts
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Business & Financial Health */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-success" />
          <h2 className="text-xl font-semibold text-foreground">Business & Financial Health</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover-scale transition-all border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${kpis.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Per year
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Subscriptions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpis.activeSubscriptions.toLocaleString()}</div>
              <p className="text-xs text-success mt-1">
                Schools subscribed
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ARPU
              </CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${kpis.arpu.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Avg per school/month
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Churn Rate
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpis.churnRate}%</div>
              <Progress value={kpis.churnRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Last 30 days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Impact & Social Value */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-destructive" />
          <h2 className="text-xl font-semibold text-foreground">Impact & Social Value</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover-scale transition-all border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Teacher Hours Saved
              </CardTitle>
              <Sparkles className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpis.teacherHoursSaved.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Cumulative across all schools
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all border-success/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                At-Risk Learners
              </CardTitle>
              <Heart className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpis.atRiskLearnersSupported.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Identified & supported via AI
              </p>
            </CardContent>
          </Card>

          <Card className="hover-scale transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Geographic Reach
              </CardTitle>
              <MapPin className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {kpis.districtsReached}/{kpis.totalDistricts}
              </div>
              <Progress 
                value={(kpis.districtsReached / kpis.totalDistricts) * 100} 
                className="mt-2" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Districts covered
              </p>
            </CardContent>
          </Card>
        </div>
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
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(action.action)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        action.variant === 'primary' ? 'bg-primary/10' :
                        action.variant === 'secondary' ? 'bg-secondary/10' :
                        'bg-muted'
                      }`}>
                        <action.icon className={`h-4 w-4 ${
                          action.variant === 'primary' ? 'text-primary' :
                          action.variant === 'secondary' ? 'text-secondary-foreground' :
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