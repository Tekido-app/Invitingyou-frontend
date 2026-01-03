import { MainLayout } from "../components/layout/MainLayout";
import {
  MessageSquare,
  Heart,
  PartyPopper,
  Baby,
  GraduationCap,
  Cake,
} from "lucide-react";
import { useState } from "react";

export const WordingIdeas = () => {
  const [selectedCategory, setSelectedCategory] = useState("wedding");

  const categories = [
    { id: "wedding", name: "Wedding", icon: Heart },
    { id: "birthday", name: "Birthday", icon: Cake },
    { id: "baby", name: "Baby Shower", icon: Baby },
    { id: "graduation", name: "Graduation", icon: GraduationCap },
    { id: "party", name: "Party", icon: PartyPopper },
  ];

  const wordingExamples = {
    wedding: [
      {
        title: "Formal Traditional",
        example:
          "Together with their families\n[Bride's Name] and [Groom's Name]\nrequest the honor of your presence\nat their wedding celebration\n[Date] at [Time]\n[Venue Name]\n[Address]",
      },
      {
        title: "Casual & Fun",
        example:
          "We're getting married!\nJoin [Bride] & [Groom]\nas we tie the knot\n[Date] | [Time]\n[Venue]\nDinner, drinks, and dancing to follow!",
      },
      {
        title: "Modern Minimalist",
        example:
          "[Bride] & [Groom]\n[Date]\n[Venue]\n[Time]\nCelebration to follow",
      },
      {
        title: "Romantic",
        example:
          "Two hearts, one love\n[Bride's Name] and [Groom's Name]\ninvite you to witness their vows\nand celebrate their love story\n[Date] at [Time]\n[Venue]",
      },
    ],
    birthday: [
      {
        title: "Adult Birthday",
        example:
          "Join us in celebrating\n[Name]'s [Age]th Birthday!\n[Date] at [Time]\n[Venue]\nFood, drinks, and good times guaranteed!",
      },
      {
        title: "Kids Birthday",
        example:
          "[Child's Name] is turning [Age]!\nCome celebrate with cake, games, and fun!\n[Date] from [Start Time] to [End Time]\n[Location]\nRSVP by [Date]",
      },
      {
        title: "Surprise Party",
        example:
          "Shhh... It's a SURPRISE!\nHelp us celebrate [Name]'s birthday\n[Date] at [Time]\n[Venue]\nPlease arrive by [Time] - [Name] arrives at [Time]!",
      },
      {
        title: "Milestone Birthday",
        example:
          "Cheers to [Number] Years!\nCelebrating [Name]'s milestone birthday\n[Date] | [Time]\n[Venue]\nDress code: [Theme]",
      },
    ],
    baby: [
      {
        title: "Traditional Baby Shower",
        example:
          "Please join us for a baby shower\nhonoring\n[Mom-to-be's Name]\n[Date] at [Time]\n[Venue]\nRSVP to [Host Name] by [Date]",
      },
      {
        title: "Gender Reveal",
        example:
          "Pink or Blue?\nWe haven't got a clue!\nJoin us to find out\nif it's a girl or boy\n[Date] | [Time] | [Venue]",
      },
      {
        title: "Couples Baby Shower",
        example:
          "A little one is on the way!\nJoin [Mom] & [Dad]\nfor a couples baby shower\n[Date] at [Time]\n[Venue]",
      },
      {
        title: "Virtual Baby Shower",
        example:
          "Join us online to celebrate\n[Mom-to-be]\nVirtual Baby Shower\n[Date] at [Time]\nZoom link to follow",
      },
    ],
    graduation: [
      {
        title: "High School Graduation",
        example:
          "The tassel was worth the hassle!\nCelebrate [Graduate's Name]\nClass of [Year]\n[Date] | [Time]\n[Venue]",
      },
      {
        title: "College Graduation",
        example:
          "[Name] did it!\nJoin us in celebrating\n[Degree] from [University]\n[Date] at [Time]\n[Location]",
      },
      {
        title: "Formal Graduation",
        example:
          "You are cordially invited to celebrate\nthe graduation of\n[Graduate's Name]\n[Degree/Diploma]\n[Date] | [Time] | [Venue]",
      },
    ],
    party: [
      {
        title: "Housewarming",
        example:
          "We've got a new place!\nJoin us for a housewarming party\n[Date] at [Time]\n[New Address]\nTours, food, and drinks!",
      },
      {
        title: "Holiday Party",
        example:
          "You're invited to our\n[Holiday] Celebration!\n[Date] | [Time]\n[Venue]\nFestive attire encouraged",
      },
      {
        title: "Cocktail Party",
        example:
          "Join us for cocktails and conversation\n[Date] at [Time]\n[Venue]\nCocktail attire\nRSVP by [Date]",
      },
      {
        title: "BBQ/Casual Gathering",
        example:
          "Burgers, Beers, and Good Cheer!\nBackyard BBQ at [Host's Name]\n[Date] from [Time] to [Time]\n[Address]\nBring your appetite!",
      },
    ],
  };

  const tips = [
    {
      title: "Keep it Clear",
      description:
        "Include all essential information: who, what, when, where, and RSVP details.",
    },
    {
      title: "Match Your Tone",
      description:
        "Formal events need formal language. Casual parties can be more relaxed and fun.",
    },
    {
      title: "Personalize It",
      description:
        "Add personal touches that reflect your personality or the guest of honor.",
    },
    {
      title: "Proofread Carefully",
      description:
        "Double-check dates, times, addresses, and spelling before sending.",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageSquare className="w-16 h-16 text-brand-orange mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Invitation Wording Ideas
            </h1>
            <p className="text-xl text-brand-mirage/70 leading-relaxed">
              Find the perfect words for every occasion
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white border-b border-brand-cream/30 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-2 py-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? "bg-brand-orange text-white"
                        : "bg-brand-sand text-brand-mirage hover:bg-brand-cream"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wording Examples */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wordingExamples[
              selectedCategory as keyof typeof wordingExamples
            ].map((example, index) => (
              <div
                key={index}
                className="bg-white border-2 border-brand-cream/30 rounded-sm p-8 hover:border-brand-orange transition-all hover:shadow-lg"
              >
                <h3 className="text-xl font-bold text-brand-black mb-4">
                  {example.title}
                </h3>
                <div className="bg-brand-sand p-6 rounded-sm">
                  <pre className="font-serif text-brand-mirage/80 whitespace-pre-wrap text-center leading-relaxed">
                    {example.example}
                  </pre>
                </div>
                <button className="mt-4 w-full bg-brand-black text-white py-2 rounded-sm hover:bg-brand-mirage transition-colors text-sm font-semibold">
                  Copy to Clipboard
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-brand-sand py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Wording Tips & Best Practices
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-sm border-2 border-brand-cream/30"
                >
                  <h3 className="text-lg font-bold text-brand-black mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-brand-mirage/70">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Essential Information Checklist */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-brand-black mb-8 text-center">
            Don't Forget to Include
          </h2>
          <div className="bg-white border-2 border-brand-cream/30 rounded-sm p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Host names",
                "Guest of honor",
                "Event type",
                "Date and day of week",
                "Start time (and end time if relevant)",
                "Venue name",
                "Full address",
                "RSVP deadline",
                "RSVP contact method",
                "Dress code (if applicable)",
                "Registry information (if applicable)",
                "Special instructions (parking, etc.)",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-brand-mirage/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-brand-orange to-brand-cream py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-brand-black mb-6">
              Ready to Create Your Invitation?
            </h2>
            <p className="text-lg text-brand-mirage/70 mb-8">
              Use these wording ideas with our beautiful templates
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
