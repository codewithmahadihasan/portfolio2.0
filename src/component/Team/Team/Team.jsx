import React, { useRef, useState } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import mahadi from '../../../Assctes/teamMember/mahadi.jpg';
import hadi from '../../../Assctes/teamMember/mohotasimhadi.jpeg';
import acccountManager from '../../../Assctes/teamMember/accountManager.jpeg';
import sarwar from '../../../Assctes/teamMember/Sarwar.png';
import shishir from '../../../Assctes/teamMember/shishir_vai.png'
import riky from '../../../Assctes/teamMember/riky.png'
import mursed from '../../../Assctes/teamMember/mursed.jpg'
import mahady from '../../../Assctes/teamMember/mahady.png'
import anik from '../../../Assctes/teamMember/anik.jpeg'
import jabbar from '../../../Assctes/teamMember/jabbar.jpeg'
import summon from '../../../Assctes/teamMember/summon.jpeg'
import aysha from '../../../Assctes/teamMember/aysha.jpg'
import nowshin from '../../../Assctes/teamMember/nowshin.jpeg'
import nahid from '../../../Assctes/teamMember/nahid.jpeg'
import abir from '../../../Assctes/teamMember/abir.jpeg';
import lamim from '../../../Assctes/teamMember/pronoy.png'




import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { AiFillLinkedin } from "react-icons/ai";
import { base_url } from "../../../layout/Title";
import { useQuery } from "@tanstack/react-query";

const Team = () => {

      const {
            data: teamMembers = [],
            refetch,
            isLoading,
      } = useQuery({
            queryKey: ["all_users"],
            queryFn: async () => {
                  const res = await fetch(`${base_url}/auth/all`, {
                        headers: {
                              "content-type": "application/json",
                              author: "bright_future_soft",
                        },
                        method: "GET",
                  })
                  const data = await res.json()
                  return data.data
            },
      })

      return (
            <div className=" team-bg">
                  <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                        <h1 className="text-xl  font-bold relative after:absolute after:left-0 after:right-0 after:bottom-[-18px] after:w-[60px] after:rounded-full after:h-[6px] after:bg-[#0095ff] after:mx-auto text-center text-white">Our <span className="shadow-tx">Team</span></h1>

                        <Swiper
                              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                              pagination={{ clickable: true }}

                              breakpoints={{
                                    320: {
                                          slidesPerView: 1,
                                          spaceBetween: 20,
                                    },
                                    360: {
                                          slidesPerView: 1,
                                          spaceBetween: 20,
                                    },
                                    480: {
                                          slidesPerView: 1,
                                          spaceBetween: 20,
                                    },
                                    640: {
                                          slidesPerView: 1,
                                          spaceBetween: 20,
                                    },
                                    768: {
                                          slidesPerView: 2,
                                          spaceBetween: 40,
                                    },
                                    1024: {
                                          slidesPerView: 4,
                                          spaceBetween: 50,
                                    },
                              }}
                              spaceBetween={50}
                              slidesPerView={4}
                              onSlideChange={() => { }}
                              onSwiper={(swiper) => { }}>

                              {
                                    teamMembers.map(tData =>
                                          <SwiperSlide key={tData.id} className="cursor-grab">
                                                <div className=" py-[100px] px-2">
                                                      <div className="cart-box  p-2 bg-[#1d1e37bc] border-2 border-[#0059ff] rounded-xl h-[320px]">
                                                            <div style={{ backgroundImage: `url("${tData?.image}")`, backgroundSize: "cover" }} className="cart-header rounded-[20px]   w-[200px] h-[200px] mx-auto mt-[-40px] i-box">
                                                            </div>
                                                            <div className="body pb-4">
                                                                  <h2 className="text-white font-semibold mt-2">{tData?.name}</h2>
                                                                  <p className="text-[14px] text-[#1becff]">{tData.post}</p>
                                                                  <small className="text-sm text-gray-400">{tData?.email}</small>
                                                                  <Link to={tData.linkedin} target="_blank">
                                                                        <AiFillLinkedin className="text-4xl mt-4 m-auto text-[#1e6dff]" />
                                                                  </Link>
                                                            </div>
                                                      </div>
                                                </div>
                                          </SwiperSlide>)
                              }

                        </Swiper>
                  </div>


            </div>
      );
};

export default Team;
