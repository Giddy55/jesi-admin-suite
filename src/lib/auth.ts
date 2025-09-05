// Mock authentication service for demo purposes
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'SuperAdmin' | 'SchoolAdmin' | 'Teacher' | 'Student' | 'SupportAgent' | 'FinanceAdmin' | 'DevOps';
  school_id?: string;
  last_login_at?: string;
  mfa_enabled: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock user data
const MOCK_USERS: Record<string, User> = {
  'admin@jesi.ai': {
    id: '1',
    email: 'admin@jesi.ai',
    full_name: 'Super Admin',
    role: 'SuperAdmin',
    mfa_enabled: false,
    last_login_at: new Date().toISOString()
  },
  'school@example.com': {
    id: '2',
    email: 'school@example.com', 
    full_name: 'School Administrator',
    role: 'SchoolAdmin',
    school_id: 'school-1',
    mfa_enabled: true,
    last_login_at: new Date().toISOString()
  }
};

class AuthService {
  private authState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false
  };

  private listeners: ((state: AuthState) => void)[] = [];

  constructor() {
    // Check for stored auth
    const storedUser = localStorage.getItem('jesi_auth_user');
    if (storedUser) {
      try {
        this.authState.user = JSON.parse(storedUser);
        this.authState.isAuthenticated = true;
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('jesi_auth_user');
      }
    }
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.authState));
  }

  async login(email: string, password: string): Promise<{ success: boolean; requiresMFA?: boolean; error?: string }> {
    this.authState.isLoading = true;
    this.notify();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS[email];
    
    if (!user || password !== 'password') {
      this.authState.isLoading = false;
      this.notify();
      return { success: false, error: 'Invalid credentials' };
    }

    if (user.mfa_enabled) {
      this.authState.isLoading = false;
      this.notify();
      return { success: true, requiresMFA: true };
    }

    // Update last login
    user.last_login_at = new Date().toISOString();
    
    this.authState.user = user;
    this.authState.isAuthenticated = true;
    this.authState.isLoading = false;
    
    localStorage.setItem('jesi_auth_user', JSON.stringify(user));
    this.notify();

    return { success: true };
  }

  async verifyMFA(email: string, code: string): Promise<{ success: boolean; error?: string }> {
    this.authState.isLoading = true;
    this.notify();

    // Simulate MFA verification
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS[email];
    
    if (!user || code !== '123456') {
      this.authState.isLoading = false;
      this.notify();
      return { success: false, error: 'Invalid verification code' };
    }

    // Update last login
    user.last_login_at = new Date().toISOString();
    
    this.authState.user = user;
    this.authState.isAuthenticated = true;
    this.authState.isLoading = false;
    
    localStorage.setItem('jesi_auth_user', JSON.stringify(user));
    this.notify();

    return { success: true };
  }

  logout() {
    this.authState.user = null;
    this.authState.isAuthenticated = false;
    localStorage.removeItem('jesi_auth_user');
    this.notify();
  }

  getCurrentUser(): User | null {
    return this.authState.user;
  }

  getAuthState(): AuthState {
    return this.authState;
  }

  hasPermission(permission: string): boolean {
    if (!this.authState.user) return false;
    if (this.authState.user.role === 'SuperAdmin') return true;
    
    // Role-based permissions
    const rolePermissions: Record<string, string[]> = {
      SchoolAdmin: ['school:read', 'school:write', 'users:school', 'content:school'],
      Teacher: ['content:read', 'content:create', 'analytics:class'],
      Student: ['content:read', 'progress:own'],
      SupportAgent: ['tickets:manage', 'users:read'],
      FinanceAdmin: ['billing:manage', 'analytics:finance'],
      DevOps: ['health:read', 'bugs:manage']
    };

    const userPermissions = rolePermissions[this.authState.user.role] || [];
    return userPermissions.includes(permission);
  }
}

export const authService = new AuthService();

// React hook for auth state
import { useState, useEffect } from 'react';

export function useAuth() {
  const [authState, setAuthState] = useState(authService.getAuthState());

  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  return {
    ...authState,
    login: authService.login.bind(authService),
    verifyMFA: authService.verifyMFA.bind(authService),
    logout: authService.logout.bind(authService),
    hasPermission: authService.hasPermission.bind(authService)
  };
}