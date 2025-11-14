import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Building2,
  Users,
  MapPin,
  Calendar,
  Crown,
  AlertCircle,
  Mail,
  Shield,
  GraduationCap,
  UserPlus
} from 'lucide-react';
import { GHANA_REGIONS, SCHOOL_TYPES, DISTRICTS, type School } from '@/lib/mockData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AddSchoolDialog from '@/components/schools/AddSchoolDialog';
import SchoolDetailsDialog from '@/components/schools/SchoolDetailsDialog';
import ManageSchoolUsersDialog from '@/components/schools/ManageSchoolUsersDialog';
import SchoolAnalyticsDialog from '@/components/schools/SchoolAnalyticsDialog';
import UserDetailsDialog from '@/components/users/UserDetailsDialog';
import EditUserDialog from '@/components/users/EditUserDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Schools() {
  const { toast } = useToast();
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSchoolType, setSelectedSchoolType] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [usersDialogOpen, setUsersDialogOpen] = useState(false);
  const [analyticsDialogOpen, setAnalyticsDialogOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  
  // User directory state
  const [users, setUsers] = useState([
    { id: '1', name: 'John Mensah', email: 'john.mensah@school.edu', role: 'Teacher', status: 'active', school: 'Accra Academy', subjects: 'Mathematics, Physics' },
    { id: '2', name: 'Grace Asante', email: 'grace.asante@school.edu', role: 'Teacher', status: 'active', school: 'Wesley Girls High School', subjects: 'English, Literature' },
    { id: '3', name: 'Kwame Osei', email: 'kwame.osei@school.edu', role: 'Admin', status: 'active', school: 'Mfantsipim School', subjects: 'N/A' },
    { id: '4', name: 'Ama Boateng', email: 'ama.boateng@school.edu', role: 'Student', status: 'active', school: 'Accra Academy', subjects: 'All Subjects' },
  ]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedUserStatus, setSelectedUserStatus] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDetailsDialogOpen, setUserDetailsDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSchools((data || []) as School[]);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to fetch schools',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };


  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.ges_registration_no.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || school.region === selectedRegion;
    const matchesStatus = selectedStatus === 'all' || school.subscription_status === selectedStatus;
    const matchesSchoolType = selectedSchoolType === 'all' || school.school_type === selectedSchoolType;
    const matchesDistrict = selectedDistrict === 'all' || school.district === selectedDistrict;
    
    return matchesSearch && matchesRegion && matchesStatus && matchesSchoolType && matchesDistrict;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                         user.school.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedUserStatus === 'all' || user.status === selectedUserStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: School['subscription_status']) => {
    const variants = {
      active: 'status-active',
      trial: 'status-trial',
      expired: 'status-expired'
    };
    
    return (
      <Badge variant="outline" className={`status-badge ${variants[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTierIcon = (tier: School['subscription_tier']) => {
    if (tier === 'Premium') return <Crown className="h-3 w-3 text-warning" />;
    return null;
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

  const handleResetPassword = async (userId: string, userEmail: string) => {
    try {
      toast({
        title: 'Password Reset Email Sent',
        description: `A password reset link has been sent to ${userEmail}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to send password reset email',
        variant: 'destructive',
      });
    }
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditUserDialogOpen(true);
  };

  const handleViewProfile = (user: any) => {
    setSelectedUser(user);
    setUserDetailsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schools & Users</h1>
          <p className="text-muted-foreground mt-1">
            Manage educational institutions and their users
          </p>
        </div>
        <Button className="flex items-center gap-2" onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add School
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{schools.length}</p>
                <p className="text-sm text-muted-foreground">Total Schools</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">12,458</p>
                <p className="text-sm text-muted-foreground">Learners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">847</p>
                <p className="text-sm text-muted-foreground">Teachers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="kpi-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">100/274</p>
                <p className="text-sm text-muted-foreground">Reach in Districts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Directory Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Directory</CardTitle>
          <CardDescription>
            View and manage schools and users on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="schools" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="schools">Schools Directory</TabsTrigger>
              <TabsTrigger value="users">User Directory</TabsTrigger>
            </TabsList>

            {/* Schools Directory Tab */}
            <TabsContent value="schools" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search schools by name or registration number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {GHANA_REGIONS.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSchoolType} onValueChange={setSelectedSchoolType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="School Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {SCHOOL_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {DISTRICTS.map(district => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Schools Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Region</th>
                  <th>Subscription</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school) => (
                  <tr key={school.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{school.name}</p>
                          <p className="text-sm text-muted-foreground">{school.ges_registration_no}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{school.region}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getTierIcon(school.subscription_tier)}
                        <span className="text-sm font-medium">{school.subscription_tier}</span>
                      </div>
                    </td>
                    <td>
                      {getStatusBadge(school.subscription_status)}
                    </td>
                    <td>
                      <span className="text-sm text-muted-foreground">
                        {new Date(school.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>School Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSchool(school);
                            setDetailsDialogOpen(true);
                          }}>
                            View School Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSchool(school);
                            setUsersDialogOpen(true);
                          }}>
                            Manage School Users
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedSchool(school);
                            setAnalyticsDialogOpen(true);
                          }}>
                            School Analytics
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

              {filteredSchools.length === 0 && (
                <div className="text-center py-12">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No schools found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>

            {/* User Directory Tab */}
            <TabsContent value="users" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search users by name, email, or school..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedUserStatus} onValueChange={setSelectedUserStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>School</th>
                      <th>Role</th>
                      <th>Subjects</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              {getRoleIcon(user.role)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{user.name}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-1">
                            <Building2 className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{user.school}</span>
                          </div>
                        </td>
                        <td>
                          {getRoleBadge(user.role)}
                        </td>
                        <td>
                          <span className="text-sm text-muted-foreground">{user.subjects}</span>
                        </td>
                        <td>
                          <Badge variant="outline" className={user.status === 'active' ? 'status-badge status-active' : 'status-badge status-expired'}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </td>
                        <td>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewProfile(user)}>
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => {
                                if (confirm(`Send password reset email to ${user.email}?`)) {
                                  handleResetPassword(user.id, user.email);
                                }
                              }}>
                                Reset Password
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AddSchoolDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSuccess={fetchSchools}
      />

      <SchoolDetailsDialog
        school={selectedSchool}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />

      <ManageSchoolUsersDialog
        school={selectedSchool}
        open={usersDialogOpen}
        onOpenChange={setUsersDialogOpen}
      />

      <SchoolAnalyticsDialog
        school={selectedSchool}
        open={analyticsDialogOpen}
        onOpenChange={setAnalyticsDialogOpen}
      />

      <UserDetailsDialog
        user={selectedUser}
        open={userDetailsDialogOpen}
        onOpenChange={setUserDetailsDialogOpen}
      />

      <EditUserDialog
        user={selectedUser}
        open={editUserDialogOpen}
        onOpenChange={setEditUserDialogOpen}
      />
    </div>
  );
}