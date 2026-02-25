import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  public type SlotId = Text;
  public type SlotStatus = { #available; #booked };
  public type BookerDetails = {
    name : Text;
    phone : Text;
  };

  public type BookingSlot = {
    id : SlotId;
    date : Time.Time;
    startTime : Time.Time;
    endTime : Time.Time;
    status : SlotStatus;
    bookerDetails : ?BookerDetails;
  };

  module Slot {
    public func compare(slotA : BookingSlot, slotB : BookingSlot) : Order.Order {
      if (slotA.date < slotB.date) {
        #less;
      } else if (slotA.date > slotB.date) {
        #greater;
      } else if (slotA.startTime < slotB.startTime) {
        #less;
      } else if (slotA.startTime > slotB.startTime) {
        #greater;
      } else {
        Text.compare(slotA.id, slotB.id);
      };
    };
  };

  let slotsMap = Map.empty<SlotId, BookingSlot>();

  public query ({ caller }) func getAllSlots() : async [BookingSlot] {
    slotsMap.values().toArray().sort();
  };

  public shared ({ caller }) func addSlot(date : Time.Time, startTime : Time.Time, endTime : Time.Time) : async SlotId {
    let slotId = date.toText() # "_" # startTime.toText() # "_" # endTime.toText();

    let bookingSlot : BookingSlot = {
      id = slotId;
      date;
      startTime;
      endTime;
      status = #available;
      bookerDetails = null;
    };

    slotsMap.add(slotId, bookingSlot);
    slotId;
  };

  public shared ({ caller }) func bookSlot(slotId : SlotId, name : Text, phone : Text) : async () {
    let foundSlot = switch (slotsMap.get(slotId)) {
      case (null) { Runtime.trap("Slot not found") };
      case (?foundSlot) { foundSlot };
    };
    if (foundSlot.status == #booked) {
      Runtime.trap("Slot is already booked");
    };

    let updatedSlot : BookingSlot = {
      foundSlot with
      status = #booked;
      bookerDetails = ?{
        name;
        phone;
      };
    };

    slotsMap.add(slotId, updatedSlot);
  };

  public shared ({ caller }) func cancelBooking(slotId : SlotId) : async () {
    let foundSlot = switch (slotsMap.get(slotId)) {
      case (null) { Runtime.trap("Slot not found") };
      case (?foundSlot) { foundSlot };
    };

    let updatedSlot : BookingSlot = {
      foundSlot with
      status = #available;
      bookerDetails = null;
    };

    slotsMap.add(slotId, updatedSlot);
  };

  public shared ({ caller }) func deleteSlot(slotId : SlotId) : async () {
    if (not slotsMap.containsKey(slotId)) {
      Runtime.trap("Slot not found");
    };
    slotsMap.remove(slotId);
  };

  public query ({ caller }) func getAvailableSlots() : async [BookingSlot] {
    let availableSlotIter = slotsMap.values().filter(
      func(slot) { slot.status == #available }
    );
    availableSlotIter.toArray().sort();
  };
};
