import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Mail, Shield, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { School } from '@/lib/mockData';

interface ManageSchoolUsersDialogProps {
  school: School | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ManageSchoolUsersDialog({ school, open, onOpenChange }: ManageSchoolUsersDialogProps) {
  const { toast } = useToast();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    subjects: ''
  });

  if (!school) return null;

  // Mock user data - in production, this would come from the database
  const [mockUsers, setMockUsers] = useState([
    { id: 1, name: 'John Mensah', email: 'john.mensah@school.edu', role: 'Teacher', status: 'active', subjects: 'Mathematics, Physics' },
    { id: 2, name: 'Grace Asante', email: 'grace.asante@school.edu', role: 'Teacher', status: 'active', subjects: 'English, Literature' },
    { id: 3, name: 'Kwame Osei', email: 'kwame.osei@school.edu', role: 'Admin', status: 'active', subjects: 'N/A' },
    { id: 4, name: 'Ama Boateng', email: 'ama.boateng@school.edu', role: 'Student', status: 'active', subjects: 'All Subjects' },
  ]);

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: mockUsers.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      subjects: newUser.role === 'Teacher' ? newUser.subjects : newUser.role === 'Student' ? 'All Subjects' : 'N/A'
    };

    setMockUsers([...mockUsers, user]);
    setNewUser({ name: '', email: '', role: '', subjects: '' });
    setAddUserOpen(false);
    
    toast({
      title: "User Added",
      description: `${newUser.name} has been successfully added to ${school.name}.`,
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Shield className="h-4 w-4 text-primary" />;
      case 'Teacher': return <Users className="h-4 w-4 text-success" />;
      case 'Student': return <GraduationCap className="h-4 w-4 text-warning" />;
      default: return <Users className="h-4 w-4" />;
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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Manage Users - {school.name}
          </DialogTitle>
          <DialogDescription>
            Manage teachers, students, and administrative staff for this school
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Total Users</span>
              </div>
              <p className="text-2xl font-bold">{mockUsers.length}</p>
            </div>
            <div className="p-4 bg-success/5 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Teachers</span>
              </div>
              <p className="text-2xl font-bold">{mockUsers.filter(u => u.role === 'Teacher').length}</p>
            </div>
            <div className="p-4 bg-warning/5 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Students</span>
              </div>
              <p className="text-2xl font-bold">{mockUsers.filter(u => u.role === 'Student').length}</p>
            </div>
          </div>

          {/* Add User Button */}
          <div className="flex justify-end">
            <Button className="flex items-center gap-2" onClick={() => setAddUserOpen(true)}>
              <UserPlus className="h-4 w-4" />
              Add New User
            </Button>
          </div>

          {/* Users List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">School Users</h3>
            {mockUsers.map((user) => (
              <div key={user.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-muted rounded-lg mt-1">
                      {getRoleIcon(user.role)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{user.name}</p>
                        {getRoleBadge(user.role)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      {user.subjects && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Subjects:</span> {user.subjects}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Add a new teacher, student, or admin to {school.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newUser.role === 'Teacher' && (
              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects *</Label>
                <Input
                  id="subjects"
                  value={newUser.subjects}
                  onChange={(e) => setNewUser({ ...newUser, subjects: e.target.value })}
                  placeholder="e.g., Mathematics, Physics"
                />
              </div>
            )}

            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setAddUserOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>
                Add User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
