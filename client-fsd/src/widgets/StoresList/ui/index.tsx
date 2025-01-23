import Link from 'next/link';
import React from 'react';
import { getStore } from '@/entities/Store';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  Container,
} from '@/shared/ui';

type Props = {};

export const StoresList: React.FC<Props> = async () => {
  const stores = await getStore();

  return (
    <Container>
      <div className="flex flex-wrap md:flex-nowrap">
        <div
          className="hidden border-r-[1px] border-clr-text-2/25 pb-12 pr-2 pt-4 md:block lg:pb-32
            lg:pr-4 lg:pt-10"
        >
          {/* {stores.map(store => (
          <Link
            key={store.name}
            className="block capitalize transition-colors hover:text-clr-secondary-3
              [&:not(:last-child)]:mb-4"
            href={`${store.url}`}
          >
            {store.name}
          </Link>
        ))} */}

          <NavigationMenu orientation="vertical">
            <NavigationMenuList className="flex-col items-start space-x-0">
              {stores.ok &&
                stores.data.map(store => (
                  <NavigationMenuItem
                    // className="[&:not(:last-child)]:mb-4"
                    key={store.name}
                  >
                    <NavigationMenuTrigger
                      className="p-0 hover:bg-transparent hover:text-clr-secondary-3
                        data-[state=open]:bg-transparent [&>svg]:hidden"
                    >
                      <Link
                        key={store.name}
                        className="capitalize"
                        href={`${store.url}`}
                      >
                        {store.name}
                      </Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink className="w-60 p-10">
                        {store.name}
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
            <NavigationMenuViewport
              classNameWrapper="left-[calc(100%+3.5rem)] top-0 "
              className="min-w-max md:min-h-48 md:min-w-60"
            />
          </NavigationMenu>
        </div>
        <div className="flex-1 basis-full bg-clr-secondary-2 md:hidden">
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {stores.ok &&
              stores.data.map(store => (
                <AccordionItem
                  value={store.name}
                  key={store.name}
                >
                  <AccordionTrigger>{store.name}</AccordionTrigger>
                  <AccordionContent>{store.name} content</AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
        <div className="flex-1 pb-12 pt-4 lg:pb-32 lg:pl-11 lg:pt-10">
          right
        </div>
      </div>
    </Container>
  );
};
