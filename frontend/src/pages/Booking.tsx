import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import SlotCard from '../components/SlotCard';
import BookingModal from '../components/BookingModal';
import { useGetAllSlots, useBookSlot, useCancelBooking } from '../hooks/useQueries';
import type { BookingSlot } from '../backend';
import { formatDate, getDateKey } from '../lib/timeUtils';
import { toast } from 'sonner';

function groupSlotsByDate(slots: BookingSlot[]): Map<string, BookingSlot[]> {
  const map = new Map<string, BookingSlot[]>();
  for (const slot of slots) {
    const key = getDateKey(slot.date);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(slot);
  }
  return map;
}

export default function Booking() {
  const { data: slots, isLoading, isError, refetch } = useGetAllSlots();
  const bookSlotMutation = useBookSlot();
  const cancelMutation = useCancelBooking();

  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const grouped = slots ? groupSlotsByDate(slots) : new Map<string, BookingSlot[]>();
  const dateKeys = Array.from(grouped.keys()).sort();

  const handleBook = (slot: BookingSlot) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  const handleConfirmBook = async (slotId: string, name: string, phone: string) => {
    try {
      await bookSlotMutation.mutateAsync({ slotId, name, phone });
      setModalOpen(false);
      setSelectedSlot(null);
      toast.success('Slot booked successfully!');
    } catch (err) {
      toast.error('Failed to book slot. It may already be taken.');
    }
  };

  const handleCancel = async (slotId: string) => {
    setCancellingId(slotId);
    try {
      await cancelMutation.mutateAsync(slotId);
      toast.success('Booking cancelled.');
    } catch {
      toast.error('Failed to cancel booking.');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-turf-dark text-white py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-7 h-7 text-gold" />
            <span className="text-gold font-heading font-semibold text-sm tracking-widest uppercase">
              Reservations
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Book a Slot
          </h1>
          <p className="text-white/70 mt-3 max-w-xl">
            Browse available time slots and reserve your spot on the pitch. Green slots are ready
            to book!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Loading State */}
        {isLoading && (
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i}>
                <Skeleton className="h-7 w-48 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <Skeleton key={j} className="h-40 rounded-sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between gap-4">
              <span>Failed to load slots. Please try again.</span>
              <Button size="sm" variant="outline" onClick={() => refetch()}>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Empty State */}
        {!isLoading && !isError && dateKeys.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              No Slots Available
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              There are no booking slots available at the moment. Please check back later or
              contact us directly.
            </p>
          </div>
        )}

        {/* Slots Grouped by Date */}
        {!isLoading && !isError && dateKeys.length > 0 && (
          <div className="space-y-10">
            {dateKeys.map((dateKey) => {
              const daySlots = grouped.get(dateKey)!;
              const firstSlot = daySlots[0];
              return (
                <div key={dateKey} className="animate-fade-in">
                  {/* Date Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px flex-1 bg-border" />
                    <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-heading font-semibold text-sm text-foreground">
                        {formatDate(firstSlot.date)}
                      </span>
                    </div>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  {/* Slot Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {daySlots.map((slot) => (
                      <SlotCard
                        key={slot.id}
                        slot={slot}
                        onBook={handleBook}
                        onCancel={handleCancel}
                        isCancelling={cancellingId === slot.id}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        slot={selectedSlot}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedSlot(null);
        }}
        onBook={handleConfirmBook}
        isLoading={bookSlotMutation.isPending}
      />
    </div>
  );
}
