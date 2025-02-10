import { Container } from '@/shared/ui';

const header = 'lg:xl text-lg font-medium';
const text = 'text-sm leading-5 lg:text-base [&:not(:last-child)]:mb-2';

export default function TermsOfUsePage() {
  return (
    <Container>
      <h1 className="mb-6 text-xl font-semibold tracking-tight lg:text-4xl">
        Terms of use
      </h1>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className={header}>1. Acceptance of Terms</h2>
          <p className={text}>
            By accessing this website, you agree to comply with and be bound by
            these terms of use. If you do not agree to these terms, please do
            not use this site.
          </p>
        </div>
        <div>
          <h2 className={header}>2. Changes to Terms</h2>
          <p className={text}>
            We may modify these terms at any time. Any changes will be effective
            immediately upon posting on this site. Your continued use of the
            site after changes are posted constitutes your acceptance of the new
            terms.
          </p>
        </div>
        <section>
          <h2 className={header}>3. User Responsibilities</h2>
          <p className={text}>
            You agree to use the website in accordance with all applicable laws
            and regulations. You are responsible for any content you post or
            share on the site.
          </p>
        </section>
        <section>
          <h2 className={header}>4. Intellectual Property</h2>
          <p className={text}>
            The content on this site, including text, graphics, logos, and
            images, is owned by us or our licensors. You may not reproduce,
            distribute, or create derivative works without our permission.
          </p>
        </section>
        <div>
          <h2 className={header}>5. Limitation of Liability</h2>
          <p className={text}>
            We are not liable for any damages arising from your use of this
            site, including but not limited to direct, indirect, incidental, or
            consequential damages.
          </p>
        </div>
        <div>
          <h2 className={header}>6. Governing Law</h2>
          <p className={text}>
            These terms are governed by the laws of Ukraine. Any disputes
            arising from these terms will be resolved in the courts of Ukraine.
          </p>
        </div>
        <div>
          <h2 className={header}>7. Contact Us</h2>
          <p className={text}>
            If you have any questions or concerns about these terms, please
            contact us at{' '}
            <a
              href="mailto:support@example.com"
              className="underline underline-offset-2"
            >
              exclusive@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </Container>
  );
}
