import { MainLayout } from "../components/layout/MainLayout";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out our platform",
      features: [
        "5 invitations per month",
        "Access to basic templates",
        "Digital delivery only",
        "Basic customization",
        "Up to 50 guests per event",
        "Email support",
      ],
      limitations: [
        "No print-ready downloads",
        "Limited template selection",
        "InvitingYou watermark",
      ],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "For regular event hosts",
      features: [
        "Unlimited invitations",
        "Access to all templates",
        "Digital & print-ready downloads",
        "Full customization options",
        "Unlimited guests",
        "Priority email support",
        "No watermarks",
        "Advanced RSVP tracking",
        "Custom branding",
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Business",
      price: "$49",
      period: "per month",
      description: "For event planners & businesses",
      features: [
        "Everything in Pro",
        "Team collaboration (up to 5 users)",
        "White-label options",
        "API access",
        "Dedicated account manager",
        "Custom template creation",
        "Analytics & reporting",
        "Phone support",
        "SLA guarantee",
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-brand-mirage/70 leading-relaxed">
              Choose the perfect plan for your celebration needs
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-sm border-2 p-8 transition-all hover:shadow-2xl ${
                  plan.popular
                    ? "border-brand-orange shadow-xl scale-105"
                    : "border-brand-cream/30 hover:border-brand-black"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-brand-black mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-brand-black">
                      {plan.price}
                    </span>
                    <span className="text-brand-mirage/60 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-brand-mirage/70">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-brand-mirage/80">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-brand-mirage/50">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to={plan.name === "Free" ? "/signup" : "/contact"}
                  className={`block w-full text-center py-3 rounded-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-brand-orange text-white hover:bg-brand-orange/90"
                      : "bg-brand-black text-white hover:bg-brand-mirage"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-brand-sand py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: "Can I change plans later?",
                  answer:
                    "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal.",
                },
                {
                  question: "Is there a free trial for Pro?",
                  answer:
                    "Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start.",
                },
                {
                  question: "Can I cancel anytime?",
                  answer:
                    "Absolutely. You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
                },
                {
                  question: "Do you offer refunds?",
                  answer:
                    "We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-sm border-2 border-brand-cream/30"
                >
                  <h3 className="text-lg font-bold text-brand-black mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-brand-mirage/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-brand-black text-white p-12 rounded-sm text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-lg opacity-90 mb-8">
              For large organizations or unique requirements, we offer custom
              enterprise plans tailored to your needs.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-brand-orange text-white px-8 py-4 rounded-sm font-semibold hover:bg-brand-orange/90 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
