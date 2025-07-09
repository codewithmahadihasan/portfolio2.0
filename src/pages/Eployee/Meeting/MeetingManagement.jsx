import React, { useContext, useState } from 'react';
import Link_Button from '../../shared/Link_Button';
import { useQuery } from '@tanstack/react-query';
import { base_url } from '../../../layout/Title';
import DeleteModal from '../../../Hook/DeleteModal';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../context/UseContext/UseContext';


const MeetingManagement = () => {

      const { user } = useContext(AuthContext);
      console.log(user);

      // console.log(`${base_url}/meeting/get-meetings?email=${user?.email}`,);

      const { data: meting_data = [], refetch, isLoading } = useQuery({
            queryKey: ['meting_data', user?.email], // Add email to the queryKey for proper caching
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/meeting/get-meetings?email=${user?.email}`,
                        {
                              headers: {
                                    'content-type': 'application/json',
                                    'author': 'bright_future_soft',
                              },
                              method: 'GET',
                        }
                  );
                  const data = await res.json();
                  return data.data;
            },
            enabled: !!user?.email, // Ensures it's not null/undefined/empty string
      });


      const handleStatusUpdate = (status, id) => {

            fetch(`${base_url}/meeting/edit-meeting?meeting_id=${id}`, {
                  method: 'PUT',
                  headers: {
                        'content-type': 'application/json',
                        'author': 'bright_future_soft'
                  },
                  body: JSON.stringify({ status: status, })
            })
                  .then(res => res.json())
                  .then(data => {
                        if (data.success) {
                              Swal.fire(data.message, ' ', 'success')
                              refetch()


                        }
                        else {
                              Swal.fire(data.message, '', 'info')
                        }
                  })
      }




      const [deleteId, setDeletId] = useState("");
      const [deletePopUp, setDeletePopUp] = useState(false);
      const [isDelete, setIsDelete] = useState(false);

      const delete_meeting = (id) => {
            setDeletePopUp(true);
            setDeletId(id);
      };

      if (isDelete) {
            fetch(`${base_url}/meeting/delete-meeting?meeting_id=${deleteId}`, {
                  headers: {
                        'content-type': 'application/json',
                        'author': 'bright_future_soft'
                  },
                  method: 'DELETE'
            }).then(res => res.json())
                  .then(data => {
                        if (data.success) {
                              Swal.fire(data.message, ' ', 'success')
                              refetch()
                              setIsDelete(false);
                              setDeletId("");
                        }
                        else {
                              Swal.fire(data.message, '', 'info')
                        }
                  })

      }

      const [dropdownOpen, setDropdownOpen] = useState(false)


      return (
            <div>
                  <div class="py-12  sm:py-16 lg:py-20">
                        <div class="px-4  sm:px-6 lg:px-8">

                              <Link_Button name={'Add New Meeting'} url={'/dashboard/meeting_management/new'} />
                              <div class=" ">
                                    <div class="overflow-hidden rounded-xl">
                                          <div class="py-6">
                                                <div class="sm:flex sm:items-start sm:justify-between">
                                                      <div>
                                                            <p class="text-lg font-bold text-gray-100">Meeting Management</p>
                                                            <p class="mt-1 text-sm font-medium text-gray-500">Here is all meeting information</p>
                                                      </div>


                                                </div>
                                          </div>

                                          <div className="h-0 w-0">
                                                {" "}
                                                <DeleteModal
                                                      setOpenModal={setDeletePopUp}
                                                      OpenModal={deletePopUp}
                                                      setIsDelete={setIsDelete}
                                                />
                                          </div>

                                          <div className=" p-6 px-0">

                                                <div className="space-y-4">
                                                      {
                                                            meting_data?.map((meeting) => {
                                                                  const dateTime = new Date(meeting?.date);
                                                                  const formattedDate = dateTime.toLocaleDateString('en-US', {
                                                                        weekday: 'long',
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric'
                                                                  });
                                                                  const formattedTime = dateTime.toLocaleTimeString('en-US', {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                        hour12: true
                                                                  });




                                                                  const getStatusColor = (status) => {
                                                                        switch (status) {
                                                                              case "pending":
                                                                                    return "bg-amber-100 text-amber-800 border-amber-200"
                                                                              case "process":
                                                                                    return "bg-emerald-100 text-emerald-800 border-emerald-200"
                                                                              case "end":
                                                                                    return "bg-red-100 text-red-800 border-red-200"
                                                                              default:
                                                                                    return "bg-gray-100 text-gray-800 border-gray-200"
                                                                        }
                                                                  }

                                                                  const getStatusDotColor = (status) => {
                                                                        switch (status) {
                                                                              case "pending":
                                                                                    return "text-amber-500"
                                                                              case "process":
                                                                                    return "text-emerald-500"
                                                                              case "end":
                                                                                    return "text-red-500"
                                                                              default:
                                                                                    return "text-gray-500"
                                                                        }
                                                                  }

                                                                  const isManager = user?.designation === "Chief Executive Officer" || user?.designation === "manager"
                                                                  const isParticipant = meeting?.selectedUsers?.some((participant) => participant?.email === user?.email)



                                                                  return (
                                                                        <div className="border border-gray-400 rounded-xl text-white p-6 mb-6">
                                                                              <div className="flex items-start justify-between">
                                                                                    {/* Meeting Info */}
                                                                                    <div className="flex-1 min-w-0">
                                                                                          <div className="flex items-start justify-between mb-4">
                                                                                                <div className="flex-1">
                                                                                                      <h3 className="text-lg font-semibold  mb-1">{meeting?.title}</h3>
                                                                                                      <p className="text-sm text-gray-300 mb-3" dangerouslySetInnerHTML={{ __html: meeting?.agenda }}></p>

                                                                                                      {/* Status Badge */}
                                                                                                      <div className="inline-flex items-center">
                                                                                                            <span
                                                                                                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(meeting?.status)}`}
                                                                                                            >
                                                                                                                  <svg
                                                                                                                        className={`w-2 h-2 mr-1.5 ${getStatusDotColor(meeting?.status)}`}
                                                                                                                        fill="currentColor"
                                                                                                                        viewBox="0 0 8 8"
                                                                                                                  >
                                                                                                                        <circle cx="4" cy="4" r="3" />
                                                                                                                  </svg>
                                                                                                                  {meeting?.status}
                                                                                                            </span>
                                                                                                      </div>
                                                                                                </div>

                                                                                                {/* Actions Dropdown */}
                                                                                                <div className="relative ml-4 ">
                                                                                                      <button
                                                                                                            onClick={() => setDropdownOpen(meeting?._id)}
                                                                                                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                                                                                      >
                                                                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                                                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                                                            </svg>
                                                                                                      </button>

                                                                                                      {dropdownOpen === meeting?._id && (
                                                                                                            <>
                                                                                                                  {/* Backdrop */}
                                                                                                                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />

                                                                                                                  {/* Dropdown Menu */}
                                                                                                                  <div className="absolute z-50 right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 ">
                                                                                                                        {/* Go Meeting - Always visible for participants */}
                                                                                                                        {(isManager || isParticipant) && (
                                                                                                                              <a
                                                                                                                                    href={meeting?.link}
                                                                                                                                    target="_blank"
                                                                                                                                    rel="noopener noreferrer"
                                                                                                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                                                                                                              >
                                                                                                                                    <svg
                                                                                                                                          className="w-4 h-4 mr-3 text-blue-500"
                                                                                                                                          fill="none"
                                                                                                                                          stroke="currentColor"
                                                                                                                                          viewBox="0 0 24 24"
                                                                                                                                    >
                                                                                                                                          <path
                                                                                                                                                strokeLinecap="round"
                                                                                                                                                strokeLinejoin="round"
                                                                                                                                                strokeWidth={2}
                                                                                                                                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                                                                                                          />
                                                                                                                                    </svg>
                                                                                                                                    Join Meeting
                                                                                                                              </a>
                                                                                                                        )}

                                                                                                                        {/* Manager-only actions */}
                                                                                                                        {isManager && (
                                                                                                                              <>

                                                                                                                                    <button
                                                                                                                                          onClick={() => {
                                                                                                                                                handleStatusUpdate("end", meeting._id)
                                                                                                                                                setDropdownOpen(false)
                                                                                                                                          }}
                                                                                                                                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                                                                                                                                    >
                                                                                                                                          <svg
                                                                                                                                                className="w-4 h-4 mr-3 text-gray-500"
                                                                                                                                                fill="none"
                                                                                                                                                stroke="currentColor"
                                                                                                                                                viewBox="0 0 24 24"
                                                                                                                                          >
                                                                                                                                                <path
                                                                                                                                                      strokeLinecap="round"
                                                                                                                                                      strokeLinejoin="round"
                                                                                                                                                      strokeWidth={2}
                                                                                                                                                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                                                                                />
                                                                                                                                                <path
                                                                                                                                                      strokeLinecap="round"
                                                                                                                                                      strokeLinejoin="round"
                                                                                                                                                      strokeWidth={2}
                                                                                                                                                      d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                                                                                                                                                />
                                                                                                                                          </svg>
                                                                                                                                          End Meeting
                                                                                                                                    </button>

                                                                                                                                    <hr className="my-1 border-gray-200" />

                                                                                                                                    <button
                                                                                                                                          onClick={() => {
                                                                                                                                                delete_meeting(meeting._id)
                                                                                                                                                setDropdownOpen(false)
                                                                                                                                          }}
                                                                                                                                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                                                                                                                                    >
                                                                                                                                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                                                <path
                                                                                                                                                      strokeLinecap="round"
                                                                                                                                                      strokeLinejoin="round"
                                                                                                                                                      strokeWidth={2}
                                                                                                                                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                                                                                                />
                                                                                                                                          </svg>
                                                                                                                                          Delete Meeting
                                                                                                                                    </button>
                                                                                                                              </>
                                                                                                                        )}
                                                                                                                  </div>
                                                                                                            </>
                                                                                                      )}
                                                                                                </div>
                                                                                          </div>

                                                                                          {/* Meeting Details */}
                                                                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                                                {/* Duration */}
                                                                                                <div className="flex items-center text-sm text-gray-300">
                                                                                                      <svg className="w-4 h-4 mr-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                            <path
                                                                                                                  strokeLinecap="round"
                                                                                                                  strokeLinejoin="round"
                                                                                                                  strokeWidth={2}
                                                                                                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                                            />
                                                                                                      </svg>
                                                                                                      <span className="font-medium">{meeting?.duration} Minutes </span>
                                                                                                </div>

                                                                                                {/* Date & Time */}
                                                                                                <div className="flex items-center text-sm text-gray-600">
                                                                                                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                            <path
                                                                                                                  strokeLinecap="round"
                                                                                                                  strokeLinejoin="round"
                                                                                                                  strokeWidth={2}
                                                                                                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                                                            />
                                                                                                      </svg>
                                                                                                      <span>
                                                                                                            {formattedDate} at {formattedTime}
                                                                                                      </span>
                                                                                                </div>

                                                                                                {/* Participants */}
                                                                                                <div className="flex items-center">
                                                                                                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                            <path
                                                                                                                  strokeLinecap="round"
                                                                                                                  strokeLinejoin="round"
                                                                                                                  strokeWidth={2}
                                                                                                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                                                                                            />
                                                                                                      </svg>
                                                                                                      <div className="flex -space-x-2">
                                                                                                            {meeting?.selectedUsers?.slice(0, 4).map((participant, index) => (
                                                                                                                  <img
                                                                                                                        key={index}
                                                                                                                        title={participant?.name}
                                                                                                                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                                                                                                        src={participant.image || "/placeholder.svg"}
                                                                                                                        alt={participant?.name}
                                                                                                                  />
                                                                                                            ))}
                                                                                                            {meeting?.selectedUsers?.length > 4 && (
                                                                                                                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600">
                                                                                                                        +{meeting.selectedUsers.length - 4}
                                                                                                                  </div>
                                                                                                            )}
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  )
                                                            })
                                                      }


                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default MeetingManagement;
