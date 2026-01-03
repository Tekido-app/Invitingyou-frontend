import { MainLayout } from "../components/layout/MainLayout";
import { Shield } from "lucide-react";

export const PrivacyPolicy = () => {
  const lastUpdated = "December 28, 2025";

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="w-16 h-16 text-brand-orange mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Privacy Policy
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
                At InvitingYou, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you use our platform.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-brand-mirage/70">
                <div>
                  <h3 className="text-xl font-semibold text-brand-black mb-2">
                    Personal Information
                  </h3>
                  <p>
                    We collect information that you provide directly to us,
                    including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Name and email address</li>
                    <li>Account credentials</li>
                    <li>Payment information</li>
                    <li>Event details and guest information</li>
                    <li>Communications with us</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-brand-black mb-2">
                    Automatically Collected Information
                  </h3>
                  <p>When you use our service, we automatically collect:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Device information and IP address</li>
                    <li>Browser type and version</li>
                    <li>Usage data and analytics</li>
                    <li>Cookies and similar technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                2. How We Use Your Information
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>
                    Process your transactions and send related information
                  </li>
                  <li>Send you technical notices and support messages</li>
                  <li>
                    Respond to your comments, questions, and customer service
                    requests
                  </li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>
                  We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>With your consent:</strong> We may share your
                    information when you give us permission
                  </li>
                  <li>
                    <strong>Service providers:</strong> We share information
                    with vendors who perform services on our behalf
                  </li>
                  <li>
                    <strong>Legal requirements:</strong> We may disclose
                    information if required by law or in response to legal
                    requests
                  </li>
                  <li>
                    <strong>Business transfers:</strong> Information may be
                    transferred in connection with a merger or acquisition
                  </li>
                </ul>
                <p className="mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                4. Data Security
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments</li>
                  <li>Access controls and authentication</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the Internet is 100%
                  secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                5. Your Rights and Choices
              </h2>
              <div className="text-brand-mirage/70 space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at
                  privacy@invitingyou.com
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  We use cookies and similar tracking technologies to track
                  activity on our service and hold certain information. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                7. Children's Privacy
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  Our service is not directed to children under 13. We do not
                  knowingly collect personal information from children under 13.
                  If you become aware that a child has provided us with personal
                  information, please contact us.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                8. International Data Transfers
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  Your information may be transferred to and maintained on
                  computers located outside of your state, province, country, or
                  other governmental jurisdiction where data protection laws may
                  differ. We ensure appropriate safeguards are in place for such
                  transfers.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                9. Changes to This Privacy Policy
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date. You are
                  advised to review this Privacy Policy periodically for any
                  changes.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-brand-black mb-4">
                10. Contact Us
              </h2>
              <div className="text-brand-mirage/70">
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </p>
                <ul className="mt-3 space-y-2">
                  <li>Email: privacy@invitingyou.com</li>
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
