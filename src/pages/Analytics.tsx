import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { DateRange } from 'react-day-picker';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  School, 
  GraduationCap, 
  BookOpen, 
  Activity, 
  Download, 
  Calendar as CalendarIcon, 
  Filter,
  Target,
  Clock,
  Award
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function Analytics() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });

  // Mock data for analytics
  const overviewStats = [
    {
      title: 'Active Schools',
      value: '1,247',
      change: '+12%',
      trend: 'up',
      icon: School,
      description: 'vs last month'
    },
    {
      title: 'Active Teachers',
      value: '8,934',
      change: '+8%',
      trend: 'up',
      icon: GraduationCap,
      description: 'vs last month'
    },
    {
      title: 'Active Students',
      value: '156,789',
      change: '+15%',
      trend: 'up',
      icon: Users,
      description: 'vs last month'
    },
    {
      title: 'Lesson Completion Rate',
      value: '87.3%',
      change: '+3.2%',
      trend: 'up',
      icon: BookOpen,
      description: 'vs last month'
    }
  ];

  const engagementData = [
    { month: 'Jan', teachers: 7200, students: 125000, lessons: 45000 },
    { month: 'Feb', teachers: 7800, students: 132000, lessons: 48000 },
    { month: 'Mar', teachers: 8200, students: 142000, lessons: 52000 },
    { month: 'Apr', teachers: 8600, students: 148000, lessons: 55000 },
    { month: 'May', teachers: 8934, students: 156789, lessons: 58234 },
  ];

  const learningOutcomes = [
    { subject: 'Mathematics', avgScore: 78, completion: 89, improvement: '+5%' },
    { subject: 'English', avgScore: 82, completion: 92, improvement: '+3%' },
    { subject: 'Science', avgScore: 75, completion: 85, improvement: '+7%' },
    { subject: 'Social Studies', avgScore: 80, completion: 88, improvement: '+4%' },
    { subject: 'RME', avgScore: 85, completion: 94, improvement: '+2%' }
  ];

  const regionalData = [
    { region: 'Greater Accra', schools: 312, teachers: 2156, students: 42340, performance: 85 },
    { region: 'Ashanti', schools: 287, teachers: 1987, students: 38920, performance: 82 },
    { region: 'Northern', schools: 198, teachers: 1342, students: 26780, performance: 79 },
    { region: 'Western', schools: 165, teachers: 1134, students: 22140, performance: 81 },
    { region: 'Eastern', schools: 142, teachers: 978, students: 18340, performance: 84 },
    { region: 'Central', schools: 143, teachers: 1337, students: 8269, performance: 80 }
  ];

  const usagePatterns = [
    { time: '6AM', usage: 5 },
    { time: '8AM', usage: 45 },
    { time: '10AM', usage: 85 },
    { time: '12PM', usage: 95 },
    { time: '2PM', usage: 78 },
    { time: '4PM', usage: 52 },
    { time: '6PM', usage: 25 },
    { time: '8PM', usage: 15 }
  ];

  const platformHealth = [
    { name: 'System Uptime', value: 99.8, color: '#10B981' },
    { name: 'Content Quality', value: 94.5, color: '#3B82F6' },
    { name: 'User Satisfaction', value: 92.3, color: '#8B5CF6' },
    { name: 'Performance Score', value: 96.7, color: '#F59E0B' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-2">
            Real-time platform analytics and learning outcome insights
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-72 justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from && dateRange?.to
                  ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                  : "Select date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className={`${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                {stat.description}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="learning">Learning Outcomes</TabsTrigger>
          <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          <TabsTrigger value="health">Platform Health</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Monthly Active Users
                </CardTitle>
                <CardDescription>Teachers and students engagement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="teachers" stroke="#8884d8" name="Teachers" />
                    <Line type="monotone" dataKey="students" stroke="#82ca9d" name="Students" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Lesson Activity
                </CardTitle>
                <CardDescription>Monthly lesson completions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="lessons" stroke="#ffc658" fill="#ffc658" name="Lessons Completed" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Engagement Filters</CardTitle>
              <CardDescription>Filter data by various criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Region</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="accra">Greater Accra</SelectItem>
                      <SelectItem value="ashanti">Ashanti</SelectItem>
                      <SelectItem value="northern">Northern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">School Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="public">Public Schools</SelectItem>
                      <SelectItem value="private">Private Schools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Grade Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All grades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="p1-p3">Primary 1-3</SelectItem>
                      <SelectItem value="p4-p6">Primary 4-6</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">User Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="teachers">Teachers</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Outcomes by Subject
              </CardTitle>
              <CardDescription>Average scores and completion rates across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{outcome.subject}</span>
                        <Badge className="bg-green-500">{outcome.improvement}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Average Score: </span>
                          <span className="font-medium">{outcome.avgScore}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Completion: </span>
                          <span className="font-medium">{outcome.completion}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Performance Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={learningOutcomes}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="avgScore"
                      label
                    >
                      {learningOutcomes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Completion Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={learningOutcomes} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="subject" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="completion" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="h-5 w-5" />
                Regional Performance Overview
              </CardTitle>
              <CardDescription>Schools, teachers, students, and performance by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Region</th>
                      <th className="text-left p-2">Schools</th>
                      <th className="text-left p-2">Teachers</th>
                      <th className="text-left p-2">Students</th>
                      <th className="text-left p-2">Performance Score</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {regionalData.map((region, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{region.region}</td>
                        <td className="p-2">{region.schools.toLocaleString()}</td>
                        <td className="p-2">{region.teachers.toLocaleString()}</td>
                        <td className="p-2">{region.students.toLocaleString()}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-blue-500 rounded-full" 
                                style={{ width: `${region.performance}%` }}
                              />
                            </div>
                            <span className="text-sm">{region.performance}%</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Regional Performance Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="performance" fill="#8884d8" name="Performance Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Daily Usage Patterns
              </CardTitle>
              <CardDescription>Platform usage throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={usagePatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="usage" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Morning Peak (10-12 PM)</span>
                    <Badge>95% utilization</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Afternoon Peak (2-4 PM)</span>
                    <Badge>78% utilization</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Evening Usage (6-8 PM)</span>
                    <Badge>25% utilization</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Mobile Devices</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Desktop Computers</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tablets</span>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformHealth.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${metric.value}%`,
                        backgroundColor: metric.color
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>System Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Response Time</h4>
                  <div className="text-2xl font-bold text-green-600">245ms</div>
                  <p className="text-sm text-muted-foreground">Average API response</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Error Rate</h4>
                  <div className="text-2xl font-bold text-yellow-600">0.03%</div>
                  <p className="text-sm text-muted-foreground">System error rate</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Concurrent Users</h4>
                  <div className="text-2xl font-bold text-blue-600">2,847</div>
                  <p className="text-sm text-muted-foreground">Active right now</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}