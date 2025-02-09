import { TimerTypes } from "@prisma/client";
import { prisma } from "./prismaClient";

const DISCOUNT = 20;  // in percent

type TinitialFlashSalesItems = {
  itemIds: number[];
  deadline: string;
  timer: TimerTypes;
}


const initialFlashSalesItems: TinitialFlashSalesItems = {
  itemIds: [1, 2, 3, 4, 5, 6, 7, 22],
  deadline: '2025-05-31T21:00:00.000Z',
  timer: 'SALES',
}

export async function createFlashSales() {
  await prisma.flashSales.deleteMany();
  const { itemIds, deadline, timer } = initialFlashSalesItems;

  await prisma.timer.deleteMany({
    where: {},
  })

  for (const itemId of itemIds) {
    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      }
    });

    await prisma.item.update({
      where: {
        id: itemId
      },
      data: {
        priceDiscount: Math.round(item.price * (100 - DISCOUNT) / 100),
        forSale: {
          create: {}
        }
      }
    });
  }

  await prisma.timer.create({
    data: {
      timer: timer,
      timerEnds: deadline,
    }
  })

}