import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  FileText, 
  Check, 
  X, 
  Clock, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Archive,
  Tag,
  BookOpen,
  Users,
  AlertCircle,
  Plus,
  Settings
} from 'lucide-react';

export default function ContentCurriculum() {
  const [selectedTab, setSelectedTab] = useState('library');

  // Mock data for content items
  const contentItems = [
    {
      id: 1,
      title: 'Basic Mathematics - Fractions',
      type: 'Lesson Notes',
      subject: 'Mathematics',
      gradeLevel: 'Primary 4',
      curriculumVersion: 'GES 2024',
      status: 'approved',
      uploadedBy: 'Dr. Sarah Mensah',
      uploadDate: '2024-01-15',
      approvedBy: 'John Doe',
      downloads: 234
    },
    {
      id: 2,
      title: 'English Grammar Quiz Bank',
      type: 'Question Bank',
      subject: 'English Language',
      gradeLevel: 'JHS 2',
      curriculumVersion: 'GES 2024',
      status: 'pending',
      uploadedBy: 'Prof. Kwame Asante',
      uploadDate: '2024-01-20',
      approvedBy: null,
      downloads: 0
    },
    {
      id: 3,
      title: 'Science Practical Guide',
      type: 'Reference Material',
      subject: 'Integrated Science',
      gradeLevel: 'JHS 1',
      curriculumVersion: 'GES 2023',
      status: 'rejected',
      uploadedBy: 'Ms. Akosua Boateng',
      uploadDate: '2024-01-18',
      approvedBy: 'Jane Smith',
      downloads: 0
    }
  ];

  const pendingApprovals = contentItems.filter(item => item.status === 'pending');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="secondary" className="bg-success/10 text-success">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Pending</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content & Curriculum</h1>
          <p className="text-muted-foreground mt-1">
            Manage teaching materials and curriculum alignment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Content
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Curriculum Settings
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Content
            </CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-success mt-1">+23 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approval
            </CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{pendingApprovals.length}</div>
            <p className="text-xs text-warning mt-1">Requires review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Contributors
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">156</div>
            <p className="text-xs text-success mt-1">+8 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Downloads Today
            </CardTitle>
            <Download className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,891</div>
            <p className="text-xs text-success mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="library">Content Library</TabsTrigger>
          <TabsTrigger value="approvals">Approvals ({pendingApprovals.length})</TabsTrigger>
          <TabsTrigger value="upload">Upload Content</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum Management</TabsTrigger>
        </TabsList>

        {/* Content Library Tab */}
        <TabsContent value="library" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search content..."
                  className="pl-10 w-64"
                />
              </div>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English Language</SelectItem>
                  <SelectItem value="science">Integrated Science</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Grade Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="jhs">JHS</SelectItem>
                  <SelectItem value="shs">SHS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>Browse and manage all teaching materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contentItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{item.type}</Badge>
                          <Badge variant="outline" className="text-xs">{item.subject}</Badge>
                          <Badge variant="outline" className="text-xs">{item.gradeLevel}</Badge>
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Uploaded by {item.uploadedBy} • {item.downloads} downloads
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Approvals Tab */}
        <TabsContent value="approvals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Pending Approvals
              </CardTitle>
              <CardDescription>Review and approve content submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge variant="outline">{item.subject}</Badge>
                          <Badge variant="outline">{item.gradeLevel}</Badge>
                          <Badge variant="outline">{item.curriculumVersion}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Submitted by {item.uploadedBy} on {item.uploadDate}
                        </p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Review Content
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button size="sm">
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upload Content Tab */}
        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Content</CardTitle>
              <CardDescription>Add teaching materials to the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Content Title</Label>
                  <Input id="title" placeholder="Enter content title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Content Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lesson-notes">Lesson Notes</SelectItem>
                      <SelectItem value="question-bank">Question Bank</SelectItem>
                      <SelectItem value="reference">Reference Material</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English Language</SelectItem>
                      <SelectItem value="science">Integrated Science</SelectItem>
                      <SelectItem value="social-studies">Social Studies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary-1">Primary 1</SelectItem>
                      <SelectItem value="primary-2">Primary 2</SelectItem>
                      <SelectItem value="primary-3">Primary 3</SelectItem>
                      <SelectItem value="jhs-1">JHS 1</SelectItem>
                      <SelectItem value="jhs-2">JHS 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="curriculum">Curriculum Version</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ges-2024">GES 2024</SelectItem>
                      <SelectItem value="ges-2023">GES 2023</SelectItem>
                      <SelectItem value="ges-2022">GES 2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Enter tags (comma separated)" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the content and learning objectives"
                  rows={3}
                />
              </div>

              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop files here, or click to select files
                </p>
                <Button>Select Files</Button>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Save as Draft</Button>
                <Button>Submit for Approval</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curriculum Management Tab */}
        <TabsContent value="curriculum" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Curriculum Versions
                </CardTitle>
                <CardDescription>Manage curriculum standards and versions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">GES 2024 Standard</h4>
                    <p className="text-sm text-muted-foreground">Current active version</p>
                  </div>
                  <Badge className="bg-success/10 text-success">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">GES 2023 Standard</h4>
                    <p className="text-sm text-muted-foreground">Previous version</p>
                  </div>
                  <Badge variant="outline">Archived</Badge>
                </div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Version
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Content Alignment
                </CardTitle>
                <CardDescription>Track content alignment with curriculum</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mathematics (GES 2024)</span>
                    <span className="text-sm font-semibold text-success">98% Aligned</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">English Language (GES 2024)</span>
                    <span className="text-sm font-semibold text-warning">85% Aligned</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Science (GES 2024)</span>
                    <span className="text-sm font-semibold text-destructive">72% Aligned</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-destructive h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Curriculum Update History</CardTitle>
              <CardDescription>Track changes and updates to curriculum standards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold">GES 2024 Standard Released</h4>
                    <p className="text-sm text-muted-foreground">New curriculum version implemented across all subjects</p>
                    <p className="text-xs text-muted-foreground mt-1">January 15, 2024 • System Admin</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-info rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Mathematics Standards Updated</h4>
                    <p className="text-sm text-muted-foreground">Updated learning objectives for Primary 4-6 mathematics</p>
                    <p className="text-xs text-muted-foreground mt-1">December 20, 2023 • Dr. Sarah Mensah</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Content Migration Completed</h4>
                    <p className="text-sm text-muted-foreground">Successfully migrated 1,247 content items to new standard</p>
                    <p className="text-xs text-muted-foreground mt-1">November 30, 2023 • System Admin</p>
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