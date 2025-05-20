import React, { useState } from 'react';
import Link_Button from '../../shared/Link_Button';
import DeleteModal from '../../../Hook/DeleteModal';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { base_url } from '../../../layout/Title';
import { Link, useLocation, useParams } from 'react-router-dom';


const Apply_List = () => {
      const location = useLocation();
      // const queryParams = queryString.parse(location.search);
      // const { job_id } = queryParams;

      const [show, set_show] = useState(null)


      const { data: job_data = [], refetch, isLoading } = useQuery({
            queryKey: ["job_apply"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/job-post/get-job-apply${location.search}`,
                        {
                              headers: {
                                    'content-type': 'application/json',
                                    'author': 'bright_future_soft'
                              },
                              method: 'GET',
                        }
                  );
                  const data = await res.json();
                  return data.data;
            },
      });





      const [deleteId, setDeletId] = useState("");
      const [deletePopUp, setDeletePopUp] = useState(false);
      const [isDelete, setIsDelete] = useState(false);

      const delete_meeting = (id) => {
            setDeletePopUp(true);
            setDeletId(id);
      };

      if (isDelete) {
            fetch(`${base_url}/job-post/delete-job-apply?job_apply_id=${deleteId}`, {
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


      const stripHtmlTags = (html) => {
            // Create a new DOM parser
            const doc = new DOMParser().parseFromString(html, 'text/html');
            const unwantedTags = ['style', 'title'];
            unwantedTags.forEach(tag => {
                  const elements = doc.getElementsByTagName(tag);
                  while (elements.length) {
                        elements[0].parentNode.removeChild(elements[0]);
                  }
            });

            // Get plain text from the document body
            return doc.body.textContent || '';
      };

      // Example usage in JSX
      // const descriptionText = ;
      // const truncatedText = descriptionText.split(' ').slice(0, 10).join(' ');


      return (
            <div>
                  <div class="py-12  sm:py-16 lg:py-20">
                        <div class="px-4  sm:px-6 lg:px-8">
                              <Link_Button name={'Back Job Post'} url={'/dashboard/job-management'} />
                              <div class=" ">
                                    <div class="overflow-hidden rounded-xl">
                                          <div class="py-6">
                                                <div class="sm:flex sm:items-start sm:justify-between">
                                                      <div>
                                                            <p class="text-lg font-bold text-gray-100">Job Application Management</p>
                                                            <p class="mt-1 text-sm font-medium text-gray-500">Here is all apply information</p>
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



                                          <div class="flow-root mt-8">
                                                <div class="-my-5 divide-y divide-gray-200">
                                                      {Array.isArray(job_data) && job_data?.map((job) => (
                                                            <div key={job._id} class="py-5">
                                                                  <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                                        <div class="flex items-center flex-1 min-w-0">
                                                                              <p class="text-sm font-bold text-gray-100 truncate ">{job?.full_name}</p>


                                                                        </div>
                                                                        <div class="flex-1 min-w-0 ml-4 ">
                                                                              <p className="text-sm font-bold text-gray-100 truncate">{job?.email_address}</p>
                                                                              <p class="mt-1 text-sm font-medium text-gray-500 truncate">{job?.phone_number}</p>
                                                                        </div>
                                                                        <div class="flex-1 min-w-0 ml-4 ">
                                                                              <p class="text-sm font-bold text-gray-100 truncate ">{job?.salary_expectation} BDT</p>
                                                                              <p className="mt-1 text-sm font-medium text-gray-500 truncate">Experience: {job.experience_in_years} Years</p>
                                                                        </div>

                                                                        <div class="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                                                              <a
                                                                                    href={job?.resume}
                                                                                    title="Resume"
                                                                                    className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-500"
                                                                                    target="_blank"
                                                                                    rel="noopener noreferrer"
                                                                              >
                                                                                    Resume
                                                                              </a>
                                                                              <button
                                                                                    onClick={() => set_show(job)}
                                                                                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                                                              >
                                                                                    View Application
                                                                              </button>
                                                                              <div className=''>
                                                                                    <div className="flex gap-3 items-center  ">

                                                                                          <a

                                                                                                target='_blank'
                                                                                                type="button"
                                                                                                className="inline-flex whitespace-nowrap items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                                                                                          >
                                                                                                Edit
                                                                                          </a>

                                                                                          <button
                                                                                                onClick={() => delete_meeting(job._id)}
                                                                                                type="button"
                                                                                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-red-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-red-700"
                                                                                          >
                                                                                                Delete
                                                                                          </button>


                                                                                    </div>

                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      ))
                                                      }
                                                </div>
                                          </div>
                                          {show && (
                                                <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm transition-opacity duration-300">
                                                      <div className="flex items-center justify-center min-h-screen p-4">
                                                            <div
                                                                  className="relative bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-0 transform transition-all duration-300 scale-100 opacity-100"
                                                                  style={{ animation: "modal-pop 0.3s ease-out" }}
                                                            >
                                                                  {/* Header with gradient */}
                                                                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-2xl p-6">
                                                                        <div className="flex justify-between items-center">
                                                                              <h2 className="text-xl font-bold text-white">Job Application Details</h2>
                                                                              <button onClick={() => set_show(null)} className="text-white hover:text-gray-200 transition-colors">
                                                                                    <svg
                                                                                          xmlns="http://www.w3.org/2000/svg"
                                                                                          className="h-6 w-6"
                                                                                          fill="none"
                                                                                          viewBox="0 0 24 24"
                                                                                          stroke="currentColor"
                                                                                    >
                                                                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                                    </svg>
                                                                              </button>
                                                                        </div>
                                                                  </div>

                                                                  {/* Content */}
                                                                  <div className="p-6">
                                                                        <div className="space-y-6">
                                                                              <div className="flex items-center space-x-3">
                                                                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                                                                                          <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                className="h-5 w-5 text-purple-600 dark:text-purple-400"
                                                                                                viewBox="0 0 20 20"
                                                                                                fill="currentColor"
                                                                                          >
                                                                                                <path
                                                                                                      fillRule="evenodd"
                                                                                                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                                                                      clipRule="evenodd"
                                                                                                />
                                                                                          </svg>
                                                                                    </div>
                                                                                    <div>
                                                                                          <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                                                                          <p className="font-medium text-gray-900 dark:text-white">{show.full_name}</p>
                                                                                    </div>
                                                                              </div>

                                                                              <div className="flex items-center space-x-3">
                                                                                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                                                                                          <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                                                                                                viewBox="0 0 20 20"
                                                                                                fill="currentColor"
                                                                                          >
                                                                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                                                          </svg>
                                                                                    </div>
                                                                                    <div>
                                                                                          <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                                                                          <p className="font-medium text-gray-900 dark:text-white">{show.email_address}</p>
                                                                                    </div>
                                                                              </div>

                                                                              <div className="flex items-center space-x-3">
                                                                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                                                                          <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                                                                                                viewBox="0 0 20 20"
                                                                                                fill="currentColor"
                                                                                          >
                                                                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                                                          </svg>
                                                                                    </div>
                                                                                    <div>
                                                                                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                                                                                          <p className="font-medium text-gray-900 dark:text-white">{show.phone_number}</p>
                                                                                    </div>
                                                                              </div>

                                                                              <div className="flex items-center space-x-3">
                                                                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                                                                          <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                className="h-5 w-5 text-green-600 dark:text-green-400"
                                                                                                viewBox="0 0 20 20"
                                                                                                fill="currentColor"
                                                                                          >
                                                                                                <path
                                                                                                      fillRule="evenodd"
                                                                                                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                                                                                      clipRule="evenodd"
                                                                                                />
                                                                                          </svg>
                                                                                    </div>
                                                                                    <div>
                                                                                          <p className="text-sm text-gray-500 dark:text-gray-400">Salary Expectation</p>
                                                                                          <p className="font-medium text-gray-900 dark:text-white">{show.salary_expectation}</p>
                                                                                    </div>
                                                                              </div>

                                                                              <div className="flex items-center space-x-3">
                                                                                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                                                                          <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                className="h-5 w-5 text-yellow-600 dark:text-yellow-400"
                                                                                                viewBox="0 0 20 20"
                                                                                                fill="currentColor"
                                                                                          >
                                                                                                <path
                                                                                                      fillRule="evenodd"
                                                                                                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                                                                      clipRule="evenodd"
                                                                                                />
                                                                                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                                                                          </svg>
                                                                                    </div>
                                                                                    <div>
                                                                                          <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                                                                                          <p className="font-medium text-gray-900 dark:text-white">{show.experience_in_years} Years</p>
                                                                                    </div>

                                                                              </div>

                                                                              <div>
                                                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Why Apply</p>
                                                                                    <p className="font-medium text-gray-900 dark:text-white">{show.why}</p>
                                                                              </div>
                                                                        </div>

                                                                        {/* Actions */}
                                                                        <div className="mt-8 flex space-x-3">
                                                                              <button
                                                                                    onClick={() => set_show(null)}
                                                                                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                                                              >
                                                                                    Close
                                                                              </button>
                                                                              <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                                                                                    Contact Applicant
                                                                              </button>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          )}

                                          {/* CSS for animation */}
                                          <style jsx>{`
        @keyframes modal-pop {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>


                                    </div>
                              </div>

                        </div>
                  </div>
            </div>
      );
};


export default Apply_List;
