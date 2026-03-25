import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getErrorMessage } from "../utils/errorHandler";
import { MainLayout } from "../components/layout/MainLayout";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Check } from "lucide-react";
import {
  EventDetailsForm,
  type EventDetailsFormData,
} from "../components/events/EventDetailsForm";
import {
  RSVPSettings,
  type RSVPSettingsFormData,
} from "../components/events/RSVPSettings";
import {
  ContactUploadForm,
  type ContactFormData,
} from "../components/events/ContactUploadForm";
import {
  CSVUploader,
  type ParsedGuest,
} from "../components/events/CSVUploader";
import { ContactList, type Guest } from "../components/events/ContactList";
import { SendInvitesButton } from "../components/events/SendInvitesButton";

type WizardStep = 1 | 2 | 3;

export const CreateEvent = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("token");

  // Get initial step from URL params (e.g., ?step=3 for guests)
  const initialStep = parseInt(searchParams.get("step") || "1") as WizardStep;

  const [currentStep, setCurrentStep] = useState<WizardStep>(initialStep);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(!!eventId); // Show loading if editing
  const [eventDetailsData, setEventDetailsData] = useState<
    Partial<EventDetailsFormData> | undefined
  >(undefined);
  const [rsvpSettingsData, setRsvpSettingsData] = useState<
    Partial<RSVPSettingsFormData> | undefined
  >(undefined);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loadingGuests, setLoadingGuests] = useState(false);
  const [deletingGuestId, setDeletingGuestId] = useState<string | undefined>();
  const [uploadingCSV, setUploadingCSV] = useState(false);

  // Fetch existing event data if we have an eventId
  useEffect(() => {
    if (eventId && token) {
      console.log("🔍 Loading event data for eventId:", eventId);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      fetch(`${apiUrl}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("📦 Event data response:", data);
          if (data.success) {
            const event = data.event;
            console.log("✅ Event loaded:", event);

            // Format event date for datetime-local input
            let formattedEventDate = "";
            if (event.eventDate) {
              const date = new Date(event.eventDate);
              formattedEventDate = date.toISOString().slice(0, 16);
            }

            // Format RSVP deadline for datetime-local input
            let formattedRsvpDeadline = "";
            if (event.rsvpDeadline) {
              const date = new Date(event.rsvpDeadline);
              formattedRsvpDeadline = date.toISOString().slice(0, 16);
            }

            // Set event details data
            const eventDetails = {
              title: event.title,
              description: event.description,
              venue: event.venue,
              eventDate: formattedEventDate,
            };
            console.log("📝 Setting event details:", eventDetails);
            setEventDetailsData(eventDetails);

            // Set RSVP settings data
            const rsvpSettings = {
              rsvpEnabled: !!(
                event.rsvpDeadline ||
                event.guestLimit ||
                event.customQuestions?.length > 0
              ),
              rsvpDeadline: formattedRsvpDeadline,
              guestLimit: event.guestLimit || null,
              allowGuestView: event.allowGuestView || false,
              customQuestions:
                event.customQuestions?.map((q: string) => ({ question: q })) ||
                [],
            };
            console.log("⚙️ Setting RSVP settings:", rsvpSettings);
            setRsvpSettingsData(rsvpSettings);
          } else {
            console.error("❌ Event load failed:", data.message);
          }
          setIsLoadingData(false);
        })
        .catch((err) => {
          console.error("❌ Failed to load event:", err);
          setIsLoadingData(false);
        });
    } else {
      console.log("⚠️ No eventId or token:", { eventId, hasToken: !!token });
      setIsLoadingData(false);
    }
  }, [eventId, token]);

  // ... (Keep existing handlers, just copy them) ...
  const handleEventDetailsSubmit = async (data: EventDetailsFormData) => {
    if (!eventId || !token) return;

    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event");
      }

      // Success - move to next step
      setCurrentStep(2);
    } catch (error) {
      console.error("Error saving event details:", error);
      alert("Failed to save event details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRSVPSettingsSubmit = async (data: RSVPSettingsFormData) => {
    if (!eventId || !token) return;

    setIsLoading(true);
    try {
      // Transform the data to match backend schema
      const updateData = {
        rsvpDeadline:
          data.rsvpEnabled && data.rsvpDeadline ? data.rsvpDeadline : null,
        guestLimit:
          data.rsvpEnabled && data.guestLimit ? data.guestLimit : null,
        allowGuestView: data.rsvpEnabled ? data.allowGuestView : false,
        customQuestions: data.rsvpEnabled
          ? data.customQuestions.map((q) => q.question)
          : [],
      };

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update RSVP settings");
      }

      // Success - move to next step
      setCurrentStep(3);
    } catch (error) {
      console.error("Error saving RSVP settings:", error);
      alert("Failed to save RSVP settings.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };

  const loadGuests = async () => {
    if (!eventId || !token) return;

    console.log("👥 Loading guests for eventId:", eventId);
    setLoadingGuests(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/events/${eventId}/guests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      console.log("📦 Guests response:", result);

      if (response.ok && result.success) {
        console.log("✅ Guests loaded:", result.guests);
        setGuests(result.guests || []);
      } else {
        console.error("❌ Failed to load guests:", result.message);
      }
    } catch (error) {
      console.error("❌ Error loading guests:", error);
    } finally {
      setLoadingGuests(false);
    }
  };

  // Load guests when editing an existing event or when on step 3
  useEffect(() => {
    if (eventId && token) {
      // Load guests immediately if we have an eventId (editing mode)
      loadGuests();
    }
  }, [eventId, token]);

  // Also reload guests when navigating to step 3
  useEffect(() => {
    if (currentStep === 3 && eventId && token) {
      loadGuests();
    }
  }, [currentStep]);

  const handleAddGuest = async (data: ContactFormData) => {
    if (!eventId || !token) return;

    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/api/events/${eventId}/guests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add guest");
      }

      // Reload guests
      await loadGuests();
    } catch (error: unknown) {
      console.error("Error adding guest:", error);
      alert(getErrorMessage(error) || "Failed to add guest.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGuest = async (guestId: string) => {
    if (!eventId || !token) return;

    setDeletingGuestId(guestId);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(
        `${apiUrl}/api/events/${eventId}/guests/${guestId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete guest");
      }

      // Reload guests
      await loadGuests();
    } catch (error: unknown) {
      console.error("Error deleting guest:", error);
      alert(getErrorMessage(error) || "Failed to delete guest.");
    } finally {
      setDeletingGuestId(undefined);
    }
  };

  const handleCSVUpload = async (guestsData: ParsedGuest[]) => {
    if (!eventId || !token) return;

    setUploadingCSV(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(
        `${apiUrl}/api/events/${eventId}/guests/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ guests: guestsData }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to upload guests");
      }

      // Show summary
      alert(
        `Upload complete!\n\nImported: ${result.imported}\nFailed: ${
          result.failed
        }${result.errors.length > 0 ? "\n\nCheck console for errors" : ""}`
      );

      if (result.errors.length > 0) {
        console.error("CSV Upload Errors:", result.errors);
      }

      // Reload guests
      await loadGuests();
    } catch (error: unknown) {
      console.error("Error uploading CSV:", error);
      alert(getErrorMessage(error) || "Failed to upload CSV.");
    } finally {
      setUploadingCSV(false);
    }
  };

  const handlePublishSuccess = () => {
    // Reload event data to update status
    if (eventId && token) {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      fetch(`${apiUrl}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Event status should now be 'sent'
            console.log("Event status updated:", data.event.status);
          }
        })
        .catch((err) => console.error("Failed to reload event", err));
    }
  };

  const handleFinish = () => {
    navigate("/dashboard");
  };

  const steps = [
    { number: 1, title: "Event Details" },
    { number: 2, title: "RSVP & Settings" },
    { number: 3, title: "Guest List" },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-12">
        {/* Loading State */}
        {isLoadingData ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mb-4"></div>
            <p className="text-gray-600">Loading event data...</p>
          </div>
        ) : (
          <>
            {/* Progress Stepper - Mobile Optimized */}
            <div className="mb-8 md:mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-brand-black text-center mb-6 md:mb-8">
                Design Your Experience
              </h1>

              {/* Desktop Stepper - Horizontal */}
              <div className="hidden md:flex justify-center items-center space-x-4">
                {steps.map((step) => (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`
                            flex items-center justify-center w-10 h-10 rounded-full font-bold transition-all
                            ${
                              currentStep >= step.number
                                ? "bg-brand-black text-white"
                                : "bg-brand-cream-light text-brand-black/40"
                            }
                         `}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`ml-3 font-medium ${
                        currentStep >= step.number
                          ? "text-brand-black"
                          : "text-brand-black/40"
                      }`}
                    >
                      {step.title}
                    </span>
                    {step.number < 3 && (
                      <div className="w-12 h-px bg-brand-cream mx-4" />
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Stepper - Compact Horizontal */}
              <div className="md:hidden flex justify-center items-center gap-2">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                      flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm transition-all
                      ${
                        currentStep >= step.number
                          ? "bg-brand-black text-white"
                          : "bg-brand-cream-light text-brand-black/40"
                      }
                    `}
                      >
                        {currentStep > step.number ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          step.number
                        )}
                      </div>
                      <span
                        className={`mt-1 text-xs font-medium text-center ${
                          currentStep >= step.number
                            ? "text-brand-black"
                            : "text-brand-black/40"
                        }`}
                      >
                        {step.title.split(" ")[0]}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-8 h-px bg-brand-cream mx-2 mb-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Area - Mobile Optimized */}
            <Card className="shadow-lg border-brand-cream bg-white overflow-hidden">
              <div className="p-4 md:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-3">
                  <h2 className="text-lg md:text-xl font-bold">
                    {currentStep === 1 && "Start with the details"}
                    {currentStep === 2 && "Configure RSVP options"}
                    {currentStep === 3 && "Manage your guest list"}
                  </h2>
                  {currentStep > 1 && (
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      size="sm"
                      className="min-h-[40px]"
                    >
                      &larr; Back
                    </Button>
                  )}
                </div>

                {currentStep === 1 && (
                  <EventDetailsForm
                    initialData={eventDetailsData}
                    onSubmit={handleEventDetailsSubmit}
                    isLoading={isLoading}
                  />
                )}

                {currentStep === 2 && (
                  <RSVPSettings
                    initialData={rsvpSettingsData}
                    onSubmit={handleRSVPSettingsSubmit}
                    isLoading={isLoading}
                  />
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 md:space-y-8">
                    {/* Guest Upload Forms - Single column on mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-4">
                        <h3 className="font-bold text-brand-black text-base md:text-lg">
                          Add Individual Guest
                        </h3>
                        <ContactUploadForm
                          onSubmit={handleAddGuest}
                          isLoading={isLoading}
                        />
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-brand-mirage text-base md:text-lg">
                          Bulk Upload
                        </h3>
                        <CSVUploader
                          onUpload={handleCSVUpload}
                          isUploading={uploadingCSV}
                        />
                      </div>
                    </div>

                    {/* Guest List */}
                    <div className="border-t border-neutral-100 pt-6 md:pt-8">
                      <h3 className="font-bold text-brand-black text-base md:text-lg mb-4">
                        Guest List ({guests.length})
                      </h3>
                      {loadingGuests ? (
                        <div className="text-center py-8 text-sm">
                          Loading...
                        </div>
                      ) : (
                        <ContactList
                          guests={guests}
                          onDelete={handleDeleteGuest}
                          isDeleting={deletingGuestId}
                        />
                      )}
                    </div>

                    {/* Action Buttons - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t border-brand-cream">
                      <Button
                        variant="outline"
                        onClick={handleFinish}
                        className="w-full sm:w-auto min-h-[48px] order-2 sm:order-1"
                      >
                        Finish Later
                      </Button>
                      {eventId && (
                        <SendInvitesButton
                          eventId={eventId}
                          guestCount={guests.length}
                          onSuccess={handlePublishSuccess}
                          className="w-full sm:w-auto min-h-[48px] order-1 sm:order-2"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </>
        )}
      </div>
    </MainLayout>
  );
};
