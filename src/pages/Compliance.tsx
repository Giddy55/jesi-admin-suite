import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  FileText, 
  Download, 
  Trash2, 
  Clock, 
  Lock, 
  AlertCircle, 
  CheckCircle, 
  Eye, 
  Calendar,
  Filter,
  Search
} from 'lucide-react';

export default function Compliance() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  // Mock data for access logs
  const accessLogs = [
    {
      id: '1',
      timestamp: '2024-01-15 14:30:22',
      user: 'admin@jesiai.com',
      userType: 'Admin',
      action: 'View Student Data',
      resource: 'students/profile/12345',
      ipAddress: '192.168.1.100',
      location: 'Accra, Ghana',
      status: 'Success'
    },
    {
      id: '2',
      timestamp: '2024-01-15 13:45:11',
      user: 'teacher@school.edu.gh',
      userType: 'Teacher',
      action: 'Export Lesson Plans',
      resource: 'lesson_plans/bulk_export',
      ipAddress: '10.0.0.50',
      location: 'Kumasi, Ghana',
      status: 'Success'
    },
    {
      id: '3',
      timestamp: '2024-01-15 12:20:33',
      user: 'headteacher@primary.edu.gh',
      userType: 'Head Teacher',
      action: 'Access Analytics',
      resource: 'analytics/school_performance',
      ipAddress: '172.16.0.25',
      location: 'Tamale, Ghana',
      status: 'Blocked'
    }
  ];

  // Mock data for data requests
  const dataRequests = [
    {
      id: '1',
      requestId: 'REQ-2024-001',
      requester: 'John Doe',
      email: 'john.doe@email.com',
      type: 'Data Deletion',
      reason: 'Account closure request',
      submittedDate: '2024-01-10',
      status: 'Pending Review',
      priority: 'Medium',
      dueDate: '2024-01-25'
    },
    {
      id: '2',
      requestId: 'REQ-2024-002',
      requester: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      type: 'Data Export',
      reason: 'GDPR data portability request',
      submittedDate: '2024-01-12',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2024-01-20'
    },
    {
      id: '3',
      requestId: 'REQ-2024-003',
      requester: 'Michael Asante',
      email: 'michael.asante@email.com',
      type: 'Data Correction',
      reason: 'Incorrect personal information',
      submittedDate: '2024-01-08',
      status: 'Completed',
      priority: 'Low',
      dueDate: '2024-01-15'
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      'Success': 'bg-green-500',
      'Blocked': 'bg-red-500',
      'Pending Review': 'bg-yellow-500',
      'In Progress': 'bg-blue-500',
      'Completed': 'bg-green-500'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'High': 'bg-red-500',
      'Medium': 'bg-yellow-500',
      'Low': 'bg-green-500'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Security & Compliance</h1>
        <p className="text-muted-foreground mt-2">
          Manage data privacy, security settings, and compliance with GDPR and Ghana Data Protection laws
        </p>
      </div>

      <Tabs defaultValue="access-logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="access-logs" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Access Logs
          </TabsTrigger>
          <TabsTrigger value="data-requests" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Data Requests
          </TabsTrigger>
          <TabsTrigger value="security-settings" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Settings
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Compliance Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="access-logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Data Access Audit Trail
              </CardTitle>
              <CardDescription>
                Monitor all data access activities for security and compliance purposes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search logs..." className="w-64" />
                </div>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.userType}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell className="font-mono text-sm">{log.resource}</TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Data Subject Requests
              </CardTitle>
              <CardDescription>
                Manage GDPR and data protection requests for deletion, export, and correction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  New Request
                </Button>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Requests</SelectItem>
                    <SelectItem value="deletion">Data Deletion</SelectItem>
                    <SelectItem value="export">Data Export</SelectItem>
                    <SelectItem value="correction">Data Correction</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-mono">{request.requestId}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.requester}</div>
                          <div className="text-sm text-muted-foreground">{request.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {request.type === 'Data Deletion' && <Trash2 className="h-4 w-4 text-red-500" />}
                          {request.type === 'Data Export' && <Download className="h-4 w-4 text-blue-500" />}
                          {request.type === 'Data Correction' && <FileText className="h-4 w-4 text-yellow-500" />}
                          {request.type}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                      <TableCell>{request.submittedDate}</TableCell>
                      <TableCell>{request.dueDate}</TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Review</Button>
                          {request.status === 'Pending Review' && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <AlertCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security-settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Data Retention Policies
                </CardTitle>
                <CardDescription>
                  Configure automatic data deletion timelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">User Account Data</label>
                      <p className="text-xs text-muted-foreground">Personal information and profiles</p>
                    </div>
                    <Select defaultValue="7-years">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="3-years">3 Years</SelectItem>
                        <SelectItem value="7-years">7 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Learning Analytics</label>
                      <p className="text-xs text-muted-foreground">Student progress and performance data</p>
                    </div>
                    <Select defaultValue="5-years">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="3-years">3 Years</SelectItem>
                        <SelectItem value="5-years">5 Years</SelectItem>
                        <SelectItem value="7-years">7 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">System Logs</label>
                      <p className="text-xs text-muted-foreground">Access logs and audit trails</p>
                    </div>
                    <Select defaultValue="2-years">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-years">2 Years</SelectItem>
                        <SelectItem value="3-years">3 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="w-full">Update Retention Policies</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Encryption & Security
                </CardTitle>
                <CardDescription>
                  Review encryption status and security measures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Database Encryption</span>
                    </div>
                    <Badge className="bg-green-500">AES-256 Active</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Data in Transit</span>
                    </div>
                    <Badge className="bg-green-500">TLS 1.3</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Backup Encryption</span>
                    </div>
                    <Badge className="bg-green-500">Enabled</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Two-Factor Authentication</label>
                      <p className="text-xs text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Session Timeout</label>
                      <p className="text-xs text-muted-foreground">Auto-logout inactive users</p>
                    </div>
                    <Select defaultValue="30-min">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15-min">15min</SelectItem>
                        <SelectItem value="30-min">30min</SelectItem>
                        <SelectItem value="1-hour">1hr</SelectItem>
                        <SelectItem value="2-hours">2hrs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Compliance Reports
              </CardTitle>
              <CardDescription>
                Generate reports for legal audits and compliance reviews
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-dashed">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      GDPR Compliance Report
                    </CardTitle>
                    <CardDescription>
                      Comprehensive report on GDPR compliance status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Data Processed:</span>
                        <span className="font-medium">12,847 records</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Consent Rate:</span>
                        <span className="font-medium">98.3%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Requests Handled:</span>
                        <span className="font-medium">23/25</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Ghana DPA Report
                    </CardTitle>
                    <CardDescription>
                      Report for Ghana Data Protection Act compliance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Local Data Storage:</span>
                        <span className="font-medium text-green-600">Compliant</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Cross-border Transfers:</span>
                        <span className="font-medium">5 cases</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Security Measures:</span>
                        <span className="font-medium text-green-600">Active</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Access Audit Report
                    </CardTitle>
                    <CardDescription>
                      Detailed audit of all data access activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div>
                        <label className="text-sm font-medium">Report Period</label>
                        <Select defaultValue="30d">
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="90d">Last 90 days</SelectItem>
                            <SelectItem value="1y">Last year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-dashed">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Monthly Summary
                    </CardTitle>
                    <CardDescription>
                      Monthly compliance and security summary
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div>
                        <label className="text-sm font-medium">Select Month</label>
                        <Select defaultValue="2024-01">
                          <SelectTrigger className="w-full mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024-01">January 2024</SelectItem>
                            <SelectItem value="2023-12">December 2023</SelectItem>
                            <SelectItem value="2023-11">November 2023</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="pt-6 border-t">
                <h4 className="font-medium mb-4">Recent Reports</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">GDPR Compliance Report - December 2023</p>
                      <p className="text-sm text-muted-foreground">Generated on 2024-01-05</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Access Audit Report - Q4 2023</p>
                      <p className="text-sm text-muted-foreground">Generated on 2024-01-02</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}