import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, Mail, Phone, Calendar, Crown, CreditCard, Users } from 'lucide-react';
import { type School } from '@/lib/mockData';

interface SchoolDetailsDialogProps {
  school: School | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SchoolDetailsDialog({ school, open, onOpenChange }: SchoolDetailsDialogProps) {
  if (!school) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            School Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* School Name & Registration */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{school.name}</h3>
            <p className="text-sm text-muted-foreground">
              Registration No: {school.ges_registration_no}
            </p>
          </div>

          <Separator />

          {/* Location Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Region</p>
                <p className="font-medium text-foreground">{school.region}</p>
              </div>
              <div>
                <p className="text-muted-foreground">District</p>
                <p className="font-medium text-foreground">{school.district}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-muted-foreground">Address</p>
                <p className="font-medium text-foreground">{school.address}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Contact Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{school.contact_email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{school.contact_phone}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* School Type */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">School Type</h4>
            <Badge variant="secondary" className="text-sm">
              {school.school_type}
            </Badge>
          </div>

          <Separator />

          {/* Activity Metrics Overview */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Activity Metrics Overview
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Teachers</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <div className="bg-success/5 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Learners</p>
                <p className="text-2xl font-bold text-foreground">486</p>
              </div>
              <div className="bg-warning/5 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Lessons Created</p>
                <p className="text-2xl font-bold text-foreground">142</p>
              </div>
              <div className="bg-accent/5 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Avg Usage/Week</p>
                <p className="text-2xl font-bold text-foreground">18h</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Subscription Information */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Subscription
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tier</p>
                <div className="flex items-center gap-2">
                  {school.subscription_tier === 'Premium' && (
                    <Crown className="h-4 w-4 text-warning" />
                  )}
                  <span className="font-medium text-foreground">{school.subscription_tier}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                {getStatusBadge(school.subscription_status)}
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground mb-1">Renewal Date</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">
                    {new Date(school.subscription_renewal_date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Created</p>
              <p className="font-medium text-foreground">
                {new Date(school.created_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p className="font-medium text-foreground">
                {new Date(school.updated_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}