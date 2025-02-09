import { Container } from '@/shared/ui';
import { ContactForm, ContactInfo } from '@/widgets';

export default function ContactsPage() {
  return (
    <Container>
      <div className="flex flex-wrap gap-[30px] md:flex-nowrap">
        <div className="basis-full md:basis-[30%]">
          <ContactInfo />
        </div>
        <div className="basis-full md:basis-[70%]">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
