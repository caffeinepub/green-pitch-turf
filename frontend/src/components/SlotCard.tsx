import { Clock, User, Phone, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import type { BookingSlot } from '../backend';
import { SlotStatus } from '../backend';
import { formatTime } from '../lib/timeUtils';

interface SlotCardProps {
  slot: BookingSlot;
  onBook: (slot: BookingSlot) => void;
  onCancel: (slotId: string) => void;
  isCancelling: boolean;
}

export default function SlotCard({ slot, onBook, onCancel, isCancelling }: SlotCardProps) {
  const isAvailable = slot.status === SlotStatus.available;

  return (
    <div
      className={`rounded-sm border p-4 transition-all duration-200 ${
        isAvailable
          ? 'border-primary/30 bg-card hover:border-primary hover:shadow-turf cursor-pointer'
          : 'border-border bg-muted/40 opacity-80'
      }`}
    >
      {/* Time Range */}
      <div className="flex items-center gap-2 mb-3">
        <Clock className={`w-4 h-4 ${isAvailable ? 'text-primary' : 'text-muted-foreground'}`} />
        <span className="font-heading font-semibold text-base">
          {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
        </span>
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        {isAvailable ? (
          <Badge className="bg-primary/10 text-primary border border-primary/30 font-medium text-xs gap-1">
            <CheckCircle className="w-3 h-3" />
            Available
          </Badge>
        ) : (
          <Badge variant="secondary" className="font-medium text-xs gap-1">
            <XCircle className="w-3 h-3" />
            Booked
          </Badge>
        )}
      </div>

      {/* Booker Details */}
      {!isAvailable && slot.bookerDetails && (
        <div className="space-y-1 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            <span>{slot.bookerDetails.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>{slot.bookerDetails.phone}</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      {isAvailable ? (
        <Button
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-wide"
          onClick={() => onBook(slot)}
        >
          Book Now
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 font-heading tracking-wide"
          onClick={() => onCancel(slot.id)}
          disabled={isCancelling}
        >
          {isCancelling ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Cancelling…
            </>
          ) : (
            'Cancel Booking'
          )}
        </Button>
      )}
    </div>
  );
}
