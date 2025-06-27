import { useEffect, useState } from "react";

const Client_Meeting = () => {
      const [meetings, setMeetings] = useState([]);
      const [filteredMeetings, setFilteredMeetings] = useState([]);
      const [selectedMeeting, setSelectedMeeting] = useState(null);
      const [modalOpen, setModalOpen] = useState(false);
      const [showBuffers, setShowBuffers] = useState(false);
      const [expandedMeeting, setExpandedMeeting] = useState(null);
      const [loading, setLoading] = useState(true);
      const [activeFilter, setActiveFilter] = useState("upcoming");
      const [showDateRange, setShowDateRange] = useState(false);
      const [dateRange, setDateRange] = useState({ start: "", end: "" });
      const [meetingInvitees, setMeetingInvitees] = useState({});
      const [actionLoading, setActionLoading] = useState({});
      const [showRescheduleModal, setShowRescheduleModal] = useState(false);
      const [rescheduleMeeting, setRescheduleMeeting] = useState(null);
      const [newDate, setNewDate] = useState("");
      const [newTime, setNewTime] = useState("");

      const CALENDLY_TOKEN =
            "Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzUxMDIzMDQ4LCJqdGkiOiI3OWMzZDE3NS1hYjJkLTRiOTMtOWUwMS1lM2E5MGE2ZTQ0YmYiLCJ1c2VyX3V1aWQiOiJiMTgxNmZlZi1kYWEyLTRhMWItYmM1NS03MjM0OGRjODA2ZWEifQ.fqFBxpZJcdkp7d4yHaB8_54B5_zpFGSKcKGXQlExAE4psCUv-amJMaIMddsLaQdvkMlra0OtKh6pLajwbKpdXQ";

      // Fetch meetings on mount
      useEffect(() => {
            const fetchMeetings = async () => {
                  try {
                        setLoading(true);
                        const userRes = await fetch("https://api.calendly.com/users/me", {
                              headers: { Authorization: CALENDLY_TOKEN },
                        });
                        const userData = await userRes.json();
                        const userUri = userData.resource.uri;

                        let events = [];
                        let nextPage = `https://api.calendly.com/scheduled_events?user=${userUri}`;
                        while (nextPage) {
                              const eventsRes = await fetch(nextPage, {
                                    headers: { Authorization: CALENDLY_TOKEN },
                              });
                              const eventsData = await eventsRes.json();
                              events = [...events, ...(eventsData.collection || [])];
                              nextPage = eventsData.pagination?.next_page || null;
                        }
                        setMeetings(events);
                  } catch (err) {
                        console.error("Calendly API error:", err);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchMeetings();
      }, []);

      // Filter meetings according to filters or date range
      useEffect(() => {
            filterMeetings();
      }, [meetings, activeFilter, dateRange]);

      // Fetch invitees for a meeting (when expanded)
      const fetchInviteesForMeeting = async (meetingUri) => {
            try {
                  const uuid = meetingUri.split("/").pop();
                  const inviteeRes = await fetch(
                        `https://api.calendly.com/scheduled_events/${uuid}/invitees`,
                        {
                              headers: { Authorization: CALENDLY_TOKEN },
                        }
                  );
                  const inviteeData = await inviteeRes.json();
                  return inviteeData.collection || [];
            } catch (err) {
                  console.error("Invitee fetch error:", err);
                  return [];
            }
      };

      const filterMeetings = () => {
            const now = new Date();
            let filtered = [];
            switch (activeFilter) {
                  case "all":
                        filtered = meetings;
                        break;
                  case "upcoming":
                        filtered = meetings.filter(
                              (meeting) => new Date(meeting.start_time) > now
                        );
                        break;
                  case "pending":
                        filtered = meetings.filter(
                              (meeting) =>
                                    meeting.status === "pending" ||
                                    meeting.status === "awaiting_confirmation"
                        );
                        break;
                  case "past":
                        filtered = meetings.filter(
                              (meeting) => new Date(meeting.start_time) < now
                        );
                        break;
                  case "date-range":
                        if (dateRange.start && dateRange.end) {
                              const startDate = new Date(dateRange.start);
                              const endDate = new Date(dateRange.end);
                              filtered = meetings.filter((meeting) => {
                                    const meetingDate = new Date(meeting.start_time);
                                    return meetingDate >= startDate && meetingDate <= endDate;
                              });
                        } else {
                              filtered = meetings;
                        }
                        break;
                  default:
                        filtered = meetings;
            }
            setFilteredMeetings(filtered);
      };

      const openModal = (meeting) => {
            setSelectedMeeting(meeting);
            setModalOpen(true);
      };

      const closeModal = () => {
            setModalOpen(false);
            setSelectedMeeting(null);
      };

      const toggleExpanded = async (meetingUri) => {
            if (expandedMeeting === meetingUri) {
                  setExpandedMeeting(null);
            } else {
                  if (!meetingInvitees[meetingUri]) {
                        setMeetingInvitees((prev) => ({ ...prev, [meetingUri]: "loading" }));
                        const invitees = await fetchInviteesForMeeting(meetingUri);
                        setMeetingInvitees((prev) => ({ ...prev, [meetingUri]: invitees }));
                  }
                  setExpandedMeeting(meetingUri);
            }
      };

      const formatDate = (dateString) => {
            const date = new Date(dateString);
            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            return {
                  dateHeader: date.toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                  }),
                  isToday,
                  time: date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                  }),
            };
      };

      const formatTimeRange = (start, end) => {
            const startTime = new Date(start).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
            });
            const endTime = new Date(end).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
            });
            return `${startTime} – ${endTime}`;
      };

      const groupMeetingsByDate = (meetings) => {
            const grouped = {};
            meetings.forEach((meeting) => {
                  const dateKey = new Date(meeting.start_time).toDateString();
                  if (!grouped[dateKey]) {
                        grouped[dateKey] = [];
                  }
                  grouped[dateKey].push(meeting);
            });
            return grouped;
      };

      const groupedMeetings = groupMeetingsByDate(filteredMeetings);

      // Cancel meeting handler
      const handleCancel = async (meeting) => {
            if (
                  !window.confirm(
                        "Are you sure you want to cancel this meeting for all invitees?"
                  )
            ) {
                  return;
            }
            const uuid = meeting.uri.split("/").pop();
            setActionLoading((prev) => ({ ...prev, [meeting.uri]: true }));
            try {
                  const res = await fetch(
                        `https://api.calendly.com/scheduled_events/${uuid}/cancellation`,
                        {
                              method: "POST",
                              headers: {
                                    Authorization: CALENDLY_TOKEN,
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    reason: "Cancelled by user from dashboard.",
                              }),
                        }
                  );
                  if (res.ok) {
                        setMeetings((prev) =>
                              prev.map((m) =>
                                    m.uri === meeting.uri ? { ...m, status: "canceled" } : m
                              )
                        );
                        alert("Meeting canceled successfully.");
                  } else {
                        alert("Failed to cancel meeting.");
                  }
            } catch (e) {
                  alert("Error cancelling meeting.");
            } finally {
                  setActionLoading((prev) => ({ ...prev, [meeting.uri]: false }));
            }
      };

      // Reschedule handlers
      const openRescheduleModal = (meeting) => {
            setRescheduleMeeting(meeting);
            setNewDate("");
            setNewTime("");
            setShowRescheduleModal(true);
      };
      const closeRescheduleModal = () => {
            setShowRescheduleModal(false);
            setRescheduleMeeting(null);
            setNewDate("");
            setNewTime("");
      };
      const handleReschedule = async () => {
            if (!newDate || !newTime) {
                  alert("Please provide both date and time.");
                  return;
            }
            const uuid = rescheduleMeeting.uri.split("/").pop();
            setActionLoading((prev) => ({ ...prev, [rescheduleMeeting.uri]: true }));
            try {
                  // Calendly does not support PATCHing event times directly via API (as of 2024).
                  // The typical process: cancel the event and create a new one (with notification).
                  // We'll simulate this for demo: cancel, then reload meetings.
                  const res = await fetch(
                        `https://api.calendly.com/scheduled_events/${uuid}/cancellation`,
                        {
                              method: "POST",
                              headers: {
                                    Authorization: CALENDLY_TOKEN,
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    reason: `Rescheduled to ${newDate} ${newTime}`,
                              }),
                        }
                  );
                  if (res.ok) {
                        alert(
                              "Meeting canceled for rescheduling. Please create a new meeting for the new time."
                        );
                        setMeetings((prev) =>
                              prev.map((m) =>
                                    m.uri === rescheduleMeeting.uri
                                          ? { ...m, status: "canceled" }
                                          : m
                              )
                        );
                  } else {
                        alert(
                              "Calendly API does not support direct rescheduling. Meeting was not rescheduled."
                        );
                  }
            } catch (e) {
                  alert("Error rescheduling meeting.");
            } finally {
                  setActionLoading((prev) => ({
                        ...prev,
                        [rescheduleMeeting.uri]: false,
                  }));
                  closeRescheduleModal();
            }
      };

      // UI
      return (
            <div className="p-6 max-w-7xl  min-h-screen">
                  {/* Header */}
                  <div className="mb-8">
                        <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                                          <svg
                                                className="h-6 w-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                          </svg>
                                    </div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                          Client Meetings
                                    </h1>
                                    <div className="p-1 bg-indigo-100 rounded-full">
                                          <svg
                                                className="h-4 w-4 text-indigo-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                          </svg>
                                    </div>
                              </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between mb-8">

                              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium">
                                    Displaying {filteredMeetings.length} of {meetings.length} Events
                              </div>
                        </div>

                        {/* Tabs and Actions */}
                        <div className="flex items-center justify-between">
                              <div className="flex bg-white rounded-xl p-1 border-2 border-indigo-200 shadow-lg">
                                    {["upcoming", "pending", "past", "all", "date-range"].map(
                                          (filter) => (
                                                <button
                                                      key={filter}
                                                      onClick={() => {
                                                            setActiveFilter(filter);
                                                            if (filter === "date-range") {
                                                                  setShowDateRange(true);
                                                            } else {
                                                                  setShowDateRange(false);
                                                            }
                                                      }}
                                                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeFilter === filter
                                                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                                                            : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
                                                            }`}
                                                >
                                                      {filter === "date-range"
                                                            ? "Date Range"
                                                            : filter.charAt(0).toUpperCase() + filter.slice(1)}
                                                      {filter === "date-range" && (
                                                            <svg
                                                                  className="inline-block ml-1 h-3 w-3"
                                                                  fill="none"
                                                                  stroke="currentColor"
                                                                  viewBox="0 0 24 24"
                                                            >
                                                                  <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M19 9l-7 7-7-7"
                                                                  />
                                                            </svg>
                                                      )}
                                                </button>
                                          )
                                    )}
                              </div>
                        </div>

                        {/* Date Range Picker */}
                        {showDateRange && (
                              <div className="mt-4 p-4 bg-white rounded-xl border-2 border-indigo-200 shadow-lg">
                                    <div className="flex items-center gap-4">
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      Start Date
                                                </label>
                                                <input
                                                      type="date"
                                                      value={dateRange.start}
                                                      onChange={(e) =>
                                                            setDateRange({ ...dateRange, start: e.target.value })
                                                      }
                                                      className="border-2 border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      End Date
                                                </label>
                                                <input
                                                      type="date"
                                                      value={dateRange.end}
                                                      onChange={(e) =>
                                                            setDateRange({ ...dateRange, end: e.target.value })
                                                      }
                                                      className="border-2 border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                                />
                                          </div>
                                          <button
                                                onClick={() => {
                                                      setDateRange({ start: "", end: "" });
                                                      setActiveFilter("upcoming");
                                                      setShowDateRange(false);
                                                }}
                                                className="mt-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition-colors duration-200"
                                          >
                                                Clear
                                          </button>
                                    </div>
                              </div>
                        )}
                  </div>

                  {/* Meetings List */}
                  <div className="space-y-8">
                        {Object.entries(groupedMeetings).map(([dateKey, dateMeetings]) => {
                              const { dateHeader, isToday } = formatDate(
                                    dateMeetings[0].start_time
                              );
                              return (
                                    <div key={dateKey} className="animate-fadeIn">
                                          <div className="flex items-center gap-3 mb-6">
                                                <h2 className="text-lg font-bold text-gray-100">
                                                      {dateHeader}
                                                </h2>
                                                {isToday && (
                                                      <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                                            TODAY
                                                      </span>
                                                )}
                                          </div>
                                          <div className="space-y-4">
                                                {dateMeetings.map((meeting) => {
                                                      const isExpanded = expandedMeeting === meeting.uri;
                                                      const timeRange = formatTimeRange(
                                                            meeting.start_time,
                                                            meeting.end_time
                                                      );
                                                      const hosts =
                                                            Array.isArray(meeting.event_memberships) &&
                                                                  meeting.event_memberships.length > 0
                                                                  ? meeting.event_memberships.map((m) => m.user).join(", ")
                                                                  : "Unknown";
                                                      const locationType = meeting.location?.type || "N/A";
                                                      const joinUrl = meeting.location?.join_url;
                                                      const invitees = meetingInvitees[meeting.uri];

                                                      return (
                                                            <div
                                                                  key={meeting.uri}
                                                                  className=" rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 hover:border-indigo-300 border-opacity-25 overflow-hidden"
                                                            >
                                                                  <div className="p-6">
                                                                        <div className="flex items-center  gap-6">
                                                                              {/* Time Indicator */}

                                                                              {/* Meeting Content */}
                                                                              <div className="flex-1 min-w-0">
                                                                                    <div className="flex items-start justify-between">
                                                                                          <div>

                                                                                                <h3 className="text-xl font-bold text-gray-100 mb-1">
                                                                                                      {meeting.name}
                                                                                                </h3>
                                                                                                <div className="text-sm flex items-center gap-2  mb-3 font-semibold text-gray-100 mt-2 whitespace-nowrap">
                                                                                                      {timeRange}  <div className="text-xs text-gray-300 ">
                                                                                                            (Asia/Dhaka)
                                                                                                      </div>
                                                                                                </div>
                                                                                                <div className="flex items-center gap-2 mb-3">
                                                                                                      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                                                                                            Consultation
                                                                                                      </span>
                                                                                                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                                                                                            {meeting.status || "Confirmed"}
                                                                                                      </span>
                                                                                                </div>


                                                                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                                                                      <span className="flex items-center gap-1">
                                                                                                            <svg
                                                                                                                  className="h-4 w-4"
                                                                                                                  fill="none"
                                                                                                                  stroke="currentColor"
                                                                                                                  viewBox="0 0 24 24"
                                                                                                            >
                                                                                                                  <path
                                                                                                                        strokeLinecap="round"
                                                                                                                        strokeLinejoin="round"
                                                                                                                        strokeWidth={2}
                                                                                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                                                                  />
                                                                                                            </svg>
                                                                                                            {meeting.event_memberships?.length || 1} host
                                                                                                            | {invitees && invitees !== "loading"
                                                                                                                  ? invitees.length
                                                                                                                  : 0}{" "}
                                                                                                            invitee(s)
                                                                                                      </span>
                                                                                                </div>
                                                                                          </div>
                                                                                          <button
                                                                                                onClick={() => toggleExpanded(meeting.uri)}
                                                                                                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-all duration-200"
                                                                                          >
                                                                                                {isExpanded ? (
                                                                                                      <svg
                                                                                                            className="h-4 w-4"
                                                                                                            fill="none"
                                                                                                            stroke="currentColor"
                                                                                                            viewBox="0 0 24 24"
                                                                                                      >
                                                                                                            <path
                                                                                                                  strokeLinecap="round"
                                                                                                                  strokeLinejoin="round"
                                                                                                                  strokeWidth={2}
                                                                                                                  d="M5 15l7-7 7 7"
                                                                                                            />
                                                                                                      </svg>
                                                                                                ) : (
                                                                                                      <svg
                                                                                                            className="h-4 w-4"
                                                                                                            fill="none"
                                                                                                            stroke="currentColor"
                                                                                                            viewBox="0 0 24 24"
                                                                                                      >
                                                                                                            <path
                                                                                                                  strokeLinecap="round"
                                                                                                                  strokeLinejoin="round"
                                                                                                                  strokeWidth={2}
                                                                                                                  d="M9 5l7 7-7 7"
                                                                                                            />
                                                                                                      </svg>
                                                                                                )}
                                                                                                <span className="text-sm font-medium">
                                                                                                      Details
                                                                                                </span>
                                                                                          </button>
                                                                                    </div>
                                                                                    {/* Action Buttons */}
                                                                                    <div className="flex gap-3 mt-4">
                                                                                          <button
                                                                                                onClick={() => openRescheduleModal(meeting)}
                                                                                                disabled={
                                                                                                      meeting.status === "canceled" ||
                                                                                                      !!actionLoading[meeting.uri]
                                                                                                }
                                                                                                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
                                                                                          >
                                                                                                <svg
                                                                                                      className="h-4 w-4"
                                                                                                      fill="none"
                                                                                                      stroke="currentColor"
                                                                                                      viewBox="0 0 24 24"
                                                                                                >
                                                                                                      <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            strokeWidth={2}
                                                                                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                                                                      />
                                                                                                </svg>
                                                                                                {actionLoading[meeting.uri]
                                                                                                      ? "Rescheduling..."
                                                                                                      : "Reschedule"}
                                                                                          </button>
                                                                                          <button
                                                                                                onClick={() => handleCancel(meeting)}
                                                                                                disabled={
                                                                                                      meeting.status === "canceled" ||
                                                                                                      !!actionLoading[meeting.uri]
                                                                                                }
                                                                                                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
                                                                                          >
                                                                                                <svg
                                                                                                      className="h-4 w-4"
                                                                                                      fill="none"
                                                                                                      stroke="currentColor"
                                                                                                      viewBox="0 0 24 24"
                                                                                                >
                                                                                                      <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            strokeWidth={2}
                                                                                                            d="M6 18L18 6M6 6l12 12"
                                                                                                      />
                                                                                                </svg>
                                                                                                {actionLoading[meeting.uri]
                                                                                                      ? "Cancelling..."
                                                                                                      : "Cancel"}
                                                                                          </button>
                                                                                          <button
                                                                                                onClick={() => openModal(meeting)}
                                                                                                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                                                                          >
                                                                                                <svg
                                                                                                      className="h-4 w-4"
                                                                                                      fill="none"
                                                                                                      stroke="currentColor"
                                                                                                      viewBox="0 0 24 24"
                                                                                                >
                                                                                                      <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            strokeWidth={2}
                                                                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                                                      />
                                                                                                      <path
                                                                                                            strokeLinecap="round"
                                                                                                            strokeLinejoin="round"
                                                                                                            strokeWidth={2}
                                                                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                                                      />
                                                                                                </svg>
                                                                                                View Details
                                                                                          </button>
                                                                                    </div>
                                                                                    {/* Expanded Details */}
                                                                                    {isExpanded && (
                                                                                          <div className="mt-6 pt-6 border-t border-gray-200 space-y-6 animate-slideDown">
                                                                                                {/* Invitee Info */}
                                                                                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl">
                                                                                                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                                                                            <svg
                                                                                                                  className="h-5 w-5 text-indigo-600"
                                                                                                                  fill="none"
                                                                                                                  stroke="currentColor"
                                                                                                                  viewBox="0 0 24 24"
                                                                                                            >
                                                                                                                  <path
                                                                                                                        strokeLinecap="round"
                                                                                                                        strokeLinejoin="round"
                                                                                                                        strokeWidth={2}
                                                                                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                                                                  />
                                                                                                            </svg>
                                                                                                            INVITEES
                                                                                                      </h4>
                                                                                                      {invitees === "loading" ? (
                                                                                                            <div>Loading invitees…</div>
                                                                                                      ) : invitees && invitees.length > 0 ? (
                                                                                                            invitees.map((inv) => (
                                                                                                                  <div
                                                                                                                        className="flex items-center gap-3 mb-3"
                                                                                                                        key={inv.uri}
                                                                                                                  >
                                                                                                                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                                                                                              {inv.name
                                                                                                                                    ? inv.name
                                                                                                                                          .split(" ")
                                                                                                                                          .map((s) => s[0])
                                                                                                                                          .join("")
                                                                                                                                          .toUpperCase()
                                                                                                                                    : "IN"}
                                                                                                                        </div>
                                                                                                                        <div>
                                                                                                                              <div className="font-semibold text-gray-900">
                                                                                                                                    {inv.name || "Unknown"}
                                                                                                                              </div>
                                                                                                                              <div className="text-gray-600 text-sm">
                                                                                                                                    {inv.email}
                                                                                                                              </div>
                                                                                                                        </div>
                                                                                                                  </div>
                                                                                                            ))
                                                                                                      ) : (
                                                                                                            <div>No invitees found.</div>
                                                                                                      )}
                                                                                                </div>
                                                                                                {/* Location Info */}
                                                                                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                                                                                                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                                                                            <svg
                                                                                                                  className="h-5 w-5 text-green-600"
                                                                                                                  fill="none"
                                                                                                                  stroke="currentColor"
                                                                                                                  viewBox="0 0 24 24"
                                                                                                            >
                                                                                                                  <path
                                                                                                                        strokeLinecap="round"
                                                                                                                        strokeLinejoin="round"
                                                                                                                        strokeWidth={2}
                                                                                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                                                                  />
                                                                                                                  <path
                                                                                                                        strokeLinecap="round"
                                                                                                                        strokeLinejoin="round"
                                                                                                                        strokeWidth={2}
                                                                                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                                                                  />
                                                                                                            </svg>
                                                                                                            LOCATION
                                                                                                      </h4>
                                                                                                      <p className="text-gray-700 mb-2">
                                                                                                            {locationType}
                                                                                                            {joinUrl && (
                                                                                                                  <>
                                                                                                                        <br />
                                                                                                                        <a
                                                                                                                              href={joinUrl}
                                                                                                                              target="_blank"
                                                                                                                              rel="noopener noreferrer"
                                                                                                                              className="text-green-700 underline"
                                                                                                                        >
                                                                                                                              Join now
                                                                                                                        </a>
                                                                                                                  </>
                                                                                                            )}
                                                                                                      </p>
                                                                                                </div>
                                                                                                {/* Host Info */}

                                                                                                <div className="text-xs text-gray-400 pt-2">
                                                                                                      Created{" "}
                                                                                                      {meeting.created_at
                                                                                                            ? new Date(
                                                                                                                  meeting.created_at
                                                                                                            ).toLocaleDateString()
                                                                                                            : "Recently"}
                                                                                                </div>
                                                                                          </div>
                                                                                    )}
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      );
                                                })}
                                          </div>
                                    </div>
                              );
                        })}
                        {filteredMeetings.length === 0 && (
                              <div className="text-center py-16">
                                    <div className="w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                          <svg
                                                className="h-12 w-12 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                          </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-100 mb-3">
                                          No meetings found
                                    </h3>
                                    <p className="text-gray-600 text-lg">
                                          Your {activeFilter} meetings will appear here.
                                    </p>
                              </div>
                        )}
                        {filteredMeetings.length > 0 && (
                              <div className="text-center py-8">
                                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium">
                                          <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                          >
                                                <path
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth={2}
                                                      d="M5 13l4 4L19 7"
                                                />
                                          </svg>
                                          {"You've reached the end of the list"}
                                    </div>
                              </div>
                        )}
                  </div>
                  {/* Modal */}
                  {modalOpen && selectedMeeting && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                                    <div className="p-6 border-b border-gray-200">
                                          <div className="flex items-center justify-between">
                                                <h2 className="text-2xl font-bold text-gray-900">
                                                      {selectedMeeting.name}
                                                </h2>
                                                <button
                                                      onClick={closeModal}
                                                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                                >
                                                      <svg
                                                            className="h-6 w-6 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M6 18L18 6M6 6l12 12"
                                                            />
                                                      </svg>
                                                </button>
                                          </div>
                                    </div>
                                    <div className="p-6 space-y-6">
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
                                                      <label className="block text-sm font-bold text-gray-900 mb-2">
                                                            Start Time
                                                      </label>
                                                      <p className="text-gray-800 font-medium">
                                                            {new Date(selectedMeeting.start_time).toLocaleString()}
                                                      </p>
                                                </div>
                                                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl">
                                                      <label className="block text-sm font-bold text-gray-900 mb-2">
                                                            End Time
                                                      </label>
                                                      <p className="text-gray-800 font-medium">
                                                            {new Date(selectedMeeting.end_time).toLocaleString()}
                                                      </p>
                                                </div>
                                          </div>
                                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
                                                <label className="block text-sm font-bold text-gray-900 mb-2">
                                                      Status
                                                </label>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                      {selectedMeeting.status || "Confirmed"}
                                                </span>
                                          </div>
                                          <div className="flex gap-3 pt-4">
                                                <button
                                                      onClick={closeModal}
                                                      className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                                                >
                                                      Close
                                                </button>
                                                <button className="flex-1 bg-white border-2 border-indigo-200 hover:border-indigo-400 text-indigo-600 hover:text-indigo-800 py-3 px-6 rounded-xl font-medium transition-all duration-200">
                                                      Edit Meeting
                                                </button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}
                  {/* Reschedule Modal */}
                  {showRescheduleModal && rescheduleMeeting && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                                    <div className="p-6 border-b border-gray-200">
                                          <div className="flex items-center justify-between">
                                                <h2 className="text-xl font-bold text-gray-900">
                                                      Reschedule Meeting
                                                </h2>
                                                <button
                                                      onClick={closeRescheduleModal}
                                                      className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                                >
                                                      <svg
                                                            className="h-6 w-6 text-gray-400"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                      >
                                                            <path
                                                                  strokeLinecap="round"
                                                                  strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M6 18L18 6M6 6l12 12"
                                                            />
                                                      </svg>
                                                </button>
                                          </div>
                                    </div>
                                    <div className="p-6 space-y-4">
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      New Date
                                                </label>
                                                <input
                                                      type="date"
                                                      value={newDate}
                                                      onChange={(e) => setNewDate(e.target.value)}
                                                      className="border-2 border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                                />
                                          </div>
                                          <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                      New Time
                                                </label>
                                                <input
                                                      type="time"
                                                      value={newTime}
                                                      onChange={(e) => setNewTime(e.target.value)}
                                                      className="border-2 border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                                />
                                          </div>
                                          <div className="flex gap-3 pt-2">
                                                <button
                                                      onClick={closeRescheduleModal}
                                                      className="flex-1 bg-gray-200 hover:bg-gray-300 rounded-lg py-2 text-gray-700 transition-colors duration-200"
                                                >
                                                      Cancel
                                                </button>
                                                <button
                                                      onClick={handleReschedule}
                                                      disabled={actionLoading[rescheduleMeeting.uri]}
                                                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg py-2 font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
                                                >
                                                      {actionLoading[rescheduleMeeting.uri]
                                                            ? "Rescheduling..."
                                                            : "Reschedule"}
                                                </button>
                                          </div>
                                          <div className="text-xs text-gray-500 pt-2">
                                                <strong>Note:</strong> Calendly API does not support direct rescheduling. This will cancel the meeting with a note to reschedule; you must create a new meeting for the new time.
                                          </div>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default Client_Meeting;
