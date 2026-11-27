import { freeSlots, ptBookings } from "./front-desk";
import { homeBranch } from "./branch";
import { isoDate } from "./member";

export type PtSlotSelection = {
  branch: string;
  date: string;
  trainer: string;
  time: string;
};
// UI fixtures only: branches without a sample show an explicit empty state.
const samples = [
  ...freeSlots.map((row) => ({
    ...row,
    branch: homeBranch.name,
    weekdays: [0, 1, 2, 3, 4, 5, 6],
  })),
  {
    branch: "Chi nhánh Quận 3",
    trainer: "HLV Huy",
    weekdays: [1, 2, 3, 4, 5, 6],
    slots: ["07:00", "10:00", "16:00", "19:00"],
  },
  {
    branch: "Chi nhánh Quận 3",
    trainer: "HLV Linh",
    weekdays: [0, 2, 4, 6],
    slots: ["08:00", "11:00", "17:00"],
  },
  {
    branch: "Chi nhánh Quận 7",
    trainer: "HLV Phúc",
    weekdays: [0, 1, 2, 3, 4, 5, 6],
    slots: ["06:00", "09:00", "15:00", "18:00"],
  },
  {
    branch: "Chi nhánh Quận 7",
    trainer: "HLV Mai",
    weekdays: [1, 3, 5],
    slots: ["07:00", "14:00", "20:00"],
  },
];

export function getPtAvailability(branch: string, date: string) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    date < isoDate() ||
    date > isoDate(14)
  )
    return [];
  const day = new Date(date + "T12:00:00").getDay();
  const earliest = Date.now() + 2 * 60 * 60 * 1000;
  return samples
    .filter((row) => row.branch === branch && row.weekdays.includes(day))
    .map((row) => ({
      trainer: row.trainer,
      slots: row.slots.filter(
        (time) =>
          new Date(`${date}T${time}:00`).getTime() >= earliest &&
          !(
            branch === homeBranch.name &&
            ptBookings.some(
              (booking) =>
                booking.trainer === row.trainer &&
                booking.date === date &&
                booking.time === time &&
                booking.status !== "Hủy",
            )
          ),
      ),
    }))
    .filter((row) => row.slots.length > 0);
}

export function firstPtSlot(
  branch = homeBranch.name,
  date = isoDate(1),
): PtSlotSelection {
  const trainer = getPtAvailability(branch, date)[0];
  return {
    branch,
    date,
    trainer: trainer?.trainer ?? "",
    time: trainer?.slots[0] ?? "",
  };
}
