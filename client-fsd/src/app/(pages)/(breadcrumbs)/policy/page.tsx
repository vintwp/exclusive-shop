import { Container } from '@/shared/ui';

const header = 'lg:xl text-lg font-semibold';
const text = 'text-sm leading-5 lg:text-base [&:not(:last-child)]:mb-2';
const list = `${text} list-disc pl-5 mt-2`;

export default function PolicyPage() {
  return (
    <Container>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className={header}>1. Introduction</h2>
          <p className={text}>
            This Privacy Policy explains how our company collects, uses,
            discloses, and safeguards your information when you visit our
            website. Please read this policy carefully to understand our
            practices regarding your information.
          </p>
        </div>
        <div>
          <h2 className={header}>2. Information We Collect</h2>
          <p className={text}>
            We may collect the following types of information:
          </p>
          <ul className={list}>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, etc.
            </li>
            <li>
              <strong>Usage Data:</strong> Information on how you use our
              website.
            </li>
            <li>
              <strong>Cookies:</strong> Small files stored on your device that
              help us improve your experience.
            </li>
          </ul>
        </div>
        <div>
          <h2 className={header}>3. How We Use Your Information</h2>
          <p className={text}>
            We may use the information we collect in the following ways:
          </p>
          <ul className={list}>
            <li>To provide, operate, and maintain our website.</li>
            <li>To improve, personalize, and expand our website.</li>
            <li>To understand and analyze how you use our website.</li>
            <li>
              To communicate with you, either directly or through one of our
              partners, including for customer service, to provide you with
              updates and other information relating to the website.
            </li>
            <li>
              To process your transactions and send you related information,
              including purchase confirmations and invoices.
            </li>
          </ul>
        </div>
        <div>
          <h2 className={header}>4. Sharing Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul className={list}>
            <li>
              With service providers to monitor and analyze the use of our
              website.
            </li>
            <li>
              To comply with legal obligations, protect and defend our rights,
              and prevent fraud.
            </li>
            <li>
              With your consent, we may disclose your personal information for
              any other purpose.
            </li>
          </ul>
        </div>
        <div>
          <h2 className={header}>5. Data Security</h2>
          <p className={text}>
            We take data security seriously and use commercially acceptable
            means to protect your personal information. However, no method of
            transmission over the internet or method of electronic storage is
            100% secure.
          </p>
        </div>
        <div>
          <h2 className={header}>6. Your Rights</h2>
          <p className={text}>You have the right to:</p>
          <ul className={list}>
            <li>Access the personal information we hold about you.</li>
            <li>
              Request correction of any inaccuracies in your personal
              information.
            </li>
            <li>
              Request deletion of your personal information under certain
              conditions.
            </li>
          </ul>
        </div>
        <div>
          <h2 className={header}>7. Changes to This Privacy Policy</h2>
          <p className={text}>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>
        </div>
        <div>
          <h2 className={header}>8. Contact Us</h2>
          <p className={text}>
            If you have any questions about this Privacy Policy, please contact
            us at{' '}
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
