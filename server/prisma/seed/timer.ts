import { prisma } from "./prismaClient";
import { TimerTypes } from "@prisma/client";

type InitialTimers = Array<{
  timer: TimerTypes;
}>

const initialTimers: InitialTimers = [
  {
    timer: TimerTypes.PROMO
  },
  {
    timer: TimerTypes.SALES
  },
]

export async function createTimers() {
  for (const timer of initialTimers) {
    const timerName = timer.timer;

    await prisma.timer.create({
      data: {
        timer: timerName,
      }
    })
  }
}