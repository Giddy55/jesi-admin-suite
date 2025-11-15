import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
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
  TrendingDown,
  Search,
  FileText,
  ClipboardCheck,
  Sparkles
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
  const [ageUserTypeFilter, setAgeUserTypeFilter] = useState<'students' | 'teachers'>('students');

  // MOCK DATA - Platform Analytics
  const demographicsData = {
    byRegion: [
      { region: 'Greater Accra', schools: 312, teachers: 2156, students: 42340 },
      { region: 'Ashanti', schools: 287, teachers: 1987, students: 38920 },
      { region: 'Northern', schools: 198, teachers: 1342, students: 26780 },
      { region: 'Western', schools: 165, teachers: 1134, students: 22140 },
      { region: 'Eastern', schools: 142, teachers: 978, students: 18340 }
    ],
    byAge: {
      students: [
        { range: '5-10', count: 45230 },
        { range: '11-15', count: 62340 },
        { range: '16-18', count: 28450 }
      ],
      teachers: [
        { range: '20-30', count: 2845 },
        { range: '31-40', count: 3456 },
        { range: '41-50', count: 2134 },
        { range: '51-60', count: 1165 }
      ]
    },
    byGender: [
      { gender: 'Male', count: 68900 },
      { gender: 'Female', count: 67889 }
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
    wau: { students: 65, teachers: 82, admins: 90 },
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

  // MOCK DATA - Teacher Analytics
  const teacherUsageData = {
    totalTeachers: 8934,
    activeTeachers: 7772,
    plannerUsers: 6542,
    testCreators: 5123,
    aiUsers: 7201
  };
  
  // Teacher filters
  const [teacherRegionFilter, setTeacherRegionFilter] = useState('all');
  const [teacherDistrictFilter, setTeacherDistrictFilter] = useState('all');
  const [teacherSchoolFilter, setTeacherSchoolFilter] = useState('all');
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');

  // Teacher efficiency filter
  const [efficiencySchoolFilter, setEfficiencySchoolFilter] = useState('all');

  const teacherEfficiencyData = {
    avgHoursSavedLessonPlanning: 12.5,
    avgHoursSavedAssessment: 8.3,
    avgHoursSavedGrading: 6.7,
    avgHoursSavedLearnerMonitoring: 5.2
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

  // Detailed subject data with level breakdown
  const subjectDetailedData: Record<string, {
    name: string;
    overall: { improvement: number; studentsImproving: number; avgScore: number };
    primary: { improvement: number; studentsImproving: number; avgScore: number; totalStudents: number };
    jhs: { improvement: number; studentsImproving: number; avgScore: number; totalStudents: number };
    shs: { improvement: number; studentsImproving: number; avgScore: number; totalStudents: number };
    topicBreakdown: { topic: string; mastery: number }[];
    weakAreas: string[];
    strongAreas: string[];
  }> = {
    mathematics: {
      name: 'Mathematics',
      overall: { improvement: 15, studentsImproving: 72, avgScore: 78 },
      primary: { improvement: 18, studentsImproving: 75, avgScore: 82, totalStudents: 1250 },
      jhs: { improvement: 14, studentsImproving: 70, avgScore: 76, totalStudents: 980 },
      shs: { improvement: 12, studentsImproving: 68, avgScore: 74, totalStudents: 650 },
      topicBreakdown: [
        { topic: 'Algebra', mastery: 85 },
        { topic: 'Geometry', mastery: 78 },
        { topic: 'Statistics', mastery: 82 },
        { topic: 'Trigonometry', mastery: 65 }
      ],
      weakAreas: ['Trigonometry', 'Word Problems'],
      strongAreas: ['Algebra', 'Statistics']
    },
    english: {
      name: 'English',
      overall: { improvement: 12, studentsImproving: 68, avgScore: 82 },
      primary: { improvement: 14, studentsImproving: 70, avgScore: 85, totalStudents: 1300 },
      jhs: { improvement: 11, studentsImproving: 67, avgScore: 80, totalStudents: 1020 },
      shs: { improvement: 10, studentsImproving: 65, avgScore: 78, totalStudents: 700 },
      topicBreakdown: [
        { topic: 'Grammar', mastery: 88 },
        { topic: 'Reading Comprehension', mastery: 85 },
        { topic: 'Writing', mastery: 75 },
        { topic: 'Vocabulary', mastery: 80 }
      ],
      weakAreas: ['Essay Writing', 'Creative Writing'],
      strongAreas: ['Grammar', 'Reading Comprehension']
    },
    science: {
      name: 'Science',
      overall: { improvement: 14, studentsImproving: 70, avgScore: 76 },
      primary: { improvement: 16, studentsImproving: 73, avgScore: 80, totalStudents: 1200 },
      jhs: { improvement: 13, studentsImproving: 69, avgScore: 74, totalStudents: 950 },
      shs: { improvement: 12, studentsImproving: 67, avgScore: 72, totalStudents: 680 },
      topicBreakdown: [
        { topic: 'Biology', mastery: 82 },
        { topic: 'Chemistry', mastery: 70 },
        { topic: 'Physics', mastery: 75 },
        { topic: 'Environmental Science', mastery: 85 }
      ],
      weakAreas: ['Chemistry', 'Physics Calculations'],
      strongAreas: ['Biology', 'Environmental Science']
    },
    'social-studies': {
      name: 'Social Studies',
      overall: { improvement: 11, studentsImproving: 65, avgScore: 80 },
      primary: { improvement: 13, studentsImproving: 68, avgScore: 83, totalStudents: 1150 },
      jhs: { improvement: 10, studentsImproving: 64, avgScore: 78, totalStudents: 900 },
      shs: { improvement: 9, studentsImproving: 62, avgScore: 76, totalStudents: 620 },
      topicBreakdown: [
        { topic: 'Ghana History', mastery: 88 },
        { topic: 'Geography', mastery: 75 },
        { topic: 'Civics', mastery: 78 },
        { topic: 'Economics', mastery: 72 }
      ],
      weakAreas: ['Economics', 'Map Reading'],
      strongAreas: ['Ghana History', 'Civics']
    },
    rme: {
      name: 'RME',
      overall: { improvement: 16, studentsImproving: 75, avgScore: 85 },
      primary: { improvement: 18, studentsImproving: 78, avgScore: 88, totalStudents: 1280 },
      jhs: { improvement: 15, studentsImproving: 74, avgScore: 84, totalStudents: 990 },
      shs: { improvement: 14, studentsImproving: 72, avgScore: 82, totalStudents: 710 },
      topicBreakdown: [
        { topic: 'Religious Studies', mastery: 90 },
        { topic: 'Moral Education', mastery: 85 },
        { topic: 'Cultural Studies', mastery: 82 },
        { topic: 'Ethics', mastery: 88 }
      ],
      weakAreas: ['Comparative Religion'],
      strongAreas: ['Religious Studies', 'Ethics']
    }
  };

  // Get filtered data based on selections
  const getFilteredLearningGainsData = () => {
    const selectedSubject = learningGainsSubjectFilter;
    const selectedLevel = learningGainsSchoolLevelFilter;

    if (selectedSubject === 'all' && selectedLevel === 'all') {
      // Show overall summary
      return {
        type: 'overall' as const,
        data: learningGainsData
      };
    } else if (selectedSubject !== 'all' && selectedLevel === 'all') {
      // Show subject details across all levels
      return {
        type: 'subject' as const,
        data: subjectDetailedData[selectedSubject]
      };
    } else if (selectedSubject === 'all' && selectedLevel !== 'all') {
      // Show all subjects for specific level
      return {
        type: 'level' as const,
        level: selectedLevel,
        subjects: Object.values(subjectDetailedData).map(subject => ({
          name: subject.name,
          improvement: subject[selectedLevel as 'primary' | 'jhs' | 'shs'].improvement,
          avgScore: subject[selectedLevel as 'primary' | 'jhs' | 'shs'].avgScore,
          studentsImproving: subject[selectedLevel as 'primary' | 'jhs' | 'shs'].studentsImproving
        }))
      };
    } else {
      // Show specific subject and level
      return {
        type: 'specific' as const,
        data: subjectDetailedData[selectedSubject],
        level: selectedLevel as 'primary' | 'jhs' | 'shs'
      };
    }
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
              <CardDescription>User distribution across regions, demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="region" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="region">By Region</TabsTrigger>
                  <TabsTrigger value="age">By Age</TabsTrigger>
                  <TabsTrigger value="gender">By Gender</TabsTrigger>
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
                  <div className="space-y-4">
                    {/* Filter for Students/Teachers */}
                    <div className="flex items-center gap-2">
                      <Select value={ageUserTypeFilter} onValueChange={(value: 'students' | 'teachers') => setAgeUserTypeFilter(value)}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="students">Students</SelectItem>
                          <SelectItem value="teachers">Teachers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Display based on filter */}
                    {ageUserTypeFilter === 'students' ? (
                      <div>
                        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Students Age Distribution
                        </h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie 
                              data={demographicsData.byAge.students} 
                              dataKey="count" 
                              nameKey="range" 
                              cx="50%" 
                              cy="50%" 
                              outerRadius={100} 
                              label
                            >
                              {demographicsData.byAge.students.map((entry, index) => (
                                <Cell key={`cell-students-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Teachers Age Distribution
                        </h4>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={demographicsData.byAge.teachers}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#10B981" name="Teachers" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
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
                    <CardTitle className="text-sm">Weekly Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Students</span>
                        <span className="font-bold">{retentionData.wau.students}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Teachers</span>
                        <span className="font-bold">{retentionData.wau.teachers}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Admins</span>
                        <span className="font-bold">{retentionData.wau.admins}%</span>
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
                <CardContent className="space-y-6">
                  {/* Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search teachers..."
                        value={teacherSearchQuery}
                        onChange={(e) => setTeacherSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Select value={teacherRegionFilter} onValueChange={setTeacherRegionFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="greater-accra">Greater Accra</SelectItem>
                        <SelectItem value="ashanti">Ashanti</SelectItem>
                        <SelectItem value="northern">Northern</SelectItem>
                        <SelectItem value="western">Western</SelectItem>
                        <SelectItem value="eastern">Eastern</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={teacherDistrictFilter} onValueChange={setTeacherDistrictFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="District" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Districts</SelectItem>
                        <SelectItem value="accra-metro">Accra Metropolitan</SelectItem>
                        <SelectItem value="kumasi-metro">Kumasi Metropolitan</SelectItem>
                        <SelectItem value="tema-metro">Tema Metropolitan</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={teacherSchoolFilter} onValueChange={setTeacherSchoolFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="School" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Schools</SelectItem>
                        <SelectItem value="school-1">Achimota School</SelectItem>
                        <SelectItem value="school-2">Wesley Girls High School</SelectItem>
                        <SelectItem value="school-3">Prempeh College</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherUsageData.totalTeachers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">Total Number of Users</div>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-success/10 rounded-lg">
                            <UserCheck className="h-5 w-5 text-success" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherUsageData.activeTeachers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">Active Users</div>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-500" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherUsageData.plannerUsers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">Planner Users</div>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-orange-500/10 rounded-lg">
                            <ClipboardCheck className="h-5 w-5 text-orange-500" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherUsageData.testCreators.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">Test Creators</div>
                      </CardContent>
                    </Card>

                    <Card className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Sparkles className="h-5 w-5 text-purple-500" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherUsageData.aiUsers.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">AI Users</div>
                      </CardContent>
                    </Card>
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
                  <CardDescription>Average hours saved per school</CardDescription>
                  <div className="mt-4">
                    <Select value={efficiencySchoolFilter} onValueChange={setEfficiencySchoolFilter}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by school" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Schools</SelectItem>
                        <SelectItem value="accra-academy">Accra Academy</SelectItem>
                        <SelectItem value="mfantsipim">Mfantsipim School</SelectItem>
                        <SelectItem value="achimota">Achimota School</SelectItem>
                        <SelectItem value="prempeh">Prempeh College</SelectItem>
                        <SelectItem value="wesley-girls">Wesley Girls' High School</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherEfficiencyData.avgHoursSavedLessonPlanning}</div>
                        <div className="text-sm text-muted-foreground mt-1">Avg Hours Saved in Lesson Planning</div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-blue-500/10 rounded-lg">
                            <ClipboardCheck className="h-6 w-6 text-blue-500" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherEfficiencyData.avgHoursSavedAssessment}</div>
                        <div className="text-sm text-muted-foreground mt-1">Avg Hours Saved in Assessment</div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-green-500/10 rounded-lg">
                            <BookOpen className="h-6 w-6 text-green-500" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherEfficiencyData.avgHoursSavedGrading}</div>
                        <div className="text-sm text-muted-foreground mt-1">Avg Hours Saved in Grading</div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 bg-purple-500/10 rounded-lg">
                            <Users className="h-6 w-6 text-purple-500" />
                          </div>
                        </div>
                        <div className="text-3xl font-bold">{teacherEfficiencyData.avgHoursSavedLearnerMonitoring}</div>
                        <div className="text-sm text-muted-foreground mt-1">Avg Hours Saved in Learner Monitoring</div>
                      </CardContent>
                    </Card>
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
                  <CardDescription>Student performance improvements over time - Use filters for detailed insights</CardDescription>
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
                  {(() => {
                    const filteredData = getFilteredLearningGainsData();

                    if (filteredData.type === 'overall') {
                      // Show overall summary
                      return (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-4">Learning Progress per Subject (out of 100)</h4>
                            <ResponsiveContainer width="100%" height={250}>
                              <BarChart data={filteredData.data.subjectProgress} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis dataKey="subject" type="category" width={120} />
                                <Tooltip />
                                <Bar dataKey="progress" fill="#3B82F6" name="Progress" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="space-y-4">
                            <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                              <div className="text-sm text-muted-foreground mb-2">Average Score Improvement</div>
                              <div className="text-4xl font-bold text-blue-600">+{filteredData.data.avgImprovement}%</div>
                              <p className="text-sm text-muted-foreground mt-2">Baseline vs. recent test</p>
                            </div>
                            <div className="p-6 border rounded-lg">
                              <div className="text-sm text-muted-foreground mb-2">Students Improving ≥10%</div>
                              <div className="text-4xl font-bold">{filteredData.data.studentsImproving10Plus}%</div>
                              <p className="text-sm text-muted-foreground mt-2">Shows measurable impact</p>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (filteredData.type === 'subject') {
                      // Show detailed subject view
                      const subject = filteredData.data;
                      return (
                        <div className="space-y-6">
                          {/* Key Metrics */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-6 border rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <div className="text-sm text-muted-foreground">Overall Improvement</div>
                              </div>
                              <div className="text-3xl font-bold text-green-600">+{subject.overall.improvement}%</div>
                            </div>
                            <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-blue-600" />
                                <div className="text-sm text-muted-foreground">Students Improving</div>
                              </div>
                              <div className="text-3xl font-bold text-blue-600">{subject.overall.studentsImproving}%</div>
                            </div>
                            <div className="p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                              <div className="flex items-center gap-2 mb-2">
                                <Award className="h-4 w-4 text-purple-600" />
                                <div className="text-sm text-muted-foreground">Average Score</div>
                              </div>
                              <div className="text-3xl font-bold text-purple-600">{subject.overall.avgScore}%</div>
                            </div>
                          </div>

                          {/* Level Breakdown */}
                          <div>
                            <h4 className="text-sm font-medium mb-4">Performance by School Level</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {(['primary', 'jhs', 'shs'] as const).map(level => {
                                const levelData = subject[level];
                                return (
                                  <div key={level} className="p-4 border rounded-lg">
                                    <div className="text-sm font-medium mb-3 capitalize">{level === 'jhs' ? 'JHS' : level === 'shs' ? 'SHS' : 'Primary'}</div>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Improvement</span>
                                        <span className="font-semibold text-green-600">+{levelData.improvement}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Avg Score</span>
                                        <span className="font-semibold">{levelData.avgScore}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Students</span>
                                        <span className="font-semibold">{levelData.totalStudents.toLocaleString()}</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Topic Mastery */}
                          <div>
                            <h4 className="text-sm font-medium mb-4">Topic Mastery Breakdown</h4>
                            <div className="space-y-3">
                              {subject.topicBreakdown.map((topic, idx) => (
                                <div key={idx}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">{topic.topic}</span>
                                    <span className="text-muted-foreground">{topic.mastery}%</span>
                                  </div>
                                  <Progress value={topic.mastery} />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Strong & Weak Areas */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                Strong Areas
                              </h4>
                              <ul className="space-y-1">
                                {subject.strongAreas.map((area, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">• {area}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950">
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <TrendingDown className="h-4 w-4 text-orange-600" />
                                Areas for Improvement
                              </h4>
                              <ul className="space-y-1">
                                {subject.weakAreas.map((area, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">• {area}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (filteredData.type === 'level') {
                      // Show all subjects for specific level
                      return (
                        <div className="space-y-6">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                            <h3 className="text-lg font-semibold capitalize mb-1">
                              {filteredData.level === 'jhs' ? 'JHS' : filteredData.level === 'shs' ? 'SHS' : 'Primary'} Level Performance
                            </h3>
                            <p className="text-sm text-muted-foreground">Subject-wise performance analysis</p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredData.subjects.map((subject, idx) => (
                              <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                <div className="font-medium mb-3">{subject.name}</div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Improvement</span>
                                    <span className="font-semibold text-green-600">+{subject.improvement}%</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Avg Score</span>
                                    <span className="font-semibold">{subject.avgScore}%</span>
                                  </div>
                                  <div className="mt-2">
                                    <Progress value={subject.avgScore} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Chart view */}
                          <div>
                            <h4 className="text-sm font-medium mb-4">Score Improvement Comparison</h4>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={filteredData.subjects}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="improvement" fill="#10B981" name="Improvement %" />
                                <Bar dataKey="avgScore" fill="#3B82F6" name="Avg Score %" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      );
                    } else {
                      // Show specific subject and level
                      const subject = filteredData.data;
                      const levelData = subject[filteredData.level];
                      return (
                        <div className="space-y-6">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg">
                            <h3 className="text-lg font-semibold mb-1">
                              {subject.name} - {filteredData.level === 'jhs' ? 'JHS' : filteredData.level === 'shs' ? 'SHS' : 'Primary'}
                            </h3>
                            <p className="text-sm text-muted-foreground">Detailed performance metrics</p>
                          </div>

                          {/* Key Metrics */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-6 border rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <div className="text-sm text-muted-foreground">Improvement</div>
                              </div>
                              <div className="text-3xl font-bold text-green-600">+{levelData.improvement}%</div>
                            </div>
                            <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                              <div className="flex items-center gap-2 mb-2">
                                <Award className="h-4 w-4 text-blue-600" />
                                <div className="text-sm text-muted-foreground">Average Score</div>
                              </div>
                              <div className="text-3xl font-bold text-blue-600">{levelData.avgScore}%</div>
                            </div>
                            <div className="p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                              <div className="flex items-center gap-2 mb-2">
                                <Users className="h-4 w-4 text-purple-600" />
                                <div className="text-sm text-muted-foreground">Students Improving</div>
                              </div>
                              <div className="text-3xl font-bold text-purple-600">{levelData.studentsImproving}%</div>
                            </div>
                            <div className="p-6 border rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                              <div className="flex items-center gap-2 mb-2">
                                <School className="h-4 w-4 text-orange-600" />
                                <div className="text-sm text-muted-foreground">Total Students</div>
                              </div>
                              <div className="text-3xl font-bold text-orange-600">{levelData.totalStudents.toLocaleString()}</div>
                            </div>
                          </div>

                          {/* Topic Mastery */}
                          <div>
                            <h4 className="text-sm font-medium mb-4">Topic Mastery Breakdown</h4>
                            <div className="space-y-3">
                              {subject.topicBreakdown.map((topic, idx) => (
                                <div key={idx}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium">{topic.topic}</span>
                                    <span className="text-muted-foreground">{topic.mastery}%</span>
                                  </div>
                                  <Progress value={topic.mastery} />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Strong & Weak Areas */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950">
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                Strong Areas
                              </h4>
                              <ul className="space-y-1">
                                {subject.strongAreas.map((area, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">• {area}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950">
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <TrendingDown className="h-4 w-4 text-orange-600" />
                                Areas for Improvement
                              </h4>
                              <ul className="space-y-1">
                                {subject.weakAreas.map((area, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground">• {area}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })()}
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
