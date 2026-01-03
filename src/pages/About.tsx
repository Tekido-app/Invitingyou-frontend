import { MainLayout } from "../components/layout/MainLayout";
import { Heart, Users, Sparkles, Award } from "lucide-react";

export const About = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              About InvitingYou
            </h1>
            <p className="text-xl text-brand-mirage/70 leading-relaxed">
              Creating beautiful moments, one invitation at a time
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-brand-black mb-6">
              Our Story
            </h2>
            <p className="text-brand-mirage/70 mb-4 leading-relaxed">
              InvitingYou was born from a simple belief: every celebration
              deserves an invitation as special as the event itself. We
              understand that the invitation is often the first glimpse your
              guests get of your special day, and we're here to make that first
              impression unforgettable.
            </p>
            <p className="text-brand-mirage/70 mb-4 leading-relaxed">
              Founded by a team of designers and event enthusiasts, we've made
              it our mission to democratize beautiful design. Whether you're
              planning an intimate gathering or a grand celebration, our
              platform empowers you to create stunning invitations without
              needing design expertise.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-brand-sand py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              What We Stand For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Passion",
                  description:
                    "We're passionate about helping you celebrate life's special moments",
                },
                {
                  icon: Users,
                  title: "Community",
                  description:
                    "Building a community of celebration enthusiasts and creative minds",
                },
                {
                  icon: Sparkles,
                  title: "Creativity",
                  description:
                    "Empowering everyone to express their unique style and vision",
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description:
                    "Committed to delivering the highest quality designs and experience",
                },
              ].map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-white p-6 rounded-sm border-2 border-brand-cream/30 hover:border-brand-black transition-all"
                  >
                    <div className="bg-brand-cream w-12 h-12 rounded-sm flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-brand-black" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-black mb-2">
                      {value.title}
                    </h3>
                    <p className="text-brand-mirage/70">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-brand-black text-white p-12 rounded-sm">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed opacity-90">
              To make beautiful, personalized invitations accessible to
              everyone. We believe that every celebration—big or small—deserves
              to be announced with style, warmth, and creativity. Through
              intuitive design tools and stunning templates, we're making it
              easier than ever to create invitations that truly reflect your
              unique story.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Why Choose InvitingYou?
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Professional Design Made Easy",
                  description:
                    "Access hundreds of professionally designed templates that you can customize in minutes, no design skills required.",
                },
                {
                  title: "Complete Customization",
                  description:
                    "Every element is editable. Change colors, fonts, images, and layouts to match your vision perfectly.",
                },
                {
                  title: "Digital & Print Ready",
                  description:
                    "Send your invitations digitally or download print-ready files. The choice is yours.",
                },
                {
                  title: "Guest Management",
                  description:
                    "Track RSVPs, manage guest lists, and send reminders—all from one convenient dashboard.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="border-l-4 border-brand-orange pl-6 py-2"
                >
                  <h3 className="text-xl font-bold text-brand-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-brand-mirage/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-brand-orange to-brand-cream py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-brand-black mb-6">
              Ready to Create Something Beautiful?
            </h2>
            <p className="text-lg text-brand-mirage/70 mb-8">
              Join thousands of happy users who've made their celebrations
              unforgettable
            </p>
            <a
              href="/templates"
              className="inline-block bg-brand-black text-white px-8 py-4 rounded-sm font-semibold hover:bg-brand-mirage transition-colors"
            >
              Browse Templates
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
