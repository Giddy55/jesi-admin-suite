import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Activity, 
  Server, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download,
  Eye,
  Settings,
  TrendingUp,
  TrendingDown,
  Zap,
  Database,
  Globe,
  Cpu,
  HardDrive,
  MemoryStick,
  GitBranch,
  Play,
  Pause,
  XCircle,
  Calendar,
  BarChart3
} from "lucide-react";

// Mock data
const mockServerStatus = {
  api: { status: "healthy", uptime: "99.98%", responseTime: "145ms", lastCheck: "2 min ago" },
  database: { status: "healthy", uptime: "99.99%", responseTime: "12ms", lastCheck: "1 min ago" },
  cdn: { status: "degraded", uptime: "98.45%", responseTime: "320ms", lastCheck: "1 min ago" },
  auth: { status: "healthy", uptime: "99.97%", responseTime: "89ms", lastCheck: "30 sec ago" },
  storage: { status: "healthy", uptime: "99.95%", responseTime: "201ms", lastCheck: "45 sec ago" }
};

const mockPerformanceMetrics = {
  cpuUsage: 68,
  memoryUsage: 74,
  diskUsage: 45,
  networkTraffic: 1250,
  activeConnections: 2847,
  requestsPerMinute: 15420
};

const mockErrorLogs = [
  {
    id: "ERR001",
    timestamp: "2024-01-15T14:30:00Z",
    level: "error",
    service: "lesson-generator",
    message: "AI API rate limit exceeded",
    count: 45,
    resolved: false
  },
  {
    id: "ERR002", 
    timestamp: "2024-01-15T13:45:00Z",
    level: "warning",
    service: "user-auth",
    message: "High login failure rate detected",
    count: 23,
    resolved: true
  },
  {
    id: "ERR003",
    timestamp: "2024-01-15T12:15:00Z",
    level: "error", 
    service: "database",
    message: "Connection pool exhausted",
    count: 12,
    resolved: true
  }
];

const mockFeatureRollouts = [
  {
    id: "FEAT001",
    name: "Enhanced AI Lesson Planner",
    description: "Improved AI models with better curriculum alignment",
    version: "v2.1.0",
    status: "pending_approval",
    targetDate: "2024-01-20",
    affectedUsers: 2500,
    riskLevel: "medium",
    testResults: "98% pass rate"
  },
  {
    id: "FEAT002",
    name: "Real-time Collaboration",
    description: "Live editing and sharing of lesson plans",
    version: "v1.8.0", 
    status: "approved",
    targetDate: "2024-01-18",
    affectedUsers: 1200,
    riskLevel: "low",
    testResults: "100% pass rate"
  },
  {
    id: "FEAT003",
    name: "Advanced Analytics Dashboard",
    description: "Enhanced reporting and insights for administrators",
    version: "v3.0.0",
    status: "rejected",
    targetDate: "2024-01-25",
    affectedUsers: 5000,
    riskLevel: "high",
    testResults: "87% pass rate"
  }
];

const mockHealthSummary = {
  overallHealth: 96,
  uptime: "99.94%",
  avgResponseTime: "168ms",
  totalIncidents: 3,
  resolvedIncidents: 2,
  criticalErrors: 1,
  warningAlerts: 8,
  performanceScore: 94
};

