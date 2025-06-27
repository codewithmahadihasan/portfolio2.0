import React, { useState } from 'react';
import Link_Button from '../../shared/Link_Button';
import DeleteModal from '../../../Hook/DeleteModal';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { base_url } from '../../../layout/Title';
import { Link } from 'react-router-dom';
import JoditEditor from 'jodit-react';

const JobManagement = () => {

      const { data: job_data = [], refetch, isLoading } = useQuery({
            queryKey: ["job_data"],
            queryFn: async () => {
                  const res = await fetch(
                        `${base_url}/job-post/all-job`,
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
      const [edit_job, setEditJob] = useState(false);

      const delete_meeting = (id) => {
            setDeletePopUp(true);
            setDeletId(id);
      };

      if (isDelete) {
            fetch(`${base_url}/job-post/delete-job?job_post_id=${deleteId}`, {
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



      const jobForm = (e) => {
            e.preventDefault();
            const form = e.target;
            const job_position = form.job_position.value
            const job_type = form.job_type.value
            const workplace = form.workplace.value
            const vacancy = form.vacancy.value
            const description = form.description.value
            const last_date = form.last_date.value
            const jobData = {
                  job_position,
                  job_type,
                  workplace,
                  vacancy,
                  description,
                  dateline: last_date
            }

            fetch(`${base_url}/job-post/update-job?job_post_id=${edit_job._id}`, {
                  method: 'PUT',
                  headers: {
                        'content-type': 'application/json',
                        'author': 'bright_future_soft'
                  },
                  body: JSON.stringify(jobData),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        Swal.fire('Job Post Update Successfully', ' ', 'success')
                        form.reset()
                        setEditJob(false)
                        refetch()

                  })

      }


      console.log(edit_job, 'edit_job');

      return (
            <div>
                  <div class="py-12  sm:py-16 lg:py-20">
                        <div class="px-4  sm:px-6 lg:px-8">
                              <Link_Button name={'Add New Job Post'} url={'/dashboard/job-management/new'} />
                              <div class=" ">
                                    <div class="overflow-hidden rounded-xl">
                                          <div class="py-6">
                                                <div class="sm:flex sm:items-start sm:justify-between">
                                                      <div>
                                                            <p class="text-lg font-bold text-gray-100">Job Post Management</p>
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
                                          {/* job_position,
                            job_type,
                            workplace,
                            vacancy,
                            description */}


                                          <div class="flow-root mt-8">
                                                <div class="-my-5 divide-y divide-gray-200">
                                                      {job_data?.map((job) => (
                                                            <div key={job._id} class="py-5">
                                                                  <div class="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                                        <div class="flex items-center flex-1 min-w-0">
                                                                              <p class="text-sm font-bold text-gray-100 truncate ">{job?.job_position}</p>


                                                                        </div>
                                                                        <div class="flex-1 min-w-0 ml-4 ">
                                                                              <p className="text-sm font-bold text-gray-100 truncate">{job?.workplace}</p>
                                                                              <p class="mt-1 text-sm font-medium text-gray-500 truncate">{job?.vacancy}</p>
                                                                        </div>
                                                                        <div class="flex-1 min-w-0 ml-4 ">
                                                                              <p class="text-sm font-bold text-gray-100 truncate ">{job?.job_type}</p>
                                                                              <p className="mt-1 text-sm font-medium text-gray-500 truncate">Apply: {job.application_count ?? 0}</p>
                                                                        </div>

                                                                        <div class="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                                                              <Link to={`/dashboard/job-management/apply_list?job_post_id=${job._id}`} title="" class="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-500"> Apply List </Link>

                                                                              <div className=''>
                                                                                    <div className="flex gap-3 items-center  ">

                                                                                          <button
                                                                                                onClick={() => setEditJob(job)}
                                                                                                type="button"
                                                                                                className="inline-flex whitespace-nowrap items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                                                                                          >
                                                                                                Edit
                                                                                          </button>

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
                                                      {edit_job && (
                                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                                                  <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
                                                                        <form onSubmit={jobForm} className='w-full'>
                                                                              <div className="flex justify-between items-center mb-4">
                                                                                    <h1 className='text-2xl font-bold text-white'>Edit Job Post</h1>
                                                                                    <button
                                                                                          type="button"
                                                                                          onClick={() => setEditJob(false)}
                                                                                          className="text-white text-2xl font-bold hover:text-red-500"
                                                                                    >
                                                                                          &times;
                                                                                    </button>
                                                                              </div>

                                                                              <input defaultValue={edit_job?.job_position} className='w-full my-2 rounded p-2 text-black' name='job_position' placeholder='Job Position' type="text" />
                                                                              <input value={edit_job?.job_type} className='w-full my-2 rounded p-2 text-black' name='job_type' placeholder='Job Type' type="text" />
                                                                              <input value={edit_job?.workplace} className='w-full my-2 rounded p-2 text-black' name='workplace' placeholder='Workplace Type' type="text" />
                                                                              <input value={edit_job?.vacancy} className='w-full my-2 rounded p-2 text-black' name='vacancy' placeholder='Vacancy' type="text" />
                                                                              <input value={edit_job?.dateline} className='w-full my-2 rounded p-2 text-black' name='last_date' placeholder='Last Date' type="date" />

                                                                              <div className='my-4'>
                                                                                    <JoditEditor config={{
                                                                                          readonly: false,
                                                                                          theme: 'dark',
                                                                                          style: {
                                                                                                backgroundColor: '#000',
                                                                                                color: '#fff'
                                                                                          }
                                                                                    }} value={edit_job?.description} name='description' className='rounded bg-dark text-white jodit-editor' />
                                                                              </div>

                                                                              <button
                                                                                    type='submit'
                                                                                    className="group flex items-center justify-center gap-4 w-full border border-indigo-600 bg-indigo-600 px-10 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                                                                              >
                                                                                    <span className="font-medium text-white group-hover:text-indigo-600 group-active:text-indigo-500">
                                                                                          Submit
                                                                                    </span>
                                                                              </button>
                                                                        </form>
                                                                  </div>
                                                            </div>
                                                      )}


                                                </div>
                                          </div>



                                    </div>
                              </div>

                        </div>
                  </div>
            </div>
      );
};


export default JobManagement;
