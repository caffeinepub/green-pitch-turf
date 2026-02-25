import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2, XCircle } from 'lucide-react';
import type { BookingSlot } from '../backend';
import { SlotStatus } from '../backend';
import { formatDate, formatTime } from '../lib/timeUtils';

interface AdminSlotTableProps {
  slots: BookingSlot[];
  onDelete: (slotId: string) => void;
  onCancel: (slotId: string) => void;
  deletingId: string | null;
  cancellingId: string | null;
}

export default function AdminSlotTable({
  slots,
  onDelete,
  onCancel,
  deletingId,
  cancellingId,
}: AdminSlotTableProps) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="font-heading text-lg">No slots found.</p>
        <p className="text-sm mt-1">Add a new slot using the form above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead className="font-heading font-semibold text-foreground">Date</TableHead>
            <TableHead className="font-heading font-semibold text-foreground">Start</TableHead>
            <TableHead className="font-heading font-semibold text-foreground">End</TableHead>
            <TableHead className="font-heading font-semibold text-foreground">Status</TableHead>
            <TableHead className="font-heading font-semibold text-foreground">Booker</TableHead>
            <TableHead className="font-heading font-semibold text-foreground">Phone</TableHead>
            <TableHead className="font-heading font-semibold text-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map((slot) => {
            const isBooked = slot.status === SlotStatus.booked;
            const isDeleting = deletingId === slot.id;
            const isCancelling = cancellingId === slot.id;

            return (
              <TableRow key={slot.id} className="hover:bg-secondary/40">
                <TableCell className="font-medium text-sm whitespace-nowrap">
                  {formatDate(slot.date)}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap">
                  {formatTime(slot.startTime)}
                </TableCell>
                <TableCell className="text-sm whitespace-nowrap">
                  {formatTime(slot.endTime)}
                </TableCell>
                <TableCell>
                  {isBooked ? (
                    <Badge variant="secondary" className="text-xs">Booked</Badge>
                  ) : (
                    <Badge className="bg-primary/10 text-primary border border-primary/30 text-xs">
                      Available
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {slot.bookerDetails?.name ?? '—'}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {slot.bookerDetails?.phone ?? '—'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {isBooked && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-amber-600 border-amber-300 hover:bg-amber-50 h-8 px-2 text-xs"
                        onClick={() => onCancel(slot.id)}
                        disabled={isCancelling || isDeleting}
                      >
                        {isCancelling ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        <span className="ml-1">Cancel</span>
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive border-destructive/30 hover:bg-destructive/10 h-8 px-2 text-xs"
                      onClick={() => onDelete(slot.id)}
                      disabled={isDeleting || isCancelling}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span className="ml-1">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