export default function PlatformHealth() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      healthy: "default",
      degraded: "secondary",
      down: "destructive",
      maintenance: "outline"
    };
    const colors: Record<string, string> = {
      healthy: "text-green-600",
      degraded: "text-yellow-600", 
      down: "text-red-600",
      maintenance: "text-blue-600"
    };
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status === 'healthy' ? 'bg-green-500' : status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'}`} />
        <span className={`text-sm font-medium ${colors[status] || 'text-gray-600'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    );
  };

  const getLevelBadge = (level: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      error: "destructive",
      warning: "secondary",
      info: "outline"
    };
    return <Badge variant={variants[level] || "outline"}>{level}</Badge>;
  };

  const getRiskBadge = (risk: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      low: "default",
      medium: "secondary", 
      high: "destructive"
    };
    return <Badge variant={variants[risk] || "outline"}>{risk} risk</Badge>;
  };

  const getFeatureStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending_approval: "secondary",
      approved: "default",
      rejected: "destructive",
      deployed: "outline"
    };
    return <Badge variant={variants[status] || "outline"}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Health & Technical Control</h1>
          <p className="text-muted-foreground mt-2">Monitor system performance and manage platform reliability</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockHealthSummary.overallHealth}%</div>
            <Progress value={mockHealthSummary.overallHealth} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockHealthSummary.uptime}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{mockHealthSummary.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">-15ms from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{mockHealthSummary.totalIncidents - mockHealthSummary.resolvedIncidents}</div> 
            <p className="text-xs text-muted-foreground">{mockHealthSummary.resolvedIncidents} resolved today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="status" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="status">System Status</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="logs">Error Logs</TabsTrigger>
          <TabsTrigger value="rollouts">Feature Rollouts</TabsTrigger>
        </TabsList>

        <TabsContent value="status" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Service Status</CardTitle>
                <CardDescription>Real-time status of all platform services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(mockServerStatus).map(([service, data]) => (
                    <div key={service} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium capitalize">{service}</div>
                          <div className="text-sm text-muted-foreground">
                            {data.uptime} uptime • {data.responseTime} avg response
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(data.status)}
                        <div className="text-xs text-muted-foreground mt-1">
                          {data.lastCheck}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>Current resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{mockPerformanceMetrics.cpuUsage}%</span>
                  </div>
                  <Progress value={mockPerformanceMetrics.cpuUsage} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MemoryStick className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Memory Usage</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{mockPerformanceMetrics.memoryUsage}%</span>
                  </div>
                  <Progress value={mockPerformanceMetrics.memoryUsage} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Disk Usage</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{mockPerformanceMetrics.diskUsage}%</span>
                  </div>
                  <Progress value={mockPerformanceMetrics.diskUsage} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Live Metrics</CardTitle>
              <CardDescription>Real-time platform statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded">
                  <Globe className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{mockPerformanceMetrics.activeConnections.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Active Connections</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <Zap className="h-8 w-8 mx-auto text-green-600 mb-2" />
                  <div className="text-2xl font-bold text-green-600">{mockPerformanceMetrics.requestsPerMinute.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Requests/Min</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <Database className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{mockPerformanceMetrics.networkTraffic} MB/s</div>
                  <div className="text-sm text-muted-foreground">Network Traffic</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Historical performance data and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Response Time Trends</h4>
                  <div className="space-y-2">
                    {["API Endpoints", "Database Queries", "Static Assets", "Authentication"].map((metric, index) => (
                      <div key={metric} className="flex justify-between items-center p-2 border rounded">
                        <span className="text-sm">{metric}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{[145, 12, 89, 67][index]}ms</span>
                          {index % 2 === 0 ? (
                            <TrendingDown className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingUp className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Error Rates</h4>
                  <div className="space-y-2">
                    {["4xx Client Errors", "5xx Server Errors", "Timeouts", "Connection Failures"].map((error, index) => (
                      <div key={error} className="flex justify-between items-center p-2 border rounded">
                        <span className="text-sm">{error}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{[0.12, 0.03, 0.08, 0.01][index]}%</span>
                          <div className={`w-2 h-2 rounded-full ${[0.12, 0.03, 0.08, 0.01][index] > 0.05 ? 'bg-red-500' : 'bg-green-500'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Error Logs</CardTitle>
              <CardDescription>System errors and warnings requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockErrorLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">
                        {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>{getLevelBadge(log.level)}</TableCell>
                      <TableCell className="font-medium">{log.service}</TableCell>
                      <TableCell className="max-w-xs truncate">{log.message}</TableCell>
                      <TableCell>{log.count}</TableCell>
                      <TableCell>
                        <Badge variant={log.resolved ? "default" : "destructive"}>
                          {log.resolved ? "Resolved" : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rollouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Rollout Management</CardTitle>
              <CardDescription>Review and approve new feature deployments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Target Date</TableHead>
                    <TableHead>Affected Users</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFeatureRollouts.map((feature) => (
                    <TableRow key={feature.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{feature.name}</div>
                          <div className="text-sm text-muted-foreground">{feature.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{feature.version}</TableCell>
                      <TableCell>{new Date(feature.targetDate).toLocaleDateString()}</TableCell>
                      <TableCell>{feature.affectedUsers.toLocaleString()}</TableCell>
                      <TableCell>{getRiskBadge(feature.riskLevel)}</TableCell>
                      <TableCell>{getFeatureStatusBadge(feature.status)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedFeature(feature)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {selectedFeature && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Feature Review: {selectedFeature.name}
                  {getRiskBadge(selectedFeature.riskLevel)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Version</Label>
                    <p className="text-sm">{selectedFeature.version}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Target Deployment</Label>
                    <p className="text-sm">{new Date(selectedFeature.targetDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Affected Users</Label>
                    <p className="text-sm">{selectedFeature.affectedUsers.toLocaleString()} users</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Test Results</Label>
                    <p className="text-sm">{selectedFeature.testResults}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded">{selectedFeature.description}</p>
                </div>
                {selectedFeature.status === 'pending_approval' && (
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Approve Rollout
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Pause className="h-4 w-4 mr-2" />
                      Hold for Review
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
                <Button variant="outline" onClick={() => setSelectedFeature(null)}>
                  Close
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Monthly Health Summary
          </CardTitle>
          <CardDescription>Generate comprehensive platform health reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Report Period</Label>
              <Select defaultValue="current">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Month</SelectItem>
                  <SelectItem value="previous">Previous Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select defaultValue="comprehensive">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="performance">Performance Only</SelectItem>
                  <SelectItem value="incidents">Incidents Only</SelectItem>
                  <SelectItem value="executive">Executive Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}