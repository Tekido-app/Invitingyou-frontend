import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { Calendar, Plus } from "lucide-react";
import { MainLayout } from "../components/layout/MainLayout";
import { Button } from "../components/ui/Button";
import { EventCard } from "../components/dashboard/EventCard";
import { SkeletonEventCard } from "../components/common/Skeleton";
import { staggerContainer, staggerItem } from "../utils/animations";

interface Event {
  _id: string;
  title: string;
  eventDate?: string;
  venue?: string;
  status: string;
  guestCount?: number;
  rsvpCount?: number;
  createdAt: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEvents(result.events || []);
      } else {
        setError("Failed to load events");
      }
    } catch (err) {
      console.error("Error loading events:", err);
      setError("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = (eventId: string) => {
    navigate(`/dashboard/events/${eventId}`);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!token) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this event? This action cannot be undone."
    );

    if (!confirmed) return;

    const loadingToast = toast.loading("Deleting event...");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        // Remove the event from the local state
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
        toast.success("Event deleted successfully", {
          id: loadingToast,
        });
      } else {
        const result = await response.json();
        toast.error(result.message || "Failed to delete event", {
          id: loadingToast,
        });
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      toast.error("Failed to delete event. Please try again.", {
        id: loadingToast,
      });
    }
  };

  const handleEditDesign = (eventId: string, templateId?: string) => {
    // Navigate to editor with eventId
    if (templateId) {
      navigate(`/editor/${templateId}?eventId=${eventId}`);
    } else {
      // If no templateId, we need to fetch it or redirect to dashboard
      console.error("No templateId available for event:", eventId);
      alert("Cannot edit design: Template information missing");
    }
  };

  const handleEditDetails = (eventId: string) => {
    // Navigate to event details page - correct route is /event/details/:eventId
    navigate(`/event/details/${eventId}`);
  };

  const handleManageGuests = (eventId: string) => {
    // Navigate to event details page (guests tab) - correct route with step=3
    navigate(`/event/details/${eventId}?step=3`);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Dashboard Header - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-mirage truncate">
              Dashboard
            </h1>
            <p className="mt-1 md:mt-2 text-sm md:text-base text-neutral-500 truncate">
              Welcome back, {user?.name}
            </p>
          </div>
          {/* Touch-friendly button */}
          <Button
            onClick={() => navigate("/templates")}
            className="rounded-full shadow-lg w-full sm:w-auto min-h-[48px] justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span className="whitespace-nowrap">Create New Event</span>
          </Button>
        </div>

        {/* Events Grid - Responsive */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonEventCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16 md:py-24 px-4">
            <p className="text-red-500 mb-4 text-sm md:text-base">{error}</p>
            <Button
              variant="outline"
              onClick={loadEvents}
              className="min-h-[44px]"
            >
              Try Again
            </Button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 md:py-24 px-4 bg-white rounded-sm border border-dashed border-brand-sea/30">
            <div className="h-12 w-12 md:h-16 md:w-16 bg-brand-sand rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Calendar className="h-6 w-6 md:h-8 md:w-8 text-brand-sea" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-brand-mirage mb-2">
              No events yet
            </h3>
            <p className="text-sm md:text-base text-neutral-500 max-w-md mx-auto mb-6 md:mb-8">
              You haven't created any events yet. Start by choosing a template
              for your special occasion.
            </p>
            <Button
              onClick={() => navigate("/templates")}
              className="min-h-[48px] w-full sm:w-auto"
            >
              Browse Templates
            </Button>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {events.map((event) => (
              <motion.div key={event._id} variants={staggerItem}>
                <EventCard
                  event={event}
                  onClick={() => handleEventClick(event._id)}
                  onDelete={handleDeleteEvent}
                  onEditDesign={handleEditDesign}
                  onEditDetails={handleEditDetails}
                  onManageGuests={handleManageGuests}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};
