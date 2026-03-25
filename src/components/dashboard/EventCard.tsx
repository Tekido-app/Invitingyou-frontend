import {
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Trash2,
  Edit2,
  UserPlus,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    eventDate?: string;
    venue?: string;
    status: string;
    guestCount?: number;
    rsvpCount?: number;
    templateId?: string;
  };
  onClick: () => void;
  onDelete?: (eventId: string) => void;
  onEditDesign?: (eventId: string, templateId?: string) => void;
  onEditDetails?: (eventId: string) => void;
  onManageGuests?: (eventId: string) => void;
}

export const EventCard = ({
  event,
  onClick,
  onDelete,
  onEditDesign,
  onEditDetails,
  onManageGuests,
}: EventCardProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Date TBD";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const statusConfig: Record<string, { label: string; className: string }> = {
    draft: { label: "Draft", className: "bg-gray-100 text-gray-700" },
    sent: { label: "Sent", className: "bg-blue-100 text-blue-700" },
    active: { label: "Active", className: "bg-green-100 text-green-700" },
    completed: {
      label: "Completed",
      className: "bg-purple-100 text-purple-700",
    },
  };

  const status = statusConfig[event.status] || statusConfig.draft;
  const guestCount = event.guestCount || 0;
  const rsvpCount = event.rsvpCount || 0;
  const rsvpPercentage =
    guestCount > 0 ? Math.round((rsvpCount / guestCount) * 100) : 0;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onDelete) {
      onDelete(event._id);
    }
  };

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-brand-sea/10 hover:border-brand-orange/50"
    >
      <div className="p-4 md:p-6">
        {/* Header - Mobile Optimized */}
        <div className="flex items-start justify-between mb-3 md:mb-4 gap-2">
          <h3 className="text-lg md:text-2xl font-bold text-brand-mirage line-clamp-2 flex-1 min-w-0">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            <span
              className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${status.className}`}
            >
              {status.label}
            </span>
            {onDelete && (
              <motion.button
                onClick={handleDelete}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-sm hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                title="Delete event"
                aria-label="Delete event"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Event Details - Responsive */}
        <div className="space-y-2 mb-3 md:mb-4">
          {event.eventDate && (
            <div className="flex items-center text-brand-mirage/70">
              <Calendar className="h-4 w-4 mr-2 text-brand-orange shrink-0" />
              <span className="text-xs md:text-sm truncate">
                {formatDate(event.eventDate)}
              </span>
            </div>
          )}
          {event.venue && (
            <div className="flex items-center text-brand-mirage/70">
              <MapPin className="h-4 w-4 mr-2 text-brand-orange shrink-0" />
              <span className="text-xs md:text-sm line-clamp-1">
                {event.venue}
              </span>
            </div>
          )}
        </div>

        {/* RSVP Stats - Responsive */}
        <div className="border-t border-brand-sea/10 pt-3 md:pt-4">
          <div className="flex items-center justify-between mb-2 gap-2">
            <div className="flex items-center text-brand-mirage/70 min-w-0">
              <Users className="h-4 w-4 mr-1 md:mr-2 text-brand-sea shrink-0" />
              <span className="text-xs md:text-sm font-medium truncate">
                {guestCount} Guests
              </span>
            </div>
            <div className="flex items-center text-brand-mirage/70 min-w-0">
              <CheckCircle2 className="h-4 w-4 mr-1 md:mr-2 text-green-600 shrink-0" />
              <span className="text-xs md:text-sm font-medium truncate">
                {rsvpCount} RSVPs
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          {guestCount > 0 && (
            <div className="mt-2 md:mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-brand-mirage/60">
                  Response Rate
                </span>
                <span className="text-xs font-semibold text-brand-orange">
                  {rsvpPercentage}%
                </span>
              </div>
              <div className="w-full bg-brand-sand rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rsvpPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-brand-orange rounded-full h-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-brand-sea/10 pt-3 md:pt-4 mt-3 md:mt-4">
          <div className="grid grid-cols-3 gap-2">
            {onEditDesign && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditDesign(event._id, event.templateId);
                }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-2 rounded-sm hover:bg-brand-orange/10 text-brand-mirage/70 hover:text-brand-orange transition-colors"
                title="Edit Design"
              >
                <Palette className="h-4 w-4" />
                <span className="text-xs font-medium">Design</span>
              </motion.button>
            )}
            {onEditDetails && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditDetails(event._id);
                }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-2 rounded-sm hover:bg-brand-sea/10 text-brand-mirage/70 hover:text-brand-sea transition-colors"
                title="Edit Details"
              >
                <Edit2 className="h-4 w-4" />
                <span className="text-xs font-medium">Details</span>
              </motion.button>
            )}
            {onManageGuests && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onManageGuests(event._id);
                }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 p-2 rounded-sm hover:bg-green-50 text-brand-mirage/70 hover:text-green-600 transition-colors"
                title="Manage Guests"
              >
                <UserPlus className="h-4 w-4" />
                <span className="text-xs font-medium">Guests</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
