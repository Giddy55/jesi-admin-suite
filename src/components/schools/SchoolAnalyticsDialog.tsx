import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Users, BookOpen } from 'lucide-react';
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
    lessonsCompleted: 1240,
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
