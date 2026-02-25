import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Calendar, Clock } from 'lucide-react';
import type { BookingSlot } from '../backend';
import { formatDate, formatTime } from '../lib/timeUtils';

interface BookingModalProps {
  slot: BookingSlot | null;
  open: boolean;
  onClose: () => void;
  onBook: (slotId: string, name: string, phone: string) => Promise<void>;
  isLoading: boolean;
}

export default function BookingModal({
  slot,
  open,
  onClose,
  onBook,
  isLoading,
}: BookingModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9+\-\s()]{7,15}$/.test(phone.trim()))
      newErrors.phone = 'Enter a valid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slot || !validate()) return;
    await onBook(slot.id, name.trim(), phone.trim());
    setName('');
    setPhone('');
    setErrors({});
  };

  const handleClose = () => {
    if (!isLoading) {
      setName('');
      setPhone('');
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl text-primary">
            Book This Slot
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in your details to confirm the booking.
          </DialogDescription>
        </DialogHeader>

        {slot && (
          <div className="bg-secondary rounded-sm p-4 flex flex-col gap-2 mb-2">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium">{formatDate(slot.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>
                {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="booking-name" className="font-medium">
              Full Name
            </Label>
            <Input
              id="booking-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-destructive text-xs">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="booking-phone" className="font-medium">
              Phone Number
            </Label>
            <Input
              id="booking-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              className={errors.phone ? 'border-destructive' : ''}
            />
            {errors.phone && (
              <p className="text-destructive text-xs">{errors.phone}</p>
            )}
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Booking…
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
