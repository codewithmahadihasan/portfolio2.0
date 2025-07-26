import React from 'react';
import vectorHdr from '../../../Assctes/vectors/vector(header).png';
import Typewriter from 'typewriter-effect';
import { HiArrowSmallRight } from "react-icons/hi2";
import "animate.css/animate.min.css";
import homeVc from './company.json';
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';

const HeadSection = () => {
      return (
            <div className=" header-bg w-full md:pt-[100px] pt-[100px]     capitalize">

                  <div className="px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl  lg:px-8 ">
                        <div className="flex flex-col items-center justify-between w-full  lg:flex-row">
                              <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                                    <div className="max-w-xl mb-6">
                                          <div>
                                                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase bg-teal-400 text-teal-900 rounded-full">
                                                      <Typewriter
                                                            options={{
                                                                  strings: [
                                                                        'Enterprise Web Design & Development',
                                                                        'Custom Mobile App Development for Corporates',
                                                                        'Expert Software Consulting for Large Businesses',
                                                                        'Enterprise-grade Custom Software Solutions',
                                                                        'Advanced Point of Sale (POS) Systems for Enterprises',
                                                                        'Scalable E-commerce Platforms for Corporations',
                                                                        'Robust ERP Systems for Enterprise Management',
                                                                        'Comprehensive LMS Solutions for Organizations',
                                                                        'Tailored Software Solutions for Big Businesses',
                                                                        'Interactive E-learning Platforms for Enterprises'
                                                                  ],
                                                                  autoStart: true,
                                                                  loop: true,
                                                            }}
                                                      />
                                                </p>
                                          </div>
                                          <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl sm:leading-none max-w-lg mb-6">
                                                Envisioning the {" "}
                                                <span className="inline-block text-red-600">FUTURE,</span>
                                                <br className="" />
                                                Building the {""}
                                                <span className="inline-block text-[#F2D354]">SOFTWARE.</span>
                                          </h2>
                                          <p className="text-gray-300 text-base md:text-lg">We are a top software and IT solutions company in Bangladesh, delivering custom ERP, LMS, POS, CRM, and mobile/web apps tailored to your business needs.

                                          </p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                          <Link
                                                className="group flex items-center justify-between gap-4  border border-indigo-600 bg-indigo-600 px-10 py-3 transition-colors hover:bg-transparent focus:outline-none focus:ring"
                                                target="_blank"
                                                to="https://calendly.com/brightfuturesoft-bd/consultation"
                                          >
                                                <span
                                                      className="font-medium text-white transition-colors group-hover:text-indigo-600 group-active:text-indigo-500"
                                                >
                                                      Book an Appointment
                                                </span>


                                          </Link>

                                          {/* Border */}

                                          <Link
                                                className="group flex items-center justify-between gap-4  border border-current px-10 py-3 text-indigo-600 transition-colors hover:bg-indigo-600 focus:outline-none focus:ring active:bg-indigo-500"
                                                to='/all_project'
                                          >
                                                <span className="font-medium transition-colors group-hover:text-white">
                                                      Our  Portfolio
                                                </span>


                                          </Link>
                                    </div>
                              </div>
                              <div className="flex items-center justify-center lg:w-1/2">
                                    <Lottie className='lg:w-10/12' animationData={homeVc} loop={true} />
                              </div>
                        </div>

                  </div>
            </div>
      );
};

export default HeadSection;
