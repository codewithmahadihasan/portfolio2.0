import React from 'react';
import { HiOutlineCodeBracket, HiOutlineCurrencyBangladeshi, HiOutlineWrenchScrewdriver, HiPhone } from 'react-icons/hi2';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import tailwind from '../../../Assctes/icon/Tailwind.png'
import bootstrap from '../../../Assctes/icon/Bootstrap.png'
import metarial from '../../../Assctes/icon/Material UI.png'
import typescript from '../../../Assctes/icon/TypeScript.png'
import react from '../../../Assctes/icon/React.png'
import redux from '../../../Assctes/icon/redux.png'
import js from '../../../Assctes/icon/JavaScript.png'
import nextJs from '../../../Assctes/icon/nextjs-boilerplate-logo.png';
import ashtro from '../../../Assctes/icon/Astro.png';
import nest from '../../../Assctes/icon/Nest.js.png';
import vue from '../../../Assctes/icon/Vue.js.png';
import angular from '../../../Assctes/icon/Angular.png';

//backend
import nodejs from '../../../Assctes/icon/Node.js.png'
import python from '../../../Assctes/icon/python.png'
import php from '../../../Assctes/icon/php.png'
import go from '../../../Assctes/icon/go.png'
import express from '../../../Assctes/icon/Express.png'
import dj from '../../../Assctes/icon/dj.png'
import Laravel from '../../../Assctes/icon/Laravel.png'
import Fastify from '../../../Assctes/icon/Fastify.png'


//database
import mongo from '../../../Assctes/icon/mongodb.png'
import mysql from '../../../Assctes/icon/mySQL.png'
import postgres from '../../../Assctes/icon/postgress.png'
import firebase from '../../../Assctes/icon/firebase.png'
import Microsoft from '../../../Assctes/icon/Microsoft SQL.png';
import Redis from '../../../Assctes/icon/Redis.png';

//tools
import git from '../../../Assctes/icon/git.png';
import figma from '../../../Assctes/icon/figma.png'
import azure from '../../../Assctes/icon/azure.png'
import aws from '../../../Assctes/icon/aws.png'
import jest from '../../../Assctes/icon/Jest.png'
import Docker from '../../../Assctes/icon/Docker.png'
import SonarQube from '../../../Assctes/icon/SonarQube.png'
import Postman from '../../../Assctes/icon/postman.png'
import slack from '../../../Assctes/icon/slack.png'
import graphql from '../../../Assctes/icon/graphql.png'

//mobile apps

import Swift from '../../../Assctes/icon/Swift.png'
import Flutter from '../../../Assctes/icon/Flatter.png'
import Kotlin from '../../../Assctes/icon/Kotlin.png'
import Ionic from '../../../Assctes/icon/Ionic.png'


// payment getaway

import ssl from '../../../Assctes/icon/ssl.png'
import strip from '../../../Assctes/icon/stripe.png'
import bkash from '../../../Assctes/icon/Bkash.png'
import nogod from '../../../Assctes/icon/nogod.png'
import paypal from '../../../Assctes/icon/Paypal.png';
import AmarPay from '../../../Assctes/icon/amarpay.png';



// import firebase from '../../../Assctes/icon/firebase.png'





