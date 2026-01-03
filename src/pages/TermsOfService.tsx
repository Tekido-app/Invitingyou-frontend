import { MainLayout } from "../components/layout/MainLayout";
import { FileText } from "lucide-react";

export const TermsOfService = () => {
  const lastUpdated = "December 28, 2025";

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FileText className="w-16 h-16 text-brand-orange mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-brand-mirage/70">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <div className="bg-brand-sand p-6 rounded-sm mb-8">
              <p className="text-brand-mirage/80 leading-relaxed">
                Please read these Terms of Service carefully before using
                InvitingYou. By accessing or using our service, you agree to be
                bound by these terms.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  By creating an account or using InvitingYou, you agree to
                  these Terms of Service and our Privacy Policy. If you do not
                  agree to these terms, please do not use our service.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                2. Description of Service
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>
                  InvitingYou provides an online platform for creating,
                  customizing, and sending digital invitations. Our service
                  includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access to invitation templates</li>
                  <li>Design and customization tools</li>
                  <li>Guest list management</li>
                  <li>RSVP tracking</li>
                  <li>Digital and print-ready file downloads</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                3. User Accounts
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>
                  To use certain features, you must create an account. You agree
                  to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                  <li>Not share your account with others</li>
                </ul>
                <p className="mt-4">
                  You must be at least 13 years old to create an account.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                4. Subscription and Payment
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>
                  <strong>Free Plan:</strong> We offer a free plan with limited
                  features.
                </p>
                <p>
                  <strong>Paid Plans:</strong> Paid subscriptions are billed on
                  a recurring basis. You agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide current and accurate payment information</li>
                  <li>Pay all fees when due</li>
                  <li>
                    Authorize us to charge your payment method for renewal
                  </li>
                </ul>
                <p className="mt-4">
                  <strong>Cancellation:</strong> You may cancel your
                  subscription at any time. Cancellation takes effect at the end
                  of your current billing period.
                </p>
                <p>
                  <strong>Refunds:</strong> We offer a 30-day money-back
                  guarantee for new subscriptions.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                5. User Content
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>
                  You retain ownership of content you upload to our service. By
                  uploading content, you grant us a license to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Store and display your content</li>
                  <li>Process your content to provide our services</li>
                  <li>Create backups for data protection</li>
                </ul>
                <p className="mt-4">You represent and warrant that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You own or have rights to all content you upload</li>
                  <li>Your content does not violate any laws or rights</li>
                  <li>Your content does not contain malicious code</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                6. Prohibited Uses
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Upload harmful or malicious content</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Spam or send unsolicited communications</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt our service</li>
                  <li>
                    Use our service for commercial purposes without permission
                  </li>
                  <li>Scrape or copy content using automated means</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                7. Intellectual Property
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  All templates, designs, graphics, and other content provided
                  by InvitingYou are protected by copyright and other
                  intellectual property laws. You may use our templates to
                  create invitations for personal or commercial events, but you
                  may not:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Resell or redistribute our templates</li>
                  <li>Claim our designs as your own</li>
                  <li>Use our templates to create competing products</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                8. Disclaimers and Limitations of Liability
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>
                  <strong>Service "As Is":</strong> Our service is provided "as
                  is" without warranties of any kind.
                </p>
                <p>
                  <strong>No Guarantee:</strong> We do not guarantee that our
                  service will be uninterrupted, secure, or error-free.
                </p>
                <p>
                  <strong>Limitation of Liability:</strong> To the maximum
                  extent permitted by law, InvitingYou shall not be liable for
                  any indirect, incidental, special, or consequential damages.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                9. Indemnification
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  You agree to indemnify and hold harmless InvitingYou from any
                  claims, damages, or expenses arising from your use of our
                  service or violation of these terms.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                10. Termination
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  We may terminate or suspend your account at any time for
                  violation of these terms. Upon termination, your right to use
                  the service will immediately cease. You may also terminate
                  your account at any time through your account settings.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                11. Changes to Terms
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  We reserve the right to modify these terms at any time. We
                  will notify you of material changes via email or through our
                  service. Continued use of our service after changes
                  constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                12. Governing Law
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  These terms shall be governed by and construed in accordance
                  with the laws of the State of New York, without regard to its
                  conflict of law provisions.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                13. Contact Information
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
                <ul className="mt-3 space-y-2">
                  <li>Email: legal@invitingyou.com</li>
                  <li>Phone: +1 (234) 567-890</li>
                  <li>
                    Address: 123 Celebration Street, Suite 456, New York, NY
                    10001
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
