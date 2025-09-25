import React, { useEffect, useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import "swiper/swiper-bundle.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from "swiper/react";
import mahadi from '../../../Assctes/teamMember/mahadi.jpg';
import hadi from '../../../Assctes/teamMember/mohotasimhadi.jpeg';
import acccountManager from '../../../Assctes/teamMember/accountManager.jpeg';
import sarwar from '../../../Assctes/teamMember/Sarwar.png';
import nahid from '../../../Assctes/teamMember/nahid.jpeg';
import shishir from '../../../Assctes/teamMember/shishir_vai.png'
import riky from '../../../Assctes/teamMember/riky.png'
import mursed from '../../../Assctes/teamMember/mursed.jpg'
import mahady from '../../../Assctes/teamMember/mahady.png'
import anik from '../../../Assctes/teamMember/anik.jpeg'
// import jannatul from '../../../Assctes/teamMember/jannatul.jpeg'
import jabbar from '../../../Assctes/teamMember/jabbar.jpeg'
import summon from '../../../Assctes/teamMember/summon.jpeg'
import aysha from '../../../Assctes/teamMember/aysha.jpg'
import nowshin from '../../../Assctes/teamMember/nowshin.jpeg'
import abir from '../../../Assctes/teamMember/abir.jpeg'
import lamim from '../../../Assctes/teamMember/pronoy.png'
// import sumon from '../../../Assctes/teamMember/sumon.jpg'

import un from '../../../Assctes/teamMember/unknown.svg'
import { HiOutlineMicrophone } from 'react-icons/hi2';
import Service from '../../Service/Service/Service';
import Testimonials from '../../Testimonials/Testimonials/Testimonials';
import Contact from '../../Contact/Contact/Contact';
import Title, { base_url } from '../../../layout/Title';
import Team from '../../Team/Team/Team';
import { AiFillLinkedin } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import homeVc from '../../../Assctes/vectors/App Development.json';
import { Faq } from './Faq';
import { OurProjects } from '../Projects';
import MetaTitle from '../../../layout/Title';
import logo from '../../../Assctes/logo.png';
import { useQuery } from '@tanstack/react-query';

const About = () => {
      const [swiperRef, setSwiperRef] = useState(null);

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



      // const teamMembers = [
      //       {
      //             "id": 0,
      //             "img": mahadi,
      //             "name": "Mahadi Hasan",
      //             "email": "ceo@brightfuturesoft.com",
      //             "post": "CEO and founder",
      //             "linkedIn": "https://www.linkedin.com/in/codewithmahadihasan/",
      //             "gender": "male"
      //       },

      //       {
      //             "id": 1,
      //             "img": shishir,
      //             "name": "Md Ibrahim Kholil",
      //             "email": "manager@brightfuturesoft.com",
      //             "post": "Project Manager & HR Head",
      //             "linkedIn": "https://www.linkedin.com/in/shishirkholil/",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 2,
      //             "img": hadi,
      //             "name": "Mohotasim Hadi",
      //             "email": "advisor@brightfuturesoft.com",
      //             "post": "Advisor",
      //             "linkedIn": "https://www.linkedin.com/in/mohtasimhadi/",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 3,
      //             "img": mahady,
      //             "name": "Mahady Hasan",
      //             "email": "crm@brightfuturesoft.com",
      //             "post": "Client Relationship Manager",
      //             "linkedIn": "https://www.linkedin.com/in/mhasan878/",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 4,
      //             "img": lamim,
      //             "name": "Lamim Zakir Pronay",
      //             "email": "pm@brightfuturesoft.com",
      //             "post": "Product Manager",
      //             "linkedIn": "https://www.linkedin.com/in/lamim-zakir-pronay/",
      //             "gender": "male"
      //       },

      //       {
      //             "id": 5,
      //             "img": acccountManager,
      //             "name": "Regita Redhe",
      //             "email": "redhe@brightfuturesoft.com",
      //             "post": "Account Manager",
      //             "linkedIn": "https://www.linkedin.com/in/regita-redhe-30b357271/",
      //             "gender": "female"
      //       },
      //       {
      //             "id": 6,
      //             "img": summon,
      //             "name": "Md Sumon Shorker",
      //             "email": "sumon@brightfuturesoft.com",
      //             "post": "Lead and Sales Executive",
      //             "linkedIn": "https://www.linkedin.com/in/md-sumon-shorkar/",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 7,
      //             "img": nowshin,
      //             "name": "Nowshin Jahan",
      //             "email": "nowshin@brightfuturesoft.com",
      //             "post": "Lead and Sales Executive",
      //             "linkedIn": "https://www.linkedin.com/in/nowshinjahan/",
      //             "gender": "female"
      //       },
      //       {
      //             "id": 8,
      //             "img": abir,
      //             "name": "Abir Hassan Tonmoy",
      //             "email": "abir@brightfuturesoft.com",
      //             "post": "Lead and Sales Executive",
      //             "linkedIn": "https://www.linkedin.com/in/abir-hassan-tonmoy-1724b5232/",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 9,
      //             "img": anik,
      //             "name": "Md. Mahtab Uddin Anik",
      //             "email": "anik@brightfuturesoft.com",
      //             "post": "Lead and Sales Executive",
      //             "linkedIn": "https://www.linkedin.com/in/mahtab-anik",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 10,
      //             "img": jabbar,
      //             "name": "Md Jabbar Hosen",
      //             "email": "jabbar@brightfuturesoft.com",
      //             "post": "Lead and Sales Executive",
      //             "linkedIn": "https://www.linkedin.com/in/md-jabbar-hosen/",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 11,
      //             "img": aysha,
      //             "name": "Ayesha Rahman",
      //             "email": "ayesha@brightfuturesoft.com",
      //             "post": "Lead and Sales Executive",
      //             "linkedIn": "https://www.linkedin.com/in/ayesha-rahman-a78b631b2/",
      //             "gender": "female"
      //       },


      //       {
      //             "id": 12,
      //             "img": sarwar,
      //             "name": "Sarwar Hossain",
      //             "email": "sarwar@brightfuturesoft.com",
      //             "post": "Software Engineer",
      //             "linkedIn": "https://www.linkedin.com/in/sarwar-asik/",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 13,
      //             "img": nahid,
      //             "name": "Nahid Ferdous",
      //             "email": "nahid@brightfuturesoft.com",
      //             "post": "Software Developer",
      //             "linkedIn": "https://www.linkedin.com/in/nahid-ferdaos/",
      //             "gender": "female"
      //       }, {
      //             "id": 14,
      //             "img": mursed,
      //             "name": "MH. Murshed",
      //             "email": "mursed@brightfuturesoft.com",
      //             "post": "Software Developer",
      //             "linkedIn": "https://www.linkedin.com/in/murshed1806/",
      //             "gender": "male"
      //       },
      //       {
      //             "id": 15,
      //             "img": riky,
      //             "name": "Uyemong Marma",
      //             "email": "riky@brightfuturesoft.com",
      //             "post": "UI/UX Designer",
      //             // "linkedIn": "https://www.linkedin.com/in/sarwar-asik/",
      //             "gender": "male"
      //       }


      // ]



      useEffect(() => {
            window.scrollTo(0, 0);
      }, []); useEffect(() => {
            window.scrollTo(0, 0);
      }, [])

      return (
            <div className='py-4 bg-[#020A1C] p-2 about-bg'>
                  <MetaTitle
                        title="About Us"
                        description="Learn about the team behind Bright Future Soft. Meet our CEO, directors, and other key team members who contribute to our success."
                        keywords="about us, team, CEO, founder, manager, software engineers, UI/UX designer, Bright Future Soft"
                        author="Bright Future Soft"
                        ogTitle="About Us - Bright Future Soft"
                        ogDescription="Discover the key members of the Bright Future Soft team. From our CEO and founder to our dedicated software engineers and designers."
                        ogImage={logo}
                        ogUrl="https://www.brightfuturesoft.com/about"
                  />
                  <div className="head px-2 sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:w-[85%] w-[98%] mx-auto rounded-lg ">
                        <div className="md:grid grid-cols-2 md:pt-0 pt-16  mt-2">
                              <div className="flex items-center">
                                    <div className="">
                                          <h1 className='text-xl text-[#3f98fd] font-[400] md:text-left text-center'>Software Company </h1>
                                          <h1 className="md:text-5xl text-[35px] text-white font-[700] md:text-left text-center">The <span className="text-[orange]">Bright Future Soft</span></h1>
                                          <div className="md:hidden flex  justify-end overflow-hidden mt-[-50px]">
                                                <Lottie className="" animationData={homeVc} loop={true} />
                                          </div>
                                          <p className="text-gray-300 md:mt-6 mt-[-50px]">
                                                At Bright Future Soft, we are a leading software company based in Bangladesh, founded in January 2023. We are passionate about harnessing the power of technology to drive positive change and empower individuals and businesses. With our innovative solutions and dedication to excellence, we strive to make a lasting impact in the software industry.
                                          </p>
                                    </div>
                              </div>
                              <div className="flex justify-end">
                                    <div className="md:flex hidden  justify-end overflow-hidden ">
                                          <Lottie className="" animationData={homeVc} loop={true} />
                                    </div>
                              </div>
                        </div>
                        <br />
                  </div>
                  <div className="mt-[10px]  sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:w-[85%] w-[98%] mx-auto rounded-lg">
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
                                                      <div className="cart-box  p-2 bg-[#1d1e37bc] border-2 border-[#0059ff] rounded-xl h-[340px]">
                                                            <div style={{ backgroundImage: `url("${tData.image}")`, backgroundSize: "cover" }} className="cart-header rounded-[20px]   w-[200px] h-[200px] mx-auto mt-[-40px] i-box">
                                                            </div>
                                                            <div className="body pb-4">
                                                                  <h2 className="text-white font-semibold mt-2">{tData.name}</h2>
                                                                  <p className="text-[14px] text-[#1becff]">{tData.possition ?? tData.designation}</p>
                                                                  <small>{tData?.email}</small>
                                                                  <Link to={tData.linkedin} target="_blank">
                                                                        <AiFillLinkedin className="text-4xl mt-4 m-auto text-[#1e6dff]" />
                                                                  </Link>
                                                            </div>
                                                      </div>
                                                </div>
                                          </SwiperSlide>)
                              }

                        </Swiper>
                        {/* <VerticalTimeline>
                      {
                        teamMembers?.map(tData =>
                            <VerticalTimelineElement

                                key={tData.id}
                                className="vertical-timeline-element--work"
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                icon={<img  loading="lazy"src={b} className='rounded-full' />}
                            >
                                <div className="md:flex gap-2 bg-[#232d3b] p-2 rounded">
                                    <div style={{backgroundImage : `url("${tData?.img}")`, backgroundSize : "cover"}} className="md:w-[100px] w-full md:h-[100px] h-[200px] rounded-lg"></div>
                                    <div className="text-white md:mt-0 mt-2">
                                        <h2>{tData.name}</h2>
                                        <p>{tData.gender=="male" ? "He" : "She"} is {tData.post} in Bright Future Soft</p>
                                    </div>
                                </div>
                            </VerticalTimelineElement>
                        )
                    }
                    </VerticalTimeline> */}

                  </div>

                  <br />
                  {/* content */}
                  <Service />
                  <Faq></Faq>
                  <OurProjects></OurProjects>
                  <Testimonials />
                  <Contact />
            </div>
      );
};

export default About;
