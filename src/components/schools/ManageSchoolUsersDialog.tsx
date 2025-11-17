import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Mail, Shield, GraduationCap, Upload, Download, ChevronDown } from 'lucide-react';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { School } from '@/lib/mockData';
import EditUserDialog from '@/components/users/EditUserDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface ManageSchoolUsersDialogProps {
  school: School | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ManageSchoolUsersDialog({ school, open, onOpenChange }: ManageSchoolUsersDialogProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userToRemove, setUserToRemove] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    subjects: ''
  });

  // Mock user data - in production, this would come from the database
  const [mockUsers, setMockUsers] = useState([
    { id: 1, name: 'John Mensah', email: 'john.mensah@school.edu', role: 'Teacher', status: 'active', subjects: 'Mathematics, Physics' },
    { id: 2, name: 'Grace Asante', email: 'grace.asante@school.edu', role: 'Teacher', status: 'active', subjects: 'English, Literature' },
    { id: 3, name: 'Kwame Osei', email: 'kwame.osei@school.edu', role: 'Admin', status: 'active', subjects: 'N/A' },
    { id: 4, name: 'Ama Boateng', email: 'ama.boateng@school.edu', role: 'Student', status: 'active', subjects: 'All Subjects' },
  ]);

  if (!school) return null;

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

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditUserOpen(true);
  };

  const handleRemoveUser = (user: any) => {
    setUserToRemove(user);
  };

  const confirmRemoveUser = () => {
    if (userToRemove) {
      setMockUsers(mockUsers.filter(u => u.id !== userToRemove.id));
      toast({
        title: "User Removed",
        description: `${userToRemove.name} has been removed from ${school.name}.`,
      });
      setUserToRemove(null);
    }
  };

  const handleEditSuccess = () => {
    toast({
      title: "User Updated",
      description: "User information has been updated successfully.",
    });
  };

  const downloadSampleCSV = () => {
    const csvContent = `Name,Email,Role,Subjects\nJohn Doe,john.doe@school.edu,Teacher,"Mathematics, Physics"\nJane Smith,jane.smith@school.edu,Teacher,"English, Literature"\nMichael Brown,michael.brown@school.edu,Admin,N/A`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'teachers_upload_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Sample Downloaded",
      description: "Sample CSV template has been downloaded.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const newUsers: any[] = [];
      
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Parse CSV line (handle quoted values)
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        if (matches && matches.length >= 3) {
          const name = matches[0].replace(/"/g, '').trim();
          const email = matches[1].replace(/"/g, '').trim();
          const role = matches[2].replace(/"/g, '').trim();
          const subjects = matches[3] ? matches[3].replace(/"/g, '').trim() : '';
          
          if (name && email && role) {
            newUsers.push({
              id: mockUsers.length + newUsers.length + 1,
              name,
              email,
              role,
              status: 'active',
              subjects: role === 'Teacher' ? subjects : role === 'Student' ? 'All Subjects' : 'N/A'
            });
          }
        }
      }
      
      if (newUsers.length > 0) {
        setMockUsers([...mockUsers, ...newUsers]);
        toast({
          title: "Users Imported",
          description: `Successfully imported ${newUsers.length} user(s) from CSV file.`,
        });
      } else {
        toast({
          title: "Import Failed",
          description: "No valid users found in the CSV file.",
          variant: "destructive"
        });
      }
    };
    
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Manage School Admin - {school.name}
          </DialogTitle>
          <DialogDescription>
            Add users, assign school admin, and manage access for this school
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

          {/* Add User Buttons */}
          <div className="flex justify-end gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 hover-scale">
                  <Upload className="h-4 w-4" />
                  Bulk Upload
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                <DropdownMenuItem onClick={() => fileInputRef.current?.click()} className="gap-2 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">Upload CSV/Excel</span>
                    <span className="text-xs text-muted-foreground">Import teachers from file</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={downloadSampleCSV} className="gap-2 cursor-pointer">
                  <Download className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">Download Sample</span>
                    <span className="text-xs text-muted-foreground">Get CSV template</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="flex items-center gap-2 hover-scale" onClick={() => setAddUserOpen(true)}>
              <UserPlus className="h-4 w-4" />
              Add New User
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          Edit User
                        </DropdownMenuItem>
                        {user.role !== 'Admin' && (
                          <DropdownMenuItem onClick={() => {
                            if (confirm(`Assign ${user.name} as School Admin?`)) {
                              toast({
                                title: "Admin Assigned",
                                description: `${user.name} is now a School Admin.`,
                              });
                            }
                          }}>
                            Make School Admin
                          </DropdownMenuItem>
                        )}
                        {user.role === 'Admin' && (
                          <DropdownMenuItem onClick={() => {
                            if (confirm(`Remove admin privileges from ${user.name}?`)) {
                              toast({
                                title: "Admin Removed",
                                description: `${user.name} is no longer a School Admin.`,
                              });
                            }
                          }}>
                            Remove Admin Role
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => {
                          if (confirm(`Send password reset email to ${user.email}?`)) {
                            toast({
                              title: "Password Reset",
                              description: `Password reset link sent to ${user.email}`,
                            });
                          }
                        }}>
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleRemoveUser(user)}
                          className="text-destructive focus:text-destructive"
                        >
                          Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      {/* Edit User Dialog */}
      <EditUserDialog
        user={selectedUser}
        open={editUserOpen}
        onOpenChange={setEditUserOpen}
        onSuccess={handleEditSuccess}
      />

      {/* Remove User Confirmation Dialog */}
      <AlertDialog open={!!userToRemove} onOpenChange={() => setUserToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {userToRemove?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveUser} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
