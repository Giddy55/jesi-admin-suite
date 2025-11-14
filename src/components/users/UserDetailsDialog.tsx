import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Users, Mail, Phone, Building2, Calendar, GraduationCap, Shield, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface UserDetailsDialogProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserDetailsDialog({ user, open, onOpenChange }: UserDetailsDialogProps) {
  if (!user) return null;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Shield className="h-5 w-5 text-primary" />;
      case 'Teacher': return <Users className="h-5 w-5 text-success" />;
      case 'Student': return <GraduationCap className="h-5 w-5 text-warning" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const variants = {
      'Admin': 'bg-primary/10 text-primary',
      'Teacher': 'bg-success/10 text-success',
      'Student': 'bg-warning/10 text-warning',
    };
    return <Badge variant="outline" className={variants[role as keyof typeof variants] || ''}>
      {role}
    </Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              {getRoleIcon(user.role)}
            </div>
            <div>
              <DialogTitle className="text-xl">{user.name}</DialogTitle>
              <DialogDescription>{user.email}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <div className="mt-1">{getRoleBadge(user.role)}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">School</p>
                  <p className="text-sm font-medium">{user.school}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <Badge variant="outline" className={user.status === 'active' ? 'status-badge status-active' : 'status-badge status-expired'}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Subjects/Courses */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {user.role === 'Teacher' ? 'Teaching Subjects' : user.role === 'Student' ? 'Enrolled Subjects' : 'Access Level'}
            </h3>
            <p className="text-sm text-muted-foreground">{user.subjects}</p>
          </div>

          <Separator />

          {/* Activity Summary */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Activity Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Lesson Plans</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {user.role === 'Teacher' ? '24' : user.role === 'Admin' ? 'All' : 'N/A'}
                </p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Last Active</p>
                <p className="text-sm font-medium text-foreground mt-1">Today</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground">Join Date</p>
                <p className="text-sm font-medium text-foreground mt-1">Jan 2025</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
