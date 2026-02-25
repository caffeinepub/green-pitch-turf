import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { BookingSlot } from '../backend';

export const SLOTS_QUERY_KEY = ['slots'];

export function useGetAllSlots() {
  const { actor, isFetching } = useActor();

  return useQuery<BookingSlot[]>({
    queryKey: SLOTS_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSlots();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAvailableSlots() {
  const { actor, isFetching } = useActor();

  return useQuery<BookingSlot[]>({
    queryKey: ['availableSlots'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAvailableSlots();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSlot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      date,
      startTime,
      endTime,
    }: {
      date: bigint;
      startTime: bigint;
      endTime: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addSlot(date, startTime, endTime);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLOTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
}

export function useBookSlot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      slotId,
      name,
      phone,
    }: {
      slotId: string;
      name: string;
      phone: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.bookSlot(slotId, name, phone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLOTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
}

export function useCancelBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotId: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.cancelBooking(slotId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLOTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
}

export function useDeleteSlot() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slotId: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deleteSlot(slotId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SLOTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['availableSlots'] });
    },
  });
}
