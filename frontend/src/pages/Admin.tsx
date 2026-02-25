import { useState } from 'react';
import { Plus, Settings, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AdminSlotTable from '../components/AdminSlotTable';
import { useGetAllSlots, useAddSlot, useDeleteSlot, useCancelBooking } from '../hooks/useQueries';
import { dateTimeToNano, todayString } from '../lib/timeUtils';
import { toast } from 'sonner';

export default function Admin() {
  const { data: slots, isLoading, isError, refetch } = useGetAllSlots();
  const addSlotMutation = useAddSlot();
  const deleteSlotMutation = useDeleteSlot();
  const cancelMutation = useCancelBooking();

  const [date, setDate] = useState(todayString());
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('07:00');
  const [formError, setFormError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const validateForm = () => {
    if (!date) return 'Please select a date.';
    if (!startTime) return 'Please enter a start time.';
    if (!endTime) return 'Please enter an end time.';
    if (startTime >= endTime) return 'End time must be after start time.';
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return 'Date cannot be in the past.';
    return '';
  };

  const handleAddSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }
    setFormError('');

    try {
      const dateNano = dateTimeToNano(date, '00:00');
      const startNano = dateTimeToNano(date, startTime);
      const endNano = dateTimeToNano(date, endTime);

      await addSlotMutation.mutateAsync({
        date: dateNano,
        startTime: startNano,
        endTime: endNano,
      });
      toast.success('Slot added successfully!');
      // Advance start/end by 1 hour for convenience
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      const newSh = (sh + 1) % 24;
      const newEh = (eh + 1) % 24;
      setStartTime(`${String(newSh).padStart(2, '0')}:${String(sm).padStart(2, '0')}`);
      setEndTime(`${String(newEh).padStart(2, '0')}:${String(em).padStart(2, '0')}`);
    } catch {
      toast.error('Failed to add slot. Please try again.');
    }
  };

  const handleDelete = async (slotId: string) => {
    setDeletingId(slotId);
    try {
      await deleteSlotMutation.mutateAsync(slotId);
      toast.success('Slot deleted.');
    } catch {
      toast.error('Failed to delete slot.');
    } finally {
      setDeletingId(null);
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
            <Settings className="w-7 h-7 text-gold" />
            <span className="text-gold font-heading font-semibold text-sm tracking-widest uppercase">
              Management
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white">
            Admin Panel
          </h1>
          <p className="text-white/70 mt-3 max-w-xl">
            Manage booking slots — add new time slots, cancel bookings, or remove slots entirely.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* Add Slot Form */}
        <Card className="border-border shadow-turf">
          <CardHeader>
            <CardTitle className="font-heading text-xl flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add New Slot
            </CardTitle>
            <CardDescription>
              Create a new available booking slot by specifying the date and time range.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSlot} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="slot-date" className="font-medium">
                    Date
                  </Label>
                  <Input
                    id="slot-date"
                    type="date"
                    value={date}
                    min={todayString()}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={addSlotMutation.isPending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="slot-start" className="font-medium">
                    Start Time
                  </Label>
                  <Input
                    id="slot-start"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    disabled={addSlotMutation.isPending}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="slot-end" className="font-medium">
                    End Time
                  </Label>
                  <Input
                    id="slot-end"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    disabled={addSlotMutation.isPending}
                  />
                </div>
              </div>

              {formError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{formError}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                disabled={addSlotMutation.isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-wide"
              >
                {addSlotMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Slot…
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Slot
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Slots Table */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              All Slots
              {slots && (
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  ({slots.length} total)
                </span>
              )}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {isLoading && (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-14 rounded-sm" />
              ))}
            </div>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between gap-4">
                <span>Failed to load slots.</span>
                <Button size="sm" variant="outline" onClick={() => refetch()}>
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && !isError && (
            <AdminSlotTable
              slots={slots ?? []}
              onDelete={handleDelete}
              onCancel={handleCancel}
              deletingId={deletingId}
              cancellingId={cancellingId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
