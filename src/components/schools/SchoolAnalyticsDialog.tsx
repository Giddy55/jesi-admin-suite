import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, TrendingUp, Users, BookOpen, Award, Calendar } from 'lucide-react';
import type { School } from '@/lib/mockData';

interface SchoolAnalyticsDialogProps {
  school: School | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SchoolAnalyticsDialog({ school, open, onOpenChange }: SchoolAnalyticsDialogProps) {
  if (!school) return null;

  // Mock analytics data - in production, this would come from the database
  const analytics = {
    totalStudents: 450,
    totalTeachers: 32,
    averageAttendance: 92,
    averageGrade: 78,
    lessonsCompleted: 1240,
    upcomingExams: 8,
    recentPerformance: [
      { month: 'Jan', score: 75 },
      { month: 'Feb', score: 78 },
      { month: 'Mar', score: 82 },
      { month: 'Apr', score: 79 },
      { month: 'May', score: 85 },
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            School Analytics - {school.name}
          </DialogTitle>
          <DialogDescription>
            Performance metrics and statistics for {school.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.totalStudents}</p>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.totalTeachers}</p>
                    <p className="text-sm text-muted-foreground">Total Teachers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.averageAttendance}%</p>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.averageGrade}%</p>
                    <p className="text-sm text-muted-foreground">Average Grade</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.lessonsCompleted}</p>
                    <p className="text-sm text-muted-foreground">Lessons Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{analytics.upcomingExams}</p>
                    <p className="text-sm text-muted-foreground">Upcoming Exams</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Trend */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Performance Trend
              </h3>
              <div className="space-y-3">
                {analytics.recentPerformance.map((item) => (
                  <div key={item.month} className="flex items-center gap-3">
                    <span className="w-12 text-sm font-medium">{item.month}</span>
                    <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                      <div 
                        className="bg-primary h-full flex items-center justify-end pr-3"
                        style={{ width: `${item.score}%` }}
                      >
                        <span className="text-xs font-semibold text-primary-foreground">{item.score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Top Performing Subjects
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Mathematics</span>
                  <span className="text-success font-semibold">85%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">English</span>
                  <span className="text-success font-semibold">82%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">Science</span>
                  <span className="text-warning font-semibold">78%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
