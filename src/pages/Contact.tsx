import { MainLayout } from "../components/layout/MainLayout";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-brand-mirage/70 leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-brand-black mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange w-12 h-12 rounded-sm flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-black mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:support@invitingyou.com"
                      className="text-brand-mirage/70 hover:text-brand-orange transition-colors"
                    >
                      support@invitingyou.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange w-12 h-12 rounded-sm flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-black mb-1">
                      Phone
                    </h3>
                    <a
                      href="tel:+1234567890"
                      className="text-brand-mirage/70 hover:text-brand-orange transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                    <p className="text-sm text-brand-mirage/50 mt-1">
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-orange w-12 h-12 rounded-sm flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-black mb-1">
                      Office
                    </h3>
                    <p className="text-brand-mirage/70">
                      123 Celebration Street
                      <br />
                      Suite 456
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-12">
                <h3 className="font-semibold text-brand-black mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <a
                    href="/help"
                    className="block text-brand-mirage/70 hover:text-brand-orange transition-colors"
                  >
                    Help Center
                  </a>
                  <a
                    href="/pricing"
                    className="block text-brand-mirage/70 hover:text-brand-orange transition-colors"
                  >
                    Pricing
                  </a>
                  <a
                    href="/about"
                    className="block text-brand-mirage/70 hover:text-brand-orange transition-colors"
                  >
                    About Us
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border-2 border-brand-cream/30 rounded-sm p-8">
                <h2 className="text-2xl font-bold text-brand-black mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-brand-black mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-brand-cream/30 rounded-sm focus:border-brand-orange focus:outline-none transition-colors text-brand-black"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-brand-black mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-brand-cream/30 rounded-sm focus:border-brand-orange focus:outline-none transition-colors text-brand-black"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-brand-black mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-brand-cream/30 rounded-sm focus:border-brand-orange focus:outline-none transition-colors text-brand-black bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">
                        Partnership Opportunity
                      </option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-brand-black mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-brand-cream/30 rounded-sm focus:border-brand-orange focus:outline-none transition-colors resize-none text-brand-black"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-orange text-white py-4 rounded-sm font-semibold hover:bg-brand-orange/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-brand-sand py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
              Before You Reach Out
            </h2>
            <p className="text-center text-brand-mirage/70 mb-12">
              Check if your question is answered in our{" "}
              <a href="/help" className="text-brand-orange hover:underline">
                Help Center
              </a>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "What are your support hours?",
                  answer:
                    "Our support team is available Monday-Friday, 9am-6pm EST. We typically respond within 24 hours.",
                },
                {
                  question: "Do you offer phone support?",
                  answer:
                    "Phone support is available for Pro and Business plan subscribers. Free users can reach us via email.",
                },
                {
                  question: "How quickly will I get a response?",
                  answer:
                    "We aim to respond to all inquiries within 24 hours on business days. Urgent issues are prioritized.",
                },
                {
                  question: "Can I schedule a demo?",
                  answer:
                    "Yes! Business plan inquiries can schedule a personalized demo. Contact our sales team to arrange.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-sm border-2 border-brand-cream/30"
                >
                  <h3 className="font-bold text-brand-black mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-brand-mirage/70 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
