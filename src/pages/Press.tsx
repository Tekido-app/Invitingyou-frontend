import { MainLayout } from "../components/layout/MainLayout";
import { Newspaper, Download, Mail } from "lucide-react";

export const Press = () => {
  const pressReleases = [
    {
      date: "December 15, 2025",
      title: "InvitingYou Launches AI-Powered Design Assistant",
      excerpt:
        "Revolutionary new feature helps users create stunning invitations in seconds with intelligent design suggestions.",
    },
    {
      date: "November 1, 2025",
      title: "InvitingYou Reaches 1 Million Users Milestone",
      excerpt:
        "Platform celebrates major growth milestone as users worldwide embrace digital invitation solutions.",
    },
    {
      date: "September 20, 2025",
      title: "New Partnership with Major Event Planning Platforms",
      excerpt:
        "Strategic partnerships expand InvitingYou's reach and integration capabilities.",
    },
  ];

  const mediaKit = [
    {
      name: "Company Logo (PNG)",
      size: "2.4 MB",
      type: "logo",
    },
    {
      name: "Company Logo (SVG)",
      size: "156 KB",
      type: "logo",
    },
    {
      name: "Brand Guidelines",
      size: "8.1 MB",
      type: "document",
    },
    {
      name: "Product Screenshots",
      size: "15.3 MB",
      type: "images",
    },
    {
      name: "Executive Headshots",
      size: "12.7 MB",
      type: "images",
    },
  ];

  const awards = [
    {
      year: "2025",
      award: "Best Design Tool",
      organization: "Tech Innovation Awards",
    },
    {
      year: "2025",
      award: "Startup of the Year",
      organization: "Digital Events Magazine",
    },
    {
      year: "2024",
      award: "Best User Experience",
      organization: "UX Design Awards",
    },
  ];

  const coverage = [
    {
      publication: "TechCrunch",
      title: "InvitingYou Revolutionizes Digital Invitations",
      date: "Dec 2025",
    },
    {
      publication: "The Verge",
      title: "The Future of Event Planning is Here",
      date: "Nov 2025",
    },
    {
      publication: "Forbes",
      title: "Top 10 Event Tech Startups to Watch",
      date: "Oct 2025",
    },
    {
      publication: "Wired",
      title: "How InvitingYou is Changing Celebrations",
      date: "Sep 2025",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Newspaper className="w-16 h-16 text-brand-orange mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-brand-mirage/70 leading-relaxed">
              Latest news, press releases, and media resources
            </p>
          </div>
        </div>

        {/* Press Contact */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-brand-black text-white p-8 rounded-sm text-center">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
            <p className="text-lg opacity-90 mb-6">
              For press inquiries, interviews, or media requests, please contact
              our PR team
            </p>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:press@invitingyou.com"
                  className="text-brand-orange hover:underline"
                >
                  press@invitingyou.com
                </a>
              </p>
              <p>
                <strong>Phone:</strong> +1 (234) 567-890 ext. 2
              </p>
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Recent Press Releases
            </h2>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-brand-cream/30 rounded-sm p-8 hover:border-brand-orange transition-all hover:shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm text-brand-mirage/50 mb-2">
                        {release.date}
                      </p>
                      <h3 className="text-2xl font-bold text-brand-black">
                        {release.title}
                      </h3>
                    </div>
                    <button className="bg-brand-orange text-white px-6 py-2 rounded-sm font-semibold hover:bg-brand-orange/90 transition-colors whitespace-nowrap">
                      Read More
                    </button>
                  </div>
                  <p className="text-brand-mirage/70">{release.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Coverage */}
        <div className="bg-brand-sand py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              In the News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coverage.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-sm border-2 border-brand-cream/30 hover:border-brand-orange transition-all"
                >
                  <p className="text-sm font-semibold text-brand-orange mb-2">
                    {item.publication}
                  </p>
                  <h3 className="text-lg font-bold text-brand-black mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-mirage/50">{item.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Awards & Recognition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className="text-center bg-brand-sand p-8 rounded-sm border-2 border-brand-cream/30"
                >
                  <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <p className="text-sm text-brand-mirage/50 mb-2">
                    {award.year}
                  </p>
                  <h3 className="text-xl font-bold text-brand-black mb-2">
                    {award.award}
                  </h3>
                  <p className="text-brand-mirage/70">{award.organization}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Kit */}
        <div className="bg-brand-sand py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Media Kit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediaKit.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-sm border-2 border-brand-cream/30 hover:border-brand-orange transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Download className="w-8 h-8 text-brand-orange" />
                    <span className="text-sm text-brand-mirage/50">
                      {item.size}
                    </span>
                  </div>
                  <h3 className="font-semibold text-brand-black mb-2 group-hover:text-brand-orange transition-colors">
                    {item.name}
                  </h3>
                  <button className="text-sm text-brand-orange font-semibold hover:underline">
                    Download
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="bg-brand-black text-white px-8 py-4 rounded-sm font-semibold hover:bg-brand-mirage transition-colors">
                Download Complete Media Kit
              </button>
            </div>
          </div>
        </div>

        {/* Company Facts */}
        <div className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Fast Facts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center p-6">
                <p className="text-5xl font-bold text-brand-orange mb-2">1M+</p>
                <p className="text-brand-mirage/70">Active Users</p>
              </div>
              <div className="text-center p-6">
                <p className="text-5xl font-bold text-brand-orange mb-2">
                  500+
                </p>
                <p className="text-brand-mirage/70">Template Designs</p>
              </div>
              <div className="text-center p-6">
                <p className="text-5xl font-bold text-brand-orange mb-2">
                  10M+
                </p>
                <p className="text-brand-mirage/70">Invitations Created</p>
              </div>
              <div className="text-center p-6">
                <p className="text-5xl font-bold text-brand-orange mb-2">
                  150+
                </p>
                <p className="text-brand-mirage/70">Countries Reached</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
