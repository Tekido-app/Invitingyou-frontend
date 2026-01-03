import { MainLayout } from "../components/layout/MainLayout";
import {
  Lightbulb,
  Calendar,
  Users,
  Gift,
  Music,
  Utensils,
  Camera,
  Heart,
} from "lucide-react";

export const PartyTips = () => {
  const categories = [
    {
      icon: Calendar,
      title: "Planning Timeline",
      tips: [
        {
          title: "6-8 Weeks Before",
          content:
            "Send out invitations. This gives guests enough time to RSVP and make arrangements.",
        },
        {
          title: "4 Weeks Before",
          content:
            "Follow up with guests who haven't responded. Finalize your guest count.",
        },
        {
          title: "2 Weeks Before",
          content:
            "Confirm vendors, finalize menu, and create a detailed timeline for the day.",
        },
        {
          title: "1 Week Before",
          content:
            "Send reminder messages to confirmed guests with final details and directions.",
        },
      ],
    },
    {
      icon: Users,
      title: "Guest Management",
      tips: [
        {
          title: "Create a Balanced Guest List",
          content:
            "Mix different friend groups and include people who will get along. Consider the venue capacity.",
        },
        {
          title: "Dietary Restrictions",
          content:
            "Ask about dietary needs in your RSVP. Plan menu options that accommodate everyone.",
        },
        {
          title: "Seating Arrangements",
          content:
            "For formal events, create a seating chart that encourages conversation and mingling.",
        },
        {
          title: "Plus-Ones",
          content:
            "Be clear about plus-one policies on your invitation to avoid confusion.",
        },
      ],
    },
    {
      icon: Utensils,
      title: "Food & Beverages",
      tips: [
        {
          title: "Quantity Planning",
          content:
            "Plan for 1.5 drinks per person per hour and 6-8 appetizers per person for cocktail parties.",
        },
        {
          title: "Variety is Key",
          content:
            "Offer a mix of vegetarian, vegan, and meat options. Include both hot and cold dishes.",
        },
        {
          title: "Timing Matters",
          content:
            "Serve appetizers as guests arrive, main course 1-2 hours into the party, dessert towards the end.",
        },
        {
          title: "Presentation",
          content:
            "Invest time in food presentation. Beautiful displays make everything taste better!",
        },
      ],
    },
    {
      icon: Music,
      title: "Entertainment & Atmosphere",
      tips: [
        {
          title: "Music Selection",
          content:
            "Create playlists for different parts of the event. Start mellow, build energy, then wind down.",
        },
        {
          title: "Lighting",
          content:
            "Use a mix of ambient, accent, and task lighting. Dimmer switches are your friend!",
        },
        {
          title: "Activities",
          content:
            "Plan 2-3 optional activities or games. Not everyone will participate, but options are nice.",
        },
        {
          title: "Photo Opportunities",
          content:
            "Create an Instagram-worthy backdrop or photo booth area for guests to capture memories.",
        },
      ],
    },
    {
      icon: Gift,
      title: "Decorations & Theme",
      tips: [
        {
          title: "Color Coordination",
          content:
            "Choose 2-3 main colors and stick to them. This creates a cohesive, professional look.",
        },
        {
          title: "Budget-Friendly Decor",
          content:
            "DIY centerpieces, use seasonal flowers, and repurpose items you already own.",
        },
        {
          title: "Focal Points",
          content:
            "Create 2-3 wow moments: entrance, main table, and dessert display are great choices.",
        },
        {
          title: "Less is More",
          content:
            "Don't over-decorate. Strategic placement of key pieces is more effective than clutter.",
        },
      ],
    },
    {
      icon: Camera,
      title: "Capturing Memories",
      tips: [
        {
          title: "Hire a Photographer",
          content:
            "For important events, a professional photographer is worth the investment.",
        },
        {
          title: "Designate a Photo Person",
          content:
            "Ask a friend to be the unofficial photographer if you're on a budget.",
        },
        {
          title: "Create a Hashtag",
          content:
            "Make a unique event hashtag and share it with guests for easy photo collection.",
        },
        {
          title: "Candid Moments",
          content:
            "The best photos are often unposed. Encourage natural interactions and laughter.",
        },
      ],
    },
  ];

  const quickTips = [
    "Always have a backup plan for outdoor events",
    "Prepare more food than you think you'll need",
    "Set up a coat check area for winter events",
    "Have a playlist ready in case live entertainment cancels",
    "Create a 'day-of' timeline and share it with helpers",
    "Set up the night before to reduce day-of stress",
    "Have a emergency kit: scissors, tape, safety pins, stain remover",
    "Greet every guest personally within 15 minutes of arrival",
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Lightbulb className="w-16 h-16 text-brand-orange mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Party Planning Tips
            </h1>
            <p className="text-xl text-brand-mirage/70 leading-relaxed">
              Expert advice to make your celebration unforgettable
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
            Quick Tips for Success
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTips.map((tip, index) => (
              <div
                key={index}
                className="bg-brand-sand p-4 rounded-sm border-2 border-brand-cream/30 hover:border-brand-orange transition-all"
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-brand-orange shrink-0 mt-1" />
                  <p className="text-brand-mirage/80 text-sm">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Tips by Category */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Comprehensive Planning Guide
            </h2>
            <div className="space-y-12">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.title}
                    className="bg-brand-sand p-8 rounded-sm"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-brand-orange w-12 h-12 rounded-sm flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-black">
                        {category.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.tips.map((tip, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-sm border-2 border-brand-cream/30"
                        >
                          <h4 className="text-lg font-bold text-brand-black mb-3">
                            {tip.title}
                          </h4>
                          <p className="text-brand-mirage/70 leading-relaxed">
                            {tip.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-brand-black text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Pro Tips from Event Planners
            </h2>
            <div className="space-y-6">
              {[
                {
                  tip: "The 80/20 Rule",
                  description:
                    "Focus 80% of your energy on the elements guests will remember most: food, music, and atmosphere. The other 20% is just details.",
                },
                {
                  tip: "Buffer Time is Essential",
                  description:
                    "Add 15-30 minutes of buffer time between activities. Things always take longer than planned.",
                },
                {
                  tip: "Delegate Wisely",
                  description:
                    "You can't do everything. Assign specific tasks to reliable friends or family members.",
                },
                {
                  tip: "Enjoy Your Own Party",
                  description:
                    "Set aside time to actually enjoy the event you've worked so hard to create. Your happiness sets the tone!",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border-l-4 border-brand-orange pl-6 py-2"
                >
                  <h3 className="text-xl font-bold mb-2">{item.tip}</h3>
                  <p className="opacity-90">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-brand-orange to-brand-cream py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-brand-black mb-6">
              Ready to Start Planning?
            </h2>
            <p className="text-lg text-brand-mirage/70 mb-8">
              Create beautiful invitations that set the perfect tone for your
              celebration
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
