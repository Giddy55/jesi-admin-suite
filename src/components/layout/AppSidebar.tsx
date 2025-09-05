import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Building2,
  FileText,
  Shield,
  Scale,
  DollarSign,
  MessageSquare,
  Activity,
  Settings,
  LogOut,
  Users,
  Bot
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Schools & Users", url: "/schools", icon: Building2 },
  { title: "Content & Curriculum", url: "/content", icon: FileText },
  { title: "AI Quality", url: "/ai-quality", icon: Bot },
  { title: "Compliance", url: "/compliance", icon: Scale },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Billing", url: "/billing", icon: DollarSign },
  { title: "Support & Comms", url: "/support", icon: MessageSquare },
  { title: "Platform Health", url: "/health", icon: Activity },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();
  const currentPath = location.pathname;
  
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
      isActive 
        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    }`;

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar
      className={`${isCollapsed ? "w-14" : "w-64"} border-r border-sidebar-border bg-sidebar transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">J</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-sidebar-foreground">Jesi AI</h2>
              <p className="text-xs text-sidebar-foreground/70">Super Admin</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs font-semibold mb-2">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {!isCollapsed && user && (
          <div className="mb-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.full_name}
                </p>
                <p className="text-xs text-sidebar-foreground/70">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`${
            isCollapsed ? "w-8 h-8 p-0" : "w-full justify-start"
          } text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}