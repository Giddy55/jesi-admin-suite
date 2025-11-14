// Mock data for demonstration purposes

export interface School {
  id: string;
  name: string;
  ges_registration_no: string;
  region: string;
  district: string;
  school_type: 'Public' | 'Private' | 'Mission' | 'International';
  address: string;
  contact_email: string;
  contact_phone: string;
  subscription_tier: 'Free' | 'Trial' | 'Standard' | 'Premium';
  subscription_status: 'active' | 'expired' | 'trial';
  subscription_renewal_date: string;
  created_at: string;
  updated_at: string;
}

export interface AIFlag {
  id: string;
  related_content_id?: string;
  module: 'LessonGen' | 'QuizGen' | 'Explanation';
  severity: 'low' | 'med' | 'high';
  description: string;
  flagged_by_user_id: string;
  admin_status: 'open' | 'in_review' | 'resolved' | 'escalated';
  resolution_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'LessonNote' | 'QuestionBank' | 'ReferenceMaterial';
  subject: string;
  grade_level: string;
  curriculum_version: string;
  ges_topic_code: string;
  tags: string[];
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected';
  submitted_by_user_id: string;
  approved_by_user_id?: string;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  school_id: string;
  requester_user_id: string;
  assigned_to_user_id?: string;
  category: 'technical' | 'billing' | 'content' | 'other';
  priority: 'low' | 'med' | 'high';
  subject: string;
  description: string;
  status: 'open' | 'pending' | 'solved' | 'closed';
  satisfaction?: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardKPIs {
  // Platform Adoption & Growth
  totalSchools: number;
  activeSchools: number;
  activeTeachers: number;
  activeTeachersPercentage: number;
  activeStudents: number;
  activeStudentsPercentage: number;
  newSignups: number;
  
  // Business & Financial Health
  totalRevenue: number;
  activeSubscriptions: number;
  arpu: number;
  churnRate: number;
  
  // Impact & Social Value
  teacherHoursSaved: number;
  atRiskLearnersSupported: number;
  districtsReached: number;
  totalDistricts: number;
  
  // System metrics
  uptime: number;
  openTickets: number;
}

// Mock Schools Data
export const mockSchools: School[] = [
  {
    id: 'school-1',
    name: 'Accra International School',
    ges_registration_no: 'GES-AIS-2020-001',
    region: 'Greater Accra',
    district: 'Accra Metropolitan',
    school_type: 'International',
    address: '123 Liberation Road, Accra',
    contact_email: 'admin@ais.edu.gh',
    contact_phone: '+233 30 123 4567',
    subscription_tier: 'Premium',
    subscription_status: 'active',
    subscription_renewal_date: '2024-12-15',
    created_at: '2023-01-15T08:00:00Z',
    updated_at: '2024-01-10T10:30:00Z'
  },
  {
    id: 'school-2',
    name: 'Volta Regional Technical Institute',
    ges_registration_no: 'GES-VRTI-2019-045',
    region: 'Volta',
    district: 'Ho Municipal',
    school_type: 'Public',
    address: 'P.O. Box 123, Ho',
    contact_email: 'info@vrti.edu.gh',
    contact_phone: '+233 36 456 7890',
    subscription_tier: 'Standard',
    subscription_status: 'active',
    subscription_renewal_date: '2024-11-20',
    created_at: '2023-03-20T09:15:00Z',
    updated_at: '2024-01-05T14:20:00Z'
  },
  {
    id: 'school-3',
    name: 'Northern Preparatory School',
    ges_registration_no: 'GES-NPS-2021-089',
    region: 'Northern',
    district: 'Tamale Metropolitan',
    school_type: 'Private',
    address: 'Education Ridge, Tamale',
    contact_email: 'contact@nps.edu.gh',
    contact_phone: '+233 37 234 5678',
    subscription_tier: 'Trial',
    subscription_status: 'trial',
    subscription_renewal_date: '2024-02-15',
    created_at: '2023-08-10T11:45:00Z',
    updated_at: '2024-01-01T16:00:00Z'
  },
  {
    id: 'school-4',
    name: 'Central Region Girls Senior High',
    ges_registration_no: 'GES-CRGSH-2018-156',
    region: 'Central',
    district: 'Cape Coast Metropolitan',
    school_type: 'Public',
    address: 'University Road, Cape Coast',
    contact_email: 'admin@crgsh.edu.gh',
    contact_phone: '+233 33 345 6789',
    subscription_tier: 'Standard',
    subscription_status: 'expired',
    subscription_renewal_date: '2023-12-01',
    created_at: '2022-11-05T07:30:00Z',
    updated_at: '2023-12-01T09:45:00Z'
  },
  {
    id: 'school-5',
    name: 'Western Hills Academy',
    ges_registration_no: 'GES-WHA-2022-203',
    region: 'Western',
    district: 'Sekondi-Takoradi Metropolitan',
    school_type: 'Private',
    address: 'Hillside Estate, Takoradi',
    contact_email: 'info@wha.edu.gh',
    contact_phone: '+233 31 567 8901',
    subscription_tier: 'Free',
    subscription_status: 'active',
    subscription_renewal_date: '2024-06-30',
    created_at: '2023-09-12T13:20:00Z',
    updated_at: '2024-01-08T11:10:00Z'
  }
];

// Mock AI Flags Data
export const mockAIFlags: AIFlag[] = [
  {
    id: 'flag-1',
    related_content_id: 'content-1',
    module: 'LessonGen',
    severity: 'high',
    description: 'Generated lesson plan contains factual errors in mathematics concepts',
    flagged_by_user_id: 'teacher-1',
    admin_status: 'open',
    created_at: '2024-01-10T09:30:00Z',
    updated_at: '2024-01-10T09:30:00Z'
  },
  {
    id: 'flag-2',
    related_content_id: 'content-2',
    module: 'QuizGen',
    severity: 'med',
    description: 'Quiz questions do not align with GES curriculum standards',
    flagged_by_user_id: 'teacher-2',
    admin_status: 'in_review',
    created_at: '2024-01-09T14:15:00Z',
    updated_at: '2024-01-10T08:45:00Z'
  },
  {
    id: 'flag-3',
    module: 'Explanation',
    severity: 'low',
    description: 'AI explanation could be more culturally relevant for Ghanaian context',
    flagged_by_user_id: 'teacher-3',
    admin_status: 'resolved',
    resolution_notes: 'Updated AI model to include more local examples',
    created_at: '2024-01-08T11:20:00Z',
    updated_at: '2024-01-09T16:30:00Z'
  }
];

// Mock Content Items Data
export const mockContentItems: ContentItem[] = [
  {
    id: 'content-1',
    title: 'Introduction to Algebra - Form 2',
    type: 'LessonNote',
    subject: 'Mathematics',
    grade_level: 'Form 2',
    curriculum_version: 'GES-2024',
    ges_topic_code: 'MATH-F2-ALG-001',
    tags: ['algebra', 'equations', 'variables'],
    status: 'pending_approval',
    submitted_by_user_id: 'teacher-1',
    created_at: '2024-01-09T10:30:00Z',
    updated_at: '2024-01-09T10:30:00Z'
  },
  {
    id: 'content-2',
    title: 'Photosynthesis Process Quiz',
    type: 'QuestionBank',
    subject: 'Science',
    grade_level: 'Form 1',
    curriculum_version: 'GES-2024',
    ges_topic_code: 'SCI-F1-BIO-005',
    tags: ['biology', 'plants', 'photosynthesis'],
    status: 'approved',
    submitted_by_user_id: 'teacher-2',
    approved_by_user_id: 'admin-1',
    created_at: '2024-01-08T14:20:00Z',
    updated_at: '2024-01-09T09:15:00Z'
  }
];

// Mock Support Tickets Data
export const mockSupportTickets: SupportTicket[] = [
  {
    id: 'ticket-1',
    school_id: 'school-1',
    requester_user_id: 'teacher-1',
    assigned_to_user_id: 'support-1',
    category: 'technical',
    priority: 'high',
    subject: 'Unable to generate lesson plans',
    description: 'AI lesson generation feature is not working for Mathematics subject',
    status: 'open',
    created_at: '2024-01-10T08:45:00Z',
    updated_at: '2024-01-10T08:45:00Z'
  },
  {
    id: 'ticket-2',
    school_id: 'school-2',
    requester_user_id: 'admin-2',
    category: 'billing',
    priority: 'med',
    subject: 'Subscription renewal inquiry',
    description: 'Need clarification on pricing for Premium plan upgrade',
    status: 'pending',
    created_at: '2024-01-09T15:30:00Z',
    updated_at: '2024-01-10T09:20:00Z'
  },
  {
    id: 'ticket-3',
    school_id: 'school-3',
    requester_user_id: 'teacher-3',
    assigned_to_user_id: 'support-2',
    category: 'content',
    priority: 'low',
    subject: 'Request for additional science content',
    description: 'Would like more reference materials for Physics topics',
    status: 'solved',
    satisfaction: 5,
    created_at: '2024-01-07T12:10:00Z',
    updated_at: '2024-01-08T16:45:00Z'
  }
];

// Mock Dashboard KPIs
export const mockDashboardKPIs: DashboardKPIs = {
  // Platform Adoption & Growth
  totalSchools: 1000,
  activeSchools: 50,
  activeTeachers: 1247,
  activeTeachersPercentage: 20,
  activeStudents: 15834,
  activeStudentsPercentage: 20,
  newSignups: 100,
  
  // Business & Financial Health
  totalRevenue: 1000,
  activeSubscriptions: 1000,
  arpu: 1.0,
  churnRate: 5.2,
  
  // Impact & Social Value
  teacherHoursSaved: 12450,
  atRiskLearnersSupported: 3250,
  districtsReached: 110,
  totalDistricts: 274,
  
  // System metrics
  uptime: 99.8,
  openTickets: 12
};

// Helper functions for filtering and searching
export const getSchoolsByRegion = (region?: string) => {
  if (!region) return mockSchools;
  return mockSchools.filter(school => school.region === region);
};

export const getTicketsByStatus = (status?: string) => {
  if (!status) return mockSupportTickets;
  return mockSupportTickets.filter(ticket => ticket.status === status);
};

export const getContentByStatus = (status?: string) => {
  if (!status) return mockContentItems;
  return mockContentItems.filter(content => content.status === status);
};

export const getFlagsBySeverity = (severity?: string) => {
  if (!severity) return mockAIFlags;
  return mockAIFlags.filter(flag => flag.severity === severity);
};

// Constants
export const GHANA_REGIONS = [
  'Greater Accra', 'Ashanti', 'Western', 'Central', 'Volta', 'Eastern',
  'Northern', 'Upper East', 'Upper West', 'Brong-Ahafo', 'Western North',
  'Ahafo', 'Bono', 'Bono East', 'Oti', 'Savannah', 'North East'
];

export const SUBJECTS = [
  'Mathematics', 'English Language', 'Science', 'Social Studies', 'French',
  'Ghanaian Language', 'Information Technology', 'Creative Arts', 'Career Technology',
  'Physical Education', 'Religious and Moral Education'
];

export const GRADE_LEVELS = [
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JHS 1', 'JHS 2', 'JHS 3', 'Form 1', 'Form 2', 'Form 3'
];

export const SCHOOL_TYPES = ['Public', 'Private', 'Mission', 'International'];

export const DISTRICTS = [
  'Accra Metropolitan', 'Kumasi Metropolitan', 'Tamale Metropolitan',
  'Sekondi-Takoradi Metropolitan', 'Cape Coast Metropolitan', 'Ho Municipal',
  'Sunyani Municipal', 'Wa Municipal', 'Bolgatanga Municipal'
];