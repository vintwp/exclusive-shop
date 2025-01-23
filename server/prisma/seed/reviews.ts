import { prisma } from "./prismaClient";



type TInitialReview = {
  userId: number;
  itemId: number;
  rating: number;
  text?: string;
};


const initialReviews: TInitialReview[] = [
  {
    userId: 1,
    itemId: 2,
    text:
      "The Apple iPhone 16 Pro Max in Desert Titanium color is a sleek and stylish device that offers top-of-the-line performance and functionality. With a massive 512GB of storage, you'll have plenty of space for all your photos, videos, and apps. The stunning Desert Titanium color adds a unique touch to the device, making it stand out from the crowd. The Pro Max model also boasts a large display, perfect for watching movies, playing games, and browsing the web. Overall, the Apple iPhone 16 Pro Max in Desert Titanium is a top choice for those looking for a high-end smartphone with premium features and a stylish design.",
    rating: 5,
  },
  {
    userId: 2,
    itemId: 2,
    text: "",
    rating: 5,
  },
  {
    userId: 1,
    itemId: 2,
    text:
      "Hey there, today I'm here to chat about the Apple iPhone 16 Pro Max 512GB in the stylish Desert Titanium color. Let me just start by saying, this phone is an absolute powerhouse. With that massive storage capacity, you'll never have to worry about running out of space for all your apps, photos, and videos. The Desert Titanium color is a unique and eye-catching choice, perfect for those who want to stand out from the crowd. And let's not forget about the Pro Max's impressive camera capabilities. Whether you're a budding photographer or just love to snap pics of your everyday adventures, this phone will not disappoint. Overall, the Apple iPhone 16 Pro Max in Desert Titanium is a top-of-the-line device that combines style, performance, and functionality in one sleek package. If you're in the market for a new phone that can do it all, this is definitely one to consider.",
    rating: 4,
  },
  {
    userId: 2,
    itemId: 2,
    text: "",
    rating: 5,
  },
  {
    userId: 2,
    itemId: 1,
    text:
      "I am thrilled to review the Apple iPhone 16 Pro Max in the stunning Black Titanium color with a spacious 256GB of storage. This device truly exemplifies the pinnacle of smartphone technology. The sleek design and high-quality materials make it both a stylish accessory and a powerful tool for everyday use. The advanced features and impressive performance of the iPhone 16 Pro Max ensure a seamless user experience for all your needs. Upgrade to this state-of-the-art device and elevate your tech game to the next level!",
    rating: 4,
  },
  {
    userId: 2,
    itemId: 11,
    text:
      "Apple iPhone 16 512GB in Teal is a fantastic choice for anyone looking for a powerful and stylish smartphone. It combines cutting-edge technology with a touch of personality, making it the perfect companion for any creative endeavor.",
    rating: 4,
  },
  {
    userId: 1,
    itemId: 16,
    text:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Dolor platea faucibus volutpat odio sagittis elit taciti. Pellentesque non velit; iaculis consectetur erat cras laoreet arcu. Natoque aptent erat parturient eros et; nunc vel morbi.",
    rating: 5,
  },
  {
    userId: 1,
    itemId: 19,
    text:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Dolor platea faucibus volutpat odio sagittis elit taciti. Pellentesque non velit; iaculis consectetur erat cras laoreet arcu. Natoque aptent erat parturient eros et; nunc vel morbi.",
    rating: 3,
  },
  {
    userId: 2,
    itemId: 19,
    text:
      "Lorem ipsum odor amet, consectetuer adipiscing elit.",
    rating: 3,
  },


];

export async function createReviews() {
  await prisma.review.deleteMany();


  for (const review of initialReviews) {
    await prisma.review.create({
      data: {
        rating: review.rating,
        text: review.text,
        user: {
          connect: {
            id: review.userId,
          }
        },
        item: {
          connect: {
            id: review.itemId
          }
        }
      }
    })
  };
}