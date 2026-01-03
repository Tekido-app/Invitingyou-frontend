import { MainLayout } from "../components/layout/MainLayout";
import {
  Search,
  Book,
  HelpCircle,
  FileText,
  Video,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

export const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of creating invitations",
      articles: [
        "How to create your first invitation",
        "Choosing the right template",
        "Understanding the editor interface",
        "Saving and exporting your design",
      ],
    },
    {
      icon: FileText,
      title: "Templates & Design",
      description: "Customize templates to match your vision",
      articles: [
        "How to customize template colors",
        "Adding and editing text",
        "Uploading your own images",
        "Working with layers",
        "Using stickers and graphics",
      ],
    },
    {
      icon: MessageCircle,
      title: "Guest Management",
      description: "Manage your guest list and RSVPs",
      articles: [
        "Importing guest lists from CSV",
        "Tracking RSVPs",
        "Sending invitation reminders",
        "Managing dietary restrictions",
        "Exporting guest data",
      ],
    },
    {
      icon: Video,
      title: "Sending Invitations",
      description: "Learn how to send your invitations",
      articles: [
        "Sending digital invitations via email",
        "Downloading print-ready files",
        "Sharing invitations on social media",
        "Creating shareable links",
      ],
    },
  ];

  const popularArticles = [
    {
      title: "How do I change the text on my invitation?",
      category: "Templates & Design",
    },
    {
      title: "Can I upload my own photos?",
      category: "Templates & Design",
    },
    {
      title: "How do I track who has RSVP'd?",
      category: "Guest Management",
    },
    {
      title: "What file formats can I download?",
      category: "Sending Invitations",
    },
    {
      title: "How do I import my guest list?",
      category: "Guest Management",
    },
    {
      title: "Can I edit my invitation after sending?",
      category: "Getting Started",
    },
  ];

  const videoTutorials = [
    {
      title: "Getting Started with InvitingYou",
      duration: "5:30",
      thumbnail: "tutorial-1",
    },
    {
      title: "Customizing Your First Template",
      duration: "8:15",
      thumbnail: "tutorial-2",
    },
    {
      title: "Managing Guest Lists & RSVPs",
      duration: "6:45",
      thumbnail: "tutorial-3",
    },
    {
      title: "Advanced Design Techniques",
      duration: "12:20",
      thumbnail: "tutorial-4",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-br from-brand-cream to-brand-sand py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-16 h-16 text-brand-orange mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-brand-black mb-6">
              How Can We Help?
            </h1>
            <p className="text-xl text-brand-mirage/70 mb-8">
              Search our knowledge base or browse categories below
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-mirage/40" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-brand-cream/30 rounded-sm focus:border-brand-orange focus:outline-none transition-colors text-brand-black text-lg"
              />
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="bg-white border-2 border-brand-cream/30 rounded-sm p-8 hover:border-brand-orange transition-all hover:shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-brand-orange w-12 h-12 rounded-sm flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-black mb-2">
                        {category.title}
                      </h3>
                      <p className="text-brand-mirage/70">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {category.articles.map((article, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="text-brand-mirage/70 hover:text-brand-orange transition-colors flex items-center gap-2 group"
                        >
                          <span className="w-1.5 h-1.5 bg-brand-cream rounded-full group-hover:bg-brand-orange transition-colors" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="bg-brand-sand py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
              Popular Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularArticles.map((article, index) => (
                <a
                  key={index}
                  href="#"
                  className="bg-white p-6 rounded-sm border-2 border-brand-cream/30 hover:border-brand-orange transition-all hover:shadow-lg group"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-brand-orange shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-brand-black mb-2 group-hover:text-brand-orange transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-brand-mirage/50">
                        {article.category}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-brand-black mb-12 text-center">
            Video Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((video, index) => (
              <div
                key={index}
                className="bg-white border-2 border-brand-cream/30 rounded-sm overflow-hidden hover:border-brand-orange transition-all hover:shadow-lg group cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-brand-cream to-brand-sand flex items-center justify-center relative">
                  <Video className="w-12 h-12 text-brand-orange" />
                  <div className="absolute bottom-2 right-2 bg-brand-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                    {video.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-brand-black group-hover:text-brand-orange transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="bg-brand-black text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-lg opacity-90 mb-8">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-brand-orange text-white px-8 py-4 rounded-sm font-semibold hover:bg-brand-orange/90 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="inline-block bg-white text-brand-black px-8 py-4 rounded-sm font-semibold hover:bg-brand-cream transition-colors"
              >
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
