import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "../components/layout/MainLayout";
import api from "../services/api";
import {
  Edit2,
  Users,
  Calendar,
  MapPin,
  Clock,
  Send,
  ArrowLeft,
} from "lucide-react";
import * as fabric from "fabric";

export const ReviewInvitation = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  // Fetch event data
  const { data: eventData, isLoading } = useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const response = await api.get(`/api/events/${eventId}`);
      return response.data.data;
    },
    enabled: !!eventId,
  });

  // Fetch guests
  const { data: guestsData } = useQuery({
    queryKey: ["guests", eventId],
    queryFn: async () => {
      const response = await api.get(`/api/events/${eventId}/guests`);
      return response.data.data;
    },
    enabled: !!eventId,
  });

  // Initialize canvas preview
  useEffect(() => {
    if (!canvasRef.current || !eventData?.customData) return;

    const initCanvas = async () => {
      try {
        // Clean up existing canvas
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.dispose();
        }

        // Create new canvas
        const canvas = new fabric.Canvas(canvasRef.current, {
          width: 400,
          height: 533,
          backgroundColor: "#ffffff",
          selection: false,
          renderOnAddRemove: true,
        });

        fabricCanvasRef.current = canvas;

        // Load design data
        await canvas.loadFromJSON(eventData.customData);

        // Disable all interactions for preview
        canvas.getObjects().forEach((obj) => {
          obj.selectable = false;
          obj.evented = false;
        });

        canvas.renderAll();
      } catch (error) {
        console.error("Error loading canvas:", error);
      }
    };

    initCanvas();

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [eventData]);

  const handleBack = () => {
    navigate(`/event/${eventId}/details`);
  };

  const handleSend = async () => {
    if (!eventId || guestCount === 0) return;

    setIsSending(true);
    try {
      const response = await api.post(`/api/events/${eventId}/publish`);

      if (response.data.success) {
        // Show success message and redirect to dashboard
        alert(
          `Successfully sent ${response.data.data.emailsSent} invitations!`
        );
        navigate(`/dashboard/events/${eventId}`);
      }
    } catch (error: any) {
      console.error("Error sending invitations:", error);
      alert(
        error.response?.data?.message ||
          "Failed to send invitations. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleEditDesign = () => {
    navigate(`/editor/${eventData?.templateId}?eventId=${eventId}`);
  };

  const handleEditDetails = () => {
    navigate(`/event/${eventId}/details`);
  };

  const handleEditGuests = () => {
    navigate(`/event/${eventId}/details`);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!eventData) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Event Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The event you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-brand-orange text-white rounded-sm hover:bg-brand-orange/90"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const guestCount = guestsData?.length || 0;
  const guests = guestsData || [];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Review Invitation
                  </h1>
                  <p className="text-sm text-gray-600">
                    Review everything before sending
                  </p>
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={isSending || guestCount === 0}
                className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-sm hover:bg-brand-orange/90 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
                {isSending
                  ? "Sending..."
                  : `Send to ${guestCount} ${guestCount === 1 ? "Guest" : "Guests"}`}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Card Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Invitation Design
                  </h2>
                  <button
                    onClick={handleEditDesign}
                    className="text-brand-orange hover:text-brand-orange/80 text-sm font-medium flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                {/* Canvas Preview */}
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                  <canvas ref={canvasRef} className="shadow-lg rounded-sm" />
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Event Details Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Event Details
                  </h2>
                  <button
                    onClick={handleEditDetails}
                    className="text-brand-orange hover:text-brand-orange/80 text-sm font-medium flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Event Name */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {eventData.title || "Untitled Event"}
                    </h3>
                    {eventData.description && (
                      <p className="text-gray-600">{eventData.description}</p>
                    )}
                  </div>

                  {/* Date & Time */}
                  {eventData.eventDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Date & Time</p>
                        <p className="text-gray-600">
                          {new Date(eventData.eventDate).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                        <p className="text-gray-600">
                          {new Date(eventData.eventDate).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "numeric",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {eventData.venue && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">{eventData.venue}</p>
                      </div>
                    </div>
                  )}

                  {/* RSVP Deadline */}
                  {eventData.rsvpDeadline && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">
                          RSVP Deadline
                        </p>
                        <p className="text-gray-600">
                          {new Date(eventData.rsvpDeadline).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Guest List Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Guest List
                  </h2>
                  <button
                    onClick={handleEditGuests}
                    className="text-brand-orange hover:text-brand-orange/80 text-sm font-medium flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-brand-orange" />
                  <p className="text-gray-900">
                    <span className="font-semibold text-2xl">{guestCount}</span>{" "}
                    <span className="text-gray-600">
                      {guestCount === 1 ? "guest" : "guests"}
                    </span>
                  </p>
                </div>

                {guestCount > 0 && (
                  <div className="space-y-2">
                    {guests.slice(0, 5).map((guest: any, index: number) => (
                      <div
                        key={guest._id || index}
                        className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {guest.name || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {guest.email || guest.phone || "No contact info"}
                          </p>
                        </div>
                      </div>
                    ))}

                    {guestCount > 5 && (
                      <button
                        onClick={handleEditGuests}
                        className="text-brand-orange hover:text-brand-orange/80 text-sm font-medium mt-2"
                      >
                        View all {guestCount} guests →
                      </button>
                    )}
                  </div>
                )}

                {guestCount === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 mb-4">No guests added yet</p>
                    <button
                      onClick={handleEditGuests}
                      className="text-brand-orange hover:text-brand-orange/80 font-medium"
                    >
                      Add Guests
                    </button>
                  </div>
                )}
              </div>

              {/* Warning if no guests */}
              {guestCount === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <div className="shrink-0">
                      <svg
                        className="w-5 h-5 text-yellow-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">
                        No guests added
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        You need to add at least one guest before sending
                        invitations.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
