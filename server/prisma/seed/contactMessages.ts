import { prisma } from "./prismaClient";
import { ContactMessage } from "@prisma/client";


type TInitialContactMessages = Array<Omit<ContactMessage, 'id' | 'createdAt'>>;

const initialContactMessages: TInitialContactMessages = [
  {
    name: 'Antonio Banderas',
    email: 'test@gmail.com',
    phone: '+12345678900',
    message: 'What is your return policy? I would like to return an item I purchased',
    answered: true,
  },
  {
    name: 'Johnny Depp',
    email: 'test2@gmail.com',
    phone: '+12345678901',
    message: 'What shipping options do you offer, and how can I track my shipment?',
    answered: true,
  },
  {
    name: 'Pedro Pascal',
    email: 'tes3t@gmail.com',
    phone: '+12345678903',
    message: 'What shipping options do you offer, and how can I track my shipment?',
    answered: false,
  },
  {
    name: 'Jason Momoa',
    email: 'test4@gmail.com',
    phone: '+12345678904',
    message: 'I noticed an unexpected charge on my bill. Can you explain what it is for?',
    answered: false,
  },
];


export async function createContacatMessages() {
  await prisma.contactMessage.deleteMany({});

  for (const message of initialContactMessages) {
    await prisma.contactMessage.create({
      data: {
        ...message
      }
    })
  }
}
