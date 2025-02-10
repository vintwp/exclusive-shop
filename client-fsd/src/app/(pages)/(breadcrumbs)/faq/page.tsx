import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Container,
} from '@/shared/ui';

const header = 'lg:text-lg font-medium text-left';
const text = 'text-sm leading-5 lg:text-base';

export default function FaqPage() {
  return (
    <Container>
      <h1 className="mb-6 text-xl font-semibold tracking-tight lg:text-4xl">
        Frequently Asked Questions
      </h1>

      <Accordion
        type="single"
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className={header}>
            1. What payment methods do you accept?
          </AccordionTrigger>
          <AccordionContent className={text}>
            We accept various payment methods including credit cards, PayPal,
            and bank transfers. Please check our payment options at checkout for
            more details.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className={header}>
            2. What is your return policy?
          </AccordionTrigger>
          <AccordionContent className={text}>
            You can return any product within 30 days of receipt for a full
            refund. The item must be in its original condition and packaging.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className={header}>
            3. How long does shipping take?
          </AccordionTrigger>
          <AccordionContent className={text}>
            Shipping typically takes 5-7 business days. Delivery times may vary
            based on your location and the shipping method selected.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className={header}>
            4. Do you ship internationally?
          </AccordionTrigger>
          <AccordionContent className={text}>
            Yes, we offer international shipping. Please note that additional
            customs fees may apply, depending on your country&apos;s
            regulations.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className={header}>
            5. How can I track my order?
          </AccordionTrigger>
          <AccordionContent className={text}>
            Once your order has been shipped, you will receive an email with
            tracking information. You can also track your order in your account
            on our website.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Container>
  );
}
