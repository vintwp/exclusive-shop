import { prisma } from "./prismaClient";
import * as colorsJson from "./json/colors.json";

export async function createColors() {
  await prisma.colors.createMany({
    data: [...colorsJson]
  });
}