import { useState, useEffect } from "react";

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayDateString() {
  return formatLocalDate(new Date());
}

export function getOffsetDateString(baseDateStr, offsetDays = 1) {
  let d;
  if (baseDateStr && typeof baseDateStr === "string") {
    const parts = baseDateStr.split("-").map(Number);
    if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      d = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      d = new Date();
    }
  } else {
    d = new Date();
  }
  d.setDate(d.getDate() + offsetDays);
  return formatLocalDate(d);
}

export function formatDisplayDate(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || isNaN(parts[0])) return dateStr;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  const day = d.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  return `${day} ${months[d.getMonth()]}`;
}

// Module-level shared singleton state
let globalCheckIn = getTodayDateString();
let globalCheckOut = getOffsetDateString(globalCheckIn, 1);
const listeners = new Set();

function broadcast() {
  listeners.forEach((listener) =>
    listener({ checkIn: globalCheckIn, checkOut: globalCheckOut })
  );
}

export function setSharedDates({ checkIn, checkOut }) {
  const today = getTodayDateString();

  if (checkIn !== undefined) {
    // Check-in can never be in the past
    globalCheckIn = checkIn < today ? today : checkIn;
    // If checkOut is now on or before checkIn, bump checkOut to next day
    if (!checkOut && globalCheckOut <= globalCheckIn) {
      globalCheckOut = getOffsetDateString(globalCheckIn, 1);
    }
  }

  if (checkOut !== undefined) {
    if (checkOut <= globalCheckIn) {
      globalCheckOut = getOffsetDateString(globalCheckIn, 1);
    } else {
      globalCheckOut = checkOut;
    }
  }

  broadcast();
}

export function useSharedBookingDates() {
  const [dates, setDates] = useState({
    checkIn: globalCheckIn,
    checkOut: globalCheckOut,
  });

  useEffect(() => {
    listeners.add(setDates);
    return () => listeners.delete(setDates);
  }, []);

  const handleSetCheckIn = (newIn) => {
    setSharedDates({ checkIn: newIn });
  };

  const handleSetCheckOut = (newOut) => {
    setSharedDates({ checkOut: newOut });
  };

  return {
    checkIn: dates.checkIn,
    checkOut: dates.checkOut,
    today: getTodayDateString(),
    setCheckIn: handleSetCheckIn,
    setCheckOut: handleSetCheckOut,
    setSharedDates,
  };
}
