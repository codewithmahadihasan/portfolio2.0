import React from 'react';
import HeadSection from '../../component/HeadSection/HeadSection/HeadSection';
import OurRequrement from '../../component/OurRequrement/OureRequrement/OurRequrement';
import Service from '../../component/Service/Service/Service';
import Offer from '../../component/Offer/Offer/Offer';
import Project from '../../component/Project/Project/Project';
import OurMission from '../../component/OurMission/OutMission/OurMission'
import OurVission from '../../component/OurVission/OurVission/OurVission'
import Team from '../../component/Team/Team/Team';
import Testimonial from '../../component/Testimonials/Testimonials/Testimonials';
import Technology from '../../component/Technology/Techonology/Technology';
import Contact from '../../component/Contact/Contact/Contact';

import { useEffect } from 'react';
import Title from '../../layout/Title';
import News_Letter from '../../component/Testimonials/Testimonials/News_Letter';
import MetaTitle from '../../layout/Title';
import Partner from '../../component/Testimonials/Testimonials/Partner';

const Home = () => {
      useEffect(() => {
            window.scrollTo(0, 0);
      }, []);

      return (
            <div className="relative">
                  <HeadSection />
                  <OurRequrement />
                  <Service />
                  <div className="mrg-bg">
                        <Project />
                        <OurMission />
                  </div>
                  <Technology />
                  <Offer />
                  <OurVission />
                  <Team></Team>
                  <Testimonial />
                  <Contact />
                  <Partner />
                  <News_Letter />

            </div>
      );
};

export default Home;
