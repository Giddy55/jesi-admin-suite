import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
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
  Legend
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
  Target,
  Clock,
  Award,
  Globe,
  UserCheck,
  Brain,
  Zap,
  ThumbsUp,
  BarChart3,
  MonitorSmartphone,
  CheckCircle,
  TrendingDown
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function Analytics() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined
  });
  
  // Filter states
  const [regionFilter, setRegionFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [schoolFilter, setSchoolFilter] = useState('all');
  const [academicYearFilter, setAcademicYearFilter] = useState('2024/2025');
  const [learningGainsSubjectFilter, setLearningGainsSubjectFilter] = useState('all');
  const [learningGainsSchoolLevelFilter, setLearningGainsSchoolLevelFilter] = useState('all');

  // MOCK DATA - Platform Analytics
  const demographicsData = {
    byRegion: [
      { region: 'Greater Accra', schools: 312, teachers: 2156, students: 42340 },
      { region: 'Ashanti', schools: 287, teachers: 1987, students: 38920 },
      { region: 'Northern', schools: 198, teachers: 1342, students: 26780 },
      { region: 'Western', schools: 165, teachers: 1134, students: 22140 },
      { region: 'Eastern', schools: 142, teachers: 978, students: 18340 }
    ],
    byAge: [
      { range: '5-10', count: 45230 },
      { range: '11-15', count: 62340 },
      { range: '16-18', count: 28450 }
    ],
    byGender: [
      { gender: 'Male', count: 68900 },
      { gender: 'Female', count: 67889 }
    ],
    languages: [
      { language: 'English', percentage: 100 },
      { language: 'Twi', percentage: 45 },
      { language: 'Ga', percentage: 23 },
      { language: 'Ewe', percentage: 18 }
    ]
  };

  const userGrowthData = [
    { month: 'Jan', students: 125000, teachers: 7200, schools: 1050 },
    { month: 'Feb', students: 132000, teachers: 7800, schools: 1120 },
    { month: 'Mar', students: 142000, teachers: 8200, schools: 1180 },
    { month: 'Apr', students: 148000, teachers: 8600, schools: 1220 },
    { month: 'May', students: 156789, teachers: 8934, schools: 1247 }
  ];

  const retentionData = {
    dau_mau: { students: 22, teachers: 68, admins: 85 },
    churnRate: { students: 5.2, teachers: 2.8, schools: 1.5 },
    retention7day: { students: 78, teachers: 92, admins: 95 },
    retention30day: { students: 65, teachers: 85, admins: 90 },
    satisfaction: { students: 4.2, teachers: 4.6, admins: 4.5 }
  };

  const usagePatternsData = {
    peakTimes: [
      { time: '6AM', students: 5, teachers: 8, admins: 2 },
      { time: '8AM', students: 45, teachers: 75, admins: 15 },
      { time: '10AM', students: 85, teachers: 90, admins: 25 },
      { time: '12PM', students: 95, teachers: 85, admins: 30 },
      { time: '2PM', students: 78, teachers: 70, admins: 28 },
      { time: '4PM', students: 52, teachers: 45, admins: 20 },
      { time: '6PM', students: 25, teachers: 20, admins: 10 },
      { time: '8PM', students: 15, teachers: 12, admins: 5 }
    ],
    devices: [
      { device: 'Mobile', students: 72, teachers: 45, admins: 30 },
      { device: 'Desktop', students: 20, teachers: 48, admins: 60 },
      { device: 'Tablet', students: 8, teachers: 7, admins: 10 }
    ]
  };

  const platformHealthData = {
    uptime: 99.8,
    pageLoadTime: 1.2,
    errorRate: 0.3,
    concurrentUsers: 12450,
    bugReports: 23
  };

  // MOCK DATA - Teacher Analytics
  const teacherUsageData = {
    weeklyActive: 87,
    lessonPlansPerWeek: 4,
    assessmentsPerWeek: 3,
    aiRecommendationsPerWeek: 13
  };

  const teacherEfficiencyData = {
    planningTimeBefore: 120,
    planningTimeAfter: 35,
    lessonsPerHour: 2,
    assessmentsPerHour: 2,
    hoursSavedPerMonth: 28
  };

  const learnerEngagementData = {
    attendanceBefore: 78,
    attendanceAfter: 92,
    engagementScore: 85,
    learnerSatisfactionScore: 88
  };

  const learningGainsData = {
    avgImprovement: 13,
    studentsImproving10Plus: 68,
    subjectProgress: [
      { subject: 'Mathematics', progress: 85 },
      { subject: 'English', progress: 78 },
      { subject: 'Science', progress: 82 },
      { subject: 'Social Studies', progress: 75 },
      { subject: 'RME', progress: 88 }
    ]
  };

  const curriculumData = {
    alignmentRate: 94,
    coverageBySubject: [
      { subject: 'Mathematics', coverage: 78 },
      { subject: 'English', coverage: 85 },
      { subject: 'Science', coverage: 72 },
      { subject: 'Social Studies', coverage: 68 },
      { subject: 'RME', coverage: 90 }
    ],
    knowledgeScore: 87
  };

  const teacherSatisfactionData = {
    csat: 5,
    nps: 72,
    supportTicketsPerTeacher: 0,
    featureAdoptionIndex: 8
  };

  // MOCK DATA - Learner Analytics
  const learnerEngagementMetrics = {
    avgSessionDuration: 32,
    learningDaysPerWeek: 4,
    streakDays: 12
  };

  const learnerMasteryData = {
    masteryByTopic: [
      { topic: 'Algebra', score: 85 },
      { topic: 'Geometry', score: 78 },
      { topic: 'Grammar', score: 82 },
      { topic: 'Reading Comp.', score: 88 },
      { topic: 'Biology', score: 75 }
    ],
    knowledgeGainPrePost: 19
  };

  const selfLearningData = {
    sessionsPerWeek: 3,
    topSubjects: [
      { subject: 'Mathematics', percentage: 35 },
      { subject: 'Science', percentage: 28 },
      { subject: 'English', percentage: 22 },
      { subject: 'Social Studies', percentage: 15 }
    ],
    avgTimePerTopic: 25
  };

  const learningOutcomeData = {
    scoreBySubject: [
      { subject: 'Mathematics', primary: 78, jhs: 72, shs: 68 },
      { subject: 'English Language', primary: 82, jhs: 79, shs: 75 },
      { subject: 'Science', primary: 75, jhs: 73, shs: 70 },
      { subject: 'Social Studies', primary: 80, jhs: 76, shs: 72 },
      { subject: 'ICT', primary: 85, jhs: 81, shs: 78 },
      { subject: 'French', primary: 70, jhs: 68, shs: 65 },
      { subject: 'RME', primary: 88, jhs: 84, shs: 80 },
      { subject: 'Creative Arts', primary: 83, jhs: 79, shs: 76 },
      { subject: 'Physical Education', primary: 90, jhs: 87, shs: 85 },
      { subject: 'Career Technology', primary: 77, jhs: 74, shs: 71 }
    ]
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Filter component
  const FilterSection = () => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-sm">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">National/Region</label>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">National</SelectItem>
                <SelectItem value="accra">Greater Accra</SelectItem>
                <SelectItem value="ashanti">Ashanti</SelectItem>
                <SelectItem value="northern">Northern</SelectItem>
                <SelectItem value="western">Western</SelectItem>
                <SelectItem value="eastern">Eastern</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">District</label>
            <Select value={districtFilter} onValueChange={setDistrictFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                <SelectItem value="accra-metro">Accra Metro</SelectItem>
                <SelectItem value="tema">Tema</SelectItem>
                <SelectItem value="kumasi">Kumasi</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">School</label>
            <Select value={schoolFilter} onValueChange={setSchoolFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schools</SelectItem>
                <SelectItem value="sch1">School 1</SelectItem>
                <SelectItem value="sch2">School 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">&nbsp;</label>
            <Button variant="outline" className="w-full">Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive platform and learning analytics
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
            <PopoverContent className="w-auto p-0 bg-popover" align="start">
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

      {/* Main Tabs: Platform Analytics vs Learning Analytics */}
      <Tabs defaultValue="platform" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="platform">Platform Analytics</TabsTrigger>
          <TabsTrigger value="learning">Learning Analytics</TabsTrigger>
        </TabsList>

        {/* ========== PLATFORM ANALYTICS ========== */}
        <TabsContent value="platform" className="space-y-6">
          
          {/* User Demographics & Reach */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                User Demographics & Reach
              </CardTitle>
              <CardDescription>User distribution across regions, demographics, and languages</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="region" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="region">By Region</TabsTrigger>
                  <TabsTrigger value="age">By Age</TabsTrigger>
                  <TabsTrigger value="gender">By Gender</TabsTrigger>
                  <TabsTrigger value="language">Languages</TabsTrigger>
                </TabsList>

                <TabsContent value="region">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={demographicsData.byRegion}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="students" fill="#3B82F6" name="Students" />
                      <Bar dataKey="teachers" fill="#10B981" name="Teachers" />
                      <Bar dataKey="schools" fill="#F59E0B" name="Schools" />
                    </BarChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="age">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={demographicsData.byAge} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={100} label>
                        {demographicsData.byAge.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="gender">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={demographicsData.byGender} dataKey="count" nameKey="gender" cx="50%" cy="50%" outerRadius={100} label>
                        {demographicsData.byGender.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="language">
                  <div className="space-y-3">
                    {demographicsData.languages.map((lang, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="w-24 text-sm font-medium">{lang.language}</span>
                        <Progress value={lang.percentage} className="flex-1" />
                        <span className="w-12 text-sm text-muted-foreground">{lang.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* User Growth & Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                User Growth & Retention Metrics
              </CardTitle>
              <CardDescription>Platform growth and user engagement trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Growth Chart */}
              <div>
                <h4 className="text-sm font-medium mb-4">New Signups per Month</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#3B82F6" name="Students" />
                    <Line type="monotone" dataKey="teachers" stroke="#10B981" name="Teachers" />
                    <Line type="monotone" dataKey="schools" stroke="#F59E0B" name="Schools" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">DAU/MAU Ratio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Students</span>
                        <span className="font-bold">{retentionData.dau_mau.students}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Teachers</span>
                        <span className="font-bold">{retentionData.dau_mau.teachers}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Admins</span>
                        <span className="font-bold">{retentionData.dau_mau.admins}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Churn Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Students</span>
                        <span className="font-bold text-red-500">{retentionData.churnRate.students}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Teachers</span>
                        <span className="font-bold text-red-500">{retentionData.churnRate.teachers}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Schools</span>
                        <span className="font-bold text-red-500">{retentionData.churnRate.schools}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">User Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Students</span>
                        <span className="font-bold">{retentionData.satisfaction.students}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Teachers</span>
                        <span className="font-bold">{retentionData.satisfaction.teachers}/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Admins</span>
                        <span className="font-bold">{retentionData.satisfaction.admins}/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Usage Patterns & Platform Health */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Peak Usage Times
                </CardTitle>
                <div className="flex gap-2 mt-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="teachers">Teachers</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={usagePatternsData.peakTimes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="#3B82F6" />
                    <Line type="monotone" dataKey="teachers" stroke="#10B981" />
                    <Line type="monotone" dataKey="admins" stroke="#F59E0B" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MonitorSmartphone className="h-5 w-5" />
                  Device Usage
                </CardTitle>
                <div className="flex gap-2 mt-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="teachers">Teachers</SelectItem>
                      <SelectItem value="admins">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={usagePatternsData.devices}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="device" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="#3B82F6" name="Students" />
                    <Bar dataKey="teachers" fill="#10B981" name="Teachers" />
                    <Bar dataKey="admins" fill="#F59E0B" name="Admins" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Platform Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Platform Health Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">System Uptime</div>
                  <div className="text-2xl font-bold text-green-600">{platformHealthData.uptime}%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Page Load Time</div>
                  <div className="text-2xl font-bold">{platformHealthData.pageLoadTime}s</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Error Rate</div>
                  <div className="text-2xl font-bold text-orange-600">{platformHealthData.errorRate}%</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Concurrent Users</div>
                  <div className="text-2xl font-bold">{platformHealthData.concurrentUsers.toLocaleString()}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Bug Reports</div>
                  <div className="text-2xl font-bold text-red-600">{platformHealthData.bugReports}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ========== LEARNING ANALYTICS ========== */}
        <TabsContent value="learning" className="space-y-6">
          <Tabs defaultValue="teacher" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="teacher">Teacher Analytics</TabsTrigger>
              <TabsTrigger value="learner">Learner Analytics</TabsTrigger>
            </TabsList>

            {/* ========== TEACHER ANALYTICS ========== */}
            <TabsContent value="teacher" className="space-y-6">
              <FilterSection />

              {/* Teacher Usage & Adoption */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Teacher Usage & Adoption
                  </CardTitle>
                  <CardDescription>How teachers are using Jesi AI lesson planner</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Weekly Active Teachers</div>
                      <div className="text-3xl font-bold text-primary">{teacherUsageData.weeklyActive}%</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Lesson Plan Generated per Week</div>
                      <div className="text-3xl font-bold">{teacherUsageData.lessonPlansPerWeek}</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Assessment Generated per Week</div>
                      <div className="text-3xl font-bold">{teacherUsageData.assessmentsPerWeek}</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">AI Advice Accessed</div>
                      <div className="text-3xl font-bold">{teacherUsageData.aiRecommendationsPerWeek}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Teacher Efficiency */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Teacher Efficiency
                  </CardTitle>
                  <CardDescription>Time savings and productivity improvements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-4">Planning Time Comparison</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                          { phase: 'Before Jesi', minutes: teacherEfficiencyData.planningTimeBefore },
                          { phase: 'Using Jesi', minutes: teacherEfficiencyData.planningTimeAfter }
                        ]} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="phase" type="category" width={100} />
                          <Tooltip />
                          <Bar dataKey="minutes" fill="#10B981" name="Minutes" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Lesson Plan Generated per Hour</div>
                        <div className="text-2xl font-bold">{teacherEfficiencyData.lessonsPerHour}</div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Assessments Generated per Hour</div>
                        <div className="text-2xl font-bold">{teacherEfficiencyData.assessmentsPerHour}</div>
                      </div>
                      <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                        <div className="text-sm text-muted-foreground">Average Hours Saved per Week</div>
                        <div className="text-2xl font-bold text-green-600">{teacherEfficiencyData.hoursSavedPerMonth}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learner Engagement Impact */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Learner Engagement Impact
                  </CardTitle>
                  <CardDescription>How Jesi AI impacts student engagement in class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Learner Satisfaction Score</div>
                      <div className="text-3xl font-bold text-green-600">{learnerEngagementData.learnerSatisfactionScore}%</div>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Average Class Engagement Rate</div>
                      <div className="text-3xl font-bold text-primary">{learnerEngagementData.engagementScore}%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Gains */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Learning Gains
                  </CardTitle>
                  <CardDescription>Academic improvement since using Jesi AI</CardDescription>
                  <div className="flex gap-4 mt-4">
                    <Select value={learningGainsSubjectFilter} onValueChange={setLearningGainsSubjectFilter}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="social-studies">Social Studies</SelectItem>
                        <SelectItem value="rme">RME</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={learningGainsSchoolLevelFilter} onValueChange={setLearningGainsSchoolLevelFilter}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by School Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="jhs">JHS</SelectItem>
                        <SelectItem value="shs">SHS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-4">Learning Progress per Subject (out of 100)</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={learningGainsData.subjectProgress} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="subject" type="category" width={120} />
                          <Tooltip />
                          <Bar dataKey="progress" fill="#3B82F6" name="Progress" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 border rounded-lg bg-blue-50 dark:bg-blue-950">
                        <div className="text-sm text-muted-foreground mb-2">Average Score Improvement</div>
                        <div className="text-4xl font-bold text-blue-600">+{learningGainsData.avgImprovement}%</div>
                        <p className="text-sm text-muted-foreground mt-2">Baseline vs. recent test</p>
                      </div>
                      <div className="p-6 border rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Students Improving ≥10%</div>
                        <div className="text-4xl font-bold">{learningGainsData.studentsImproving10Plus}%</div>
                        <p className="text-sm text-muted-foreground mt-2">Shows measurable impact</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum Understanding */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Curriculum Understanding
                  </CardTitle>
                  <CardDescription>Alignment with GES curriculum standards</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div>
                      <div className="text-sm text-muted-foreground">Curriculum Alignment Rate</div>
                      <p className="text-xs text-muted-foreground mt-1">% of lesson plans matching GES outcomes</p>
                    </div>
                    <div className="text-4xl font-bold text-green-600">{curriculumData.alignmentRate}%</div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-4">Curriculum Coverage Progress Tracker</h4>
                    <div className="space-y-3">
                      {curriculumData.coverageBySubject.map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{item.subject}</span>
                            <span className="text-muted-foreground">{item.coverage}%</span>
                          </div>
                          <Progress value={item.coverage} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">Curriculum Knowledge Score</div>
                    <div className="text-3xl font-bold">{curriculumData.knowledgeScore}%</div>
                    <p className="text-xs text-muted-foreground mt-1">Teacher self-assessment</p>
                  </div>
                </CardContent>
              </Card>

              {/* Teacher Satisfaction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ThumbsUp className="h-5 w-5" />
                    Teacher Satisfaction
                  </CardTitle>
                  <CardDescription>How teachers feel about the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">CSAT Score</div>
                      <div className="text-3xl font-bold">{teacherSatisfactionData.csat}/5</div>
                      <p className="text-xs text-muted-foreground mt-1">From surveys</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Net Promoter Score</div>
                      <div className="text-3xl font-bold text-green-600">{teacherSatisfactionData.nps}</div>
                      <p className="text-xs text-muted-foreground mt-1">Willingness to recommend</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Support Tickets</div>
                      <div className="text-3xl font-bold">{teacherSatisfactionData.supportTicketsPerTeacher}</div>
                      <p className="text-xs text-muted-foreground mt-1">Per teacher (lower is better)</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-2">Feature Adoption</div>
                      <div className="text-3xl font-bold">{teacherSatisfactionData.featureAdoptionIndex}/10</div>
                      <p className="text-xs text-muted-foreground mt-1">Features actively used</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ========== LEARNER ANALYTICS ========== */}
            <TabsContent value="learner" className="space-y-6">
              <FilterSection />

              {/* Learning Engagement Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Learning Engagement Metrics
                  </CardTitle>
                  <CardDescription>Track how actively learners use Jesi AI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">Avg Session (min)</div>
                      <div className="text-2xl font-bold">{learnerEngagementMetrics.avgSessionDuration}</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">Learning Days per Week</div>
                      <div className="text-2xl font-bold">{learnerEngagementMetrics.learningDaysPerWeek}</div>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-2">Streak Days</div>
                      <div className="text-2xl font-bold text-primary">{learnerEngagementMetrics.streakDays}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Progress & Mastery */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Learning Progress & Mastery Metrics
                  </CardTitle>
                  <CardDescription>How much learners are learning over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-4">Mastery Score per Topic</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={learnerMasteryData.masteryByTopic} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="topic" type="category" width={120} />
                          <Tooltip />
                          <Bar dataKey="score" fill="#8B5CF6" name="Score" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="p-8 border rounded-lg text-center bg-purple-50 dark:bg-purple-950">
                        <div className="text-sm text-muted-foreground mb-2">Knowledge Gain</div>
                        <div className="text-sm text-muted-foreground mb-4">(Pre-test vs. Post-test)</div>
                        <div className="text-5xl font-bold text-purple-600">+{learnerMasteryData.knowledgeGainPrePost}%</div>
                        <p className="text-sm text-muted-foreground mt-4">Measures actual learning</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Self-Learning Behavior */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Self-Learning Behavior Metrics
                  </CardTitle>
                  <CardDescription>How learners explore independently</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-4">Top Selected Subjects for Self-Learning</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie data={selfLearningData.topSubjects} dataKey="percentage" nameKey="subject" cx="50%" cy="50%" outerRadius={80} label>
                            {selfLearningData.topSubjects.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      <div className="p-6 border rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Self-Learning Sessions/Week</div>
                        <div className="text-4xl font-bold">{selfLearningData.sessionsPerWeek}</div>
                        <p className="text-sm text-muted-foreground mt-2">Shows initiative</p>
                      </div>
                      <div className="p-6 border rounded-lg">
                        <div className="text-sm text-muted-foreground mb-2">Avg Time per Topic (min)</div>
                        <div className="text-4xl font-bold">{selfLearningData.avgTimePerTopic}</div>
                        <p className="text-sm text-muted-foreground mt-2">Quality of self-directed learning</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Outcome Metrics */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Learning Outcome Metrics
                    </CardTitle>
                    <CardDescription>Real educational impact per subject and level</CardDescription>
                  </div>
                  <Select value={academicYearFilter} onValueChange={setAcademicYearFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Academic Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024/2025">2024/2025</SelectItem>
                      <SelectItem value="2023/2024">2023/2024</SelectItem>
                      <SelectItem value="2022/2023">2022/2023</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="text-sm font-medium mb-4">Average Academic Score (Term 1 baseline)</h4>
                    <div className="overflow-x-auto">
                      <div style={{ minWidth: '800px' }}>
                        <ResponsiveContainer width="100%" height={400}>
                          <BarChart data={learningOutcomeData.scoreBySubject}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" angle={-45} textAnchor="end" height={120} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="primary" fill="#3B82F6" name="Primary" />
                            <Bar dataKey="jhs" fill="#10B981" name="JHS" />
                            <Bar dataKey="shs" fill="#F59E0B" name="SHS" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