const Technology = () => {

      const tData = [
            {
                  id: 0,
                  title: "Frontend Technology",
                  options: [
                        {
                              id: 0,
                              name: "tailwind", img: tailwind
                        },
                        {
                              id: 1,
                              name: "bootstrap", img: bootstrap
                        },
                        {
                              id: 2,
                              name: "metarial", img: metarial
                        },
                        {
                              id: 3,
                              name: "typescript", img: typescript
                        },
                        {
                              id: 4,
                              name: "react", img: react
                        },
                        {
                              id: 5,
                              name: "redux", img: redux
                        },
                        {
                              id: 6,
                              name: "java script", img: js
                        },
                        {
                              id: 7,
                              name: "next js", img: nextJs
                        },
                        {
                              id: 8,
                              name: "Astro", img: ashtro
                        },

                        {
                              id: 10,
                              name: "Angular", img: angular
                        },
                        {
                              id: 11,
                              name: "Vue", img: vue
                        }
                  ]
            },
            {
                  id: 1,
                  title: "Backend Technology",
                  options: [
                        {
                              id: 0,
                              name: "node js", img: nodejs
                        },
                        {
                              id: 1,
                              name: "Python", img: python
                        },
                        {
                              id: 2,
                              name: "PHP", img: php
                        },
                        {
                              id: 3,
                              name: "GO", img: go
                        },
                        {
                              id: 4,
                              name: "Express JS", img: express
                        },

                        {
                              id: 5,
                              name: "Django", img: dj
                        },
                        {
                              id: 6,
                              name: "Laravel", img: Laravel
                        },
                        {
                              id: 7,
                              name: "Fastify", img: Fastify
                        },
                        {
                              id: 9,
                              name: "Nest.js", img: nest
                        },
                  ]
            },
            {
                  id: 3,
                  title: "Database",
                  options: [
                        {
                              id: 0,
                              name: "MongoDB", img: mongo
                        },
                        {
                              id: 1,
                              name: "Firebase", img: firebase
                        },
                        {
                              id: 2,
                              name: "MySql", img: mysql
                        },
                        {
                              id: 3,
                              name: "Postgres", img: postgres
                        },
                        {
                              id: 4,
                              name: "Microsoft SQL", img: Microsoft
                        },
                        {
                              id: 5,
                              name: "Redis", img: Redis
                        }
                  ]
            },
            {
                  id: 2,
                  title: "Tools",
                  options: [
                        {
                              id: 0,
                              name: "Git", img: git
                        },
                        {
                              id: 1,
                              name: "figma", img: figma
                        },
                        {
                              id: 2,
                              name: "Azure", img: azure
                        },
                        {
                              id: 3,
                              name: "AWS", img: aws
                        },
                        {
                              id: 4,
                              name: "Jest", img: jest
                        },
                        {
                              id: 5,
                              name: "Docker", img: Docker
                        },
                        {
                              id: 6,
                              name: "SonarQube", img: SonarQube
                        },
                        {
                              id: 7,
                              name: "Postman", img: Postman
                        },
                        {
                              id: 8,
                              name: "Slack", img: slack
                        },
                        {
                              id: 9,
                              name: "Graphql", img: graphql
                        }

                  ]
            },
            {
                  id: 3,
                  title: "Mobile App Development",
                  options: [
                        {
                              id: 0,
                              name: "React Native", img: react
                        },
                        {
                              id: 1,
                              name: "Swift", img: Swift
                        },
                        {
                              id: 2,
                              name: "Flutter", img: Flutter
                        },
                        {
                              id: 3,
                              name: "Kotlin", img: Kotlin
                        },
                        {
                              id: 4,
                              name: "Ionic", img: Ionic
                        }
                  ]
            },
            {
                  id: 4,
                  title: "Payment Gateways",
                  options: [
                        {
                              id: 0,
                              name: "SSLCOMMERZ ", img: ssl
                        },
                        {
                              id: 1,
                              name: "Stripe", img: strip
                        },
                        {
                              id: 2,
                              name: "Paypal", img: paypal
                        },
                        {
                              id: 3,
                              name: "Bkash", img: bkash,
                        },
                        {
                              id: 4,
                              name: "Nagad", img: nogod,
                        },
                        {
                              id: 5,
                              name: "AmarPay", img: AmarPay,
                        },

                  ]
            },
      ]
      return (
            <div>
                  <div className="tech-bg px-2 py-4 text-capitalize" id='tech'>
                        <h1 className="text-xl  font-bold relative after:absolute after:left-0 after:right-0 after:bottom-[-18px] after:w-[60px] after:rounded-full after:h-[6px] after:bg-[#0095ff] after:mx-auto text-center text-white">Our Technology <span className="shadow-tx">and Tools</span></h1>
                        <br /><br />
                        <VerticalTimeline className='text-white'>
                              {
                                    tData.map(tData => <VerticalTimelineElement key={tData.id}
                                          className="vertical-timeline-element--work"
                                          contentArrowStyle={{ borderRight: '7px solid  #ff000000', }}

                                          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                          icon={<HiOutlineCodeBracket />}
                                    >
                                          <div className="sp-box border rounded-r-lg rounded-bl-lg border-[#2a4892]  relative p-3">
                                                <div className="absolute top-[-28px] bg-[#2a4892] sp pl-2 pr-14  py-1 left-[-1px]">
                                                      <h1 className='md:text-md whitespace-nowrap text-sm'>{tData.title}</h1>
                                                </div>
                                                <div className="container mx-auto p-4">
                                                      <figure className="grid mt-4 grid-cols-3 sm:grid-cols-6 gap-4">
                                                            {tData.options.map((td, index) => (
                                                                  <div key={index} className="group relative cursor-pointer">
                                                                        <img
                                                                              className="border border-blue-500 rounded p-2 bg-gray-700 hover:bg-white w-14 h-14 object-contain transition-colors duration-300"
                                                                              loading="lazy"
                                                                              src={td.img}
                                                                              alt={td.name}
                                                                        />
                                                                        <span className="absolute  left-1/2 -translate-x-1/2 bottom-[calc(100%+2px)] flex items-center justify-center capitalize px-2 py-1 whitespace-nowrap text-xs bg-gray-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                                                              {td.name}
                                                                        </span>
                                                                  </div>
                                                            ))}
                                                      </figure>
                                                </div>

                                          </div>
                                    </VerticalTimelineElement>)
                              }
                        </VerticalTimeline>
                  </div>
            </div>
      );
};

export default Technology;
