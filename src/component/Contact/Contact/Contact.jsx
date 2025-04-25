import React, { useRef, useState } from 'react';
import { MdFacebook, MdOutlineMail, MdPhone } from 'react-icons/md';
import { BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import emailjs from "@emailjs/browser";
import ReactDOM from "react-dom";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./groovyWalkAnimation.json";
import Title, { base_url } from '../../../layout/Title';
import Swal from 'sweetalert2';

const Contact = () => {
      const [activeMdl, setActiveMdl] = useState(false);
      const [loading, setLoading] = useState(false);

      const form = useRef();
      const sendEmail = (e) => {
            setLoading(true);
            e.preventDefault();
            const full_name = e.target.full_name.value;
            const email_or_phone = e.target.email_or_phone.value;
            const message = e.target.message.value;
            const time_stamp = new Date().toISOString();

            console.log(full_name, email_or_phone, message, time_stamp);
            fetch(`${base_url}/contact/add-contact`, {
                  method: 'POST',
                  headers: {
                        'content-type': 'application/json',
                        'author': 'bright_future_soft'
                  },
                  body: JSON.stringify({
                        full_name,
                        email_or_phone,
                        message,
                        time_stamp,
                        status: 'pending'
                  }),
            })
                  .then((res) => res.json())
                  .then((data) => {

                        if (data) {
                              Swal.fire({
                                    title: '',
                                    text: 'Your message has been sent successfully!',
                                    icon: 'success',
                              });
                        }
                        console.log(data);

                  })
            setLoading(false);

            e.target.reset();
      };

      if (activeMdl) {
            setTimeout(() => setActiveMdl(false), 2000);
      }

      return (

            <div className="contact-bg">

                  <div align="center" className={`${activeMdl ? "block" : "hidden"}
            bg-[#192c3c]
            modal-box  text-blue-200 text-lg py-4 fixed top-0 bottom-0 left-0 right-0 m-auto z-50 overflow-hidden rounded-2xl p-2 h-[300px] items-center `}>
                        <Lottie className="w-[170px]" animationData={groovyWalkAnimation} loop={false} /> <p className="text-4xl ">
                              Your message send successfully
                        </p>
                  </div>



                  <div className="px-1 py-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 md:w-[80%] w-[95%]">
                        <h1 className="text-2xl  font-bold relative after:absolute after:left-0 after:right-0 after:bottom-[-18px] after:w-[60px] after:rounded-full after:h-[6px] after:bg-[#0095ff] after:mx-auto text-center text-white">Want to talk about <span className="shadow-tx"> your project?</span></h1>

                        <div className="contact-box py-6 mt-12 p-2 rounded text-white">
                              <h1 className="font-bold text-3xl text-center ">Contact us</h1>
                              <div className="flex flex-col-reverse lg:flex-row w-full justify-between items-center">

                                    <div className="lg:px-20">


                                          <ul className="flex item-center gap-3  justify-start">

                                                <li className='mt-6'>
                                                      <a href="mailto:info@thebrightfuture.co" className=" gap-2 duration-200 hover:text-blue-400"><MdOutlineMail className='text-4xl text-[#00a2ff] bg-white hover:bg-blue-300 p-1 rounded-full' /></a>
                                                </li>
                                                <li className='mt-6'>
                                                      <a href="tel:+8801792-205520" className=" gap-2 duration-200 hover:text-blue-400"><MdPhone className='text-4xl text-[#00a2ff] bg-white hover:bg-blue-300 p-1 rounded-full' /></a>
                                                </li>
                                                <li className='mt-6'>
                                                      <Link target='_blank' to="https://www.facebook.com/thebrightfuture.co" className=" gap-2 duration-200 hover:text-blue-400"><MdFacebook className='text-4xl text-[#00a2ff] bg-white hover:bg-blue-300 p-1 rounded-full' /></Link>
                                                </li>
                                                <li className='mt-6'>
                                                      <a target='_blank' href="https://bd.linkedin.com/company/thebrightfuture-co" className=" gap-2 duration-200 hover:text-blue-400"><BsLinkedin className=' text-[#00a2ff] bg-white hover:bg-blue-300 p-1 text-4xl rounded-full' /> </a>
                                                </li>
                                                <li className='mt-6'>
                                                      <a target='_blank' href="https://www.instagram.com/thebrightfuture_co/" className=" gap-2 duration-200 hover:text-blue-400"><BsInstagram className='text-4xl text-[#00a2ff] bg-white hover:bg-blue-300 p-1 rounded-full' /></a>
                                                </li>
                                                <li className='mt-6'>
                                                      <a target='_blank' href="https://x.com/brightfuturebd" className=" gap-2 duration-200 hover:text-blue-400"><BsTwitter className='text-4xl text-[#00a2ff] bg-white hover:bg-blue-300 p-1 rounded-full' /> </a>
                                                </li>
                                          </ul>
                                    </div>
                                    <div className="w-full mt-10">
                                          <form ref={form} onSubmit={sendEmail} className="text-[#0095ff] px-4 py-5 md:w-[60%] rounded-xl mx-auto form-bg capitalize">
                                                <h3 className="text-4xl text-center">Your Message</h3>
                                                <div className="relative bg-[#0b0a2238] border border-[#1795F0] rounded-lg mt-4">

                                                      <input required name="full_name" id='full_name' type="text" className="w-full rounded-lg outline-none border-none bg-[#00000034]" placeholder="Enter your full name" />
                                                </div>

                                                <div className="relative bg-[#0b0a2238] border border-[#1795F0] rounded-lg mt-8">

                                                      <input required type="text" id='email_or_phone' name="email_or_phone" className="w-full rounded-lg outline-none border-none bg-[#00000034]" placeholder="Enter your email or phone number" />
                                                </div>
                                                <div className="relative bg-[#0b0a2238] border border-[#1795F0] rounded-lg mt-8">

                                                      <textarea name="message" type="text" className="w-full h-[110px] rounded-lg outline-none border-none bg-[#00000034] " placeholder="Enter your message" />
                                                </div>

                                                <button type="submit" className="mt-8 bg-[#1A2644] hover:bg-blue-500 text-white w-full p-3 rounded-lg" disabled={loading}>{!loading ? "Submit" : <div align="center" className=' justify-center'>
                                                      <div className="flex">
                                                            <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-[#1e3d8d] border-4"></div>
                                                            <div className="ml-2"> Processing... </div>
                                                      </div>
                                                </div>}
                                                </button>

                                          </form>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Contact;
