import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, CheckCircle, Flag, MessageSquare, Send, TestTube, User, Calendar, Star } from 'lucide-react';

export default function AIQuality() {
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  // Mock data for teacher feedback
  const teacherFeedback = [
    {
      id: '1',
      teacher: 'Sarah Johnson',
      school: 'Accra Primary School',
      lessonPlan: 'Mathematics - Fractions',
      rating: 4,
      feedback: 'The lesson plan was comprehensive but could use more practical examples for grade 3 students.',
      date: '2024-01-15',
      status: 'reviewed'
    },
    {
      id: '2',
      teacher: 'Michael Asante',
      school: 'Kumasi Methodist School',
      lessonPlan: 'English - Creative Writing',
      rating: 5,
      feedback: 'Excellent structure and age-appropriate activities. Students engaged well.',
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: '3',
      teacher: 'Grace Osei',
      school: 'Tamale Islamic School',
      lessonPlan: 'Science - Plant Life Cycle',
      rating: 3,
      feedback: 'Good content but needs more local plant examples relevant to Northern Ghana.',
      date: '2024-01-13',
      status: 'reviewed'
    }
  ];

  // Mock data for flagged content
  const flaggedContent = [
    {
      id: '1',
      type: 'Inappropriate Content',
      content: 'Mathematics Lesson Plan - Probability',
      reporter: 'David Mensah',
      reason: 'Contains gambling references inappropriate for primary students',
      priority: 'High',
      date: '2024-01-15',
      status: 'Under Review'
    },
    {
      id: '2',
      type: 'Factual Error',
      content: 'History Lesson - Ghana Independence',
      reporter: 'Akosua Frimpong',
      reason: 'Incorrect date mentioned for independence celebration',
      priority: 'Medium',
      date: '2024-01-14',
      status: 'Resolved'
    },
    {
      id: '3',
      type: 'Cultural Sensitivity',
      content: 'Social Studies - Traditional Festivals',
      reporter: 'Ibrahim Mohammed',
      reason: 'Missing representation of Northern Ghana festivals',
      priority: 'Medium',
      date: '2024-01-13',
      status: 'In Progress'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: 'bg-destructive',
      Medium: 'bg-yellow-500',
      Low: 'bg-green-500'
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      'pending': 'bg-yellow-500',
      'reviewed': 'bg-green-500',
      'Under Review': 'bg-blue-500',
      'Resolved': 'bg-green-500',
      'In Progress': 'bg-blue-500'
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
      />
    ));
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Quality Monitoring</h1>
        <p className="text-muted-foreground mt-2">
          Monitor AI-generated content quality and teacher feedback to improve system reliability
        </p>
      </div>

      <Tabs defaultValue="feedback" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Feedback Review
          </TabsTrigger>
          <TabsTrigger value="flagged" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Flagged Content
          </TabsTrigger>
          <TabsTrigger value="corrections" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Submit Corrections
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Test AI Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Teacher Feedback Overview
              </CardTitle>
              <CardDescription>
                Review and analyze feedback from teachers on AI-generated lesson plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Lesson Plan</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherFeedback.map((feedback) => (
                    <TableRow key={feedback.id}>
                      <TableCell className="font-medium">{feedback.teacher}</TableCell>
                      <TableCell>{feedback.school}</TableCell>
                      <TableCell>{feedback.lessonPlan}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {renderStars(feedback.rating)}
                          <span className="ml-2 text-sm text-muted-foreground">
                            {feedback.rating}/5
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{feedback.date}</TableCell>
                      <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedFeedback(feedback.id)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedFeedback && (
            <Card>
              <CardHeader>
                <CardTitle>Feedback Details</CardTitle>
              </CardHeader>
              <CardContent>
                {teacherFeedback
                  .filter(f => f.id === selectedFeedback)
                  .map(feedback => (
                    <div key={feedback.id} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Teacher:</label>
                          <p className="text-sm text-muted-foreground">{feedback.teacher}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">School:</label>
                          <p className="text-sm text-muted-foreground">{feedback.school}</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Feedback:</label>
                        <p className="text-sm text-muted-foreground mt-1">{feedback.feedback}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Mark as Reviewed</Button>
                        <Button variant="outline" size="sm">Forward to AI Team</Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Flagged Content Reports
              </CardTitle>
              <CardDescription>
                Review reports of errors, inappropriate content, and issues flagged by teachers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {flaggedContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          {item.type}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.content}</TableCell>
                      <TableCell>{item.reporter}</TableCell>
                      <TableCell className="max-w-xs truncate">{item.reason}</TableCell>
                      <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Review</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="corrections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Submit Corrections to AI Team
              </CardTitle>
              <CardDescription>
                Report issues and request improvements for AI-generated content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Issue Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="factual-error">Factual Error</SelectItem>
                      <SelectItem value="inappropriate-content">Inappropriate Content</SelectItem>
                      <SelectItem value="cultural-sensitivity">Cultural Sensitivity</SelectItem>
                      <SelectItem value="curriculum-alignment">Curriculum Alignment</SelectItem>
                      <SelectItem value="age-appropriateness">Age Appropriateness</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content Reference</label>
                <Input placeholder="Enter lesson plan ID, content title, or reference" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Description</label>
                <Textarea 
                  placeholder="Describe the issue in detail, including specific problems and suggested improvements..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Suggested Solution</label>
                <Textarea 
                  placeholder="Provide your recommendation for how this should be corrected..."
                  rows={3}
                />
              </div>

              <Button className="w-full">Submit Correction Request</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Test AI-Generated Lesson Plans
              </CardTitle>
              <CardDescription>
                Test and validate AI lesson plans before releasing them to teachers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Class Level</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary-1">Primary 1</SelectItem>
                      <SelectItem value="primary-2">Primary 2</SelectItem>
                      <SelectItem value="primary-3">Primary 3</SelectItem>
                      <SelectItem value="primary-4">Primary 4</SelectItem>
                      <SelectItem value="primary-5">Primary 5</SelectItem>
                      <SelectItem value="primary-6">Primary 6</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="english">English Language</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="social-studies">Social Studies</SelectItem>
                      <SelectItem value="rme">RME</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Week</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select week" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`week-${i + 1}`}>
                          Week {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Test Parameters</label>
                <Textarea 
                  placeholder="Enter specific topics, learning objectives, or constraints to test..."
                  rows={3}
                />
              </div>

              <Button className="w-full">Generate Test Lesson Plan</Button>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Recent Test Results</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Mathematics - Fractions (Primary 3)</p>
                      <p className="text-sm text-muted-foreground">Generated on 2024-01-15</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Badge className="bg-green-500">Approved</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">English - Creative Writing (Primary 4)</p>
                      <p className="text-sm text-muted-foreground">Generated on 2024-01-14</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <Badge className="bg-yellow-500">Needs Review</Badge>
                    </div>
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