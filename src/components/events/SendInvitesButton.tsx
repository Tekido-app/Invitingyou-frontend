import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

interface SendInvitesButtonProps {
  eventId: string;
  guestCount: number;
  onSuccess?: () => void;
}

export const SendInvitesButton = ({
  eventId,
  guestCount,
}: SendInvitesButtonProps) => {
  const navigate = useNavigate();

  const handleReview = () => {
    if (guestCount === 0) {
      alert("Please add at least one guest before reviewing your invitation.");
      return;
    }
    navigate(`/event/review/${eventId}`);
  };

  return (
    <button
      onClick={handleReview}
      disabled={guestCount === 0}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-sm hover:bg-brand-orange/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
    >
      <Eye className="w-5 h-5" />
      {guestCount > 0
        ? `Review & Send (${guestCount} ${guestCount === 1 ? "guest" : "guests"})`
        : "Review & Send"}
    </button>
  );
};
