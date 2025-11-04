import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Crown, Calendar, CreditCard } from 'lucide-react';
import type { School } from '@/lib/mockData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SchoolSubscriptionDialogProps {
  school: School | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function SchoolSubscriptionDialog({ school, open, onOpenChange, onSuccess }: SchoolSubscriptionDialogProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    subscription_tier: School['subscription_tier'];
    subscription_status: School['subscription_status'];
    subscription_renewal_date: string;
  }>({
    subscription_tier: school?.subscription_tier || 'Free',
    subscription_status: school?.subscription_status || 'trial',
    subscription_renewal_date: school?.subscription_renewal_date || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!school) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('schools')
        .update({
          subscription_tier: formData.subscription_tier,
          subscription_status: formData.subscription_status,
          subscription_renewal_date: formData.subscription_renewal_date || null,
        })
        .eq('id', school.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Subscription updated successfully',
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!school) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Manage Subscription - {school.name}
          </DialogTitle>
          <DialogDescription>
            Update subscription tier, status, and renewal date for this school
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Plan Info */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <Crown className="h-5 w-5 text-primary mt-1" />
              <div className="flex-1">
                <p className="font-semibold text-lg">Current Plan: {school.subscription_tier}</p>
                <p className="text-sm text-muted-foreground">Status: {school.subscription_status}</p>
                {school.subscription_renewal_date && (
                  <p className="text-sm text-muted-foreground">
                    Renewal: {new Date(school.subscription_renewal_date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Subscription Tier */}
          <div className="space-y-2">
            <Label htmlFor="tier" className="flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Subscription Tier
            </Label>
            <Select
              value={formData.subscription_tier}
              onValueChange={(value) => setFormData({ ...formData, subscription_tier: value as School['subscription_tier'] })}
            >
              <SelectTrigger id="tier">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select the subscription tier for this school
            </p>
          </div>

          {/* Subscription Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Subscription Status</Label>
            <Select
              value={formData.subscription_status}
              onValueChange={(value) => setFormData({ ...formData, subscription_status: value as School['subscription_status'] })}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Current subscription status
            </p>
          </div>

          {/* Renewal Date */}
          <div className="space-y-2">
            <Label htmlFor="renewal" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Renewal Date
            </Label>
            <Input
              id="renewal"
              type="date"
              value={formData.subscription_renewal_date}
              onChange={(e) => setFormData({ ...formData, subscription_renewal_date: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Next billing/renewal date for this subscription
            </p>
          </div>

          {/* Pricing Tiers Info */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <p className="font-medium text-sm">Plan Features:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Free:</strong> Basic features, limited users</p>
              <p><strong>Basic:</strong> Standard features, up to 100 users</p>
              <p><strong>Premium:</strong> Advanced features, up to 500 users</p>
              <p><strong>Enterprise:</strong> All features, unlimited users</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Subscription'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
