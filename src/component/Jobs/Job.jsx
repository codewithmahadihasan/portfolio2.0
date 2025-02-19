import React, { useEffect } from 'react';
import JobCard from './Card';
import { useState } from 'react';
import MetaTitle, { base_url } from '../../layout/Title';
import moduleName from '../../Assctes/logo.png';

const Job = () => {
      useEffect(() => {
            window.scrollTo(0, 0);
      }, []);

      const [jobList, setBlogList] = useState([])
      useEffect(() => {
            fetch(`${base_url}/job-post/all-job`)
                  .then(res => res.json())
                  .then(data => setBlogList(data.data))
      }, [])

      console.log(jobList);

      return (
            <div className='join-bg py-20'>
                  <MetaTitle
                        title="Careers"
                        description="Explore career opportunities at Bright Future Soft. Join our team and contribute to innovative projects and a dynamic work environment."
                        keywords="careers, job openings, work with us, Bright Future Soft"
                        author="Bright Future Soft"
                        ogTitle="Careers at Bright Future Soft"
                        ogDescription="Discover exciting career opportunities at Bright Future Soft. Be a part of our innovative team and contribute to impactful projects."
                        ogImage={moduleName}
                        ogUrl="https://www.brightfuturesoft.com/careers"
                  />
                  <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full text-white lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

                        <div className='flex justify-center'>
                              <h1 className='lg:text-[180px] md:text-7xl text-5xl font-bold text-[#6666671a] text-center z-1 absolute'>Bright Future Soft</h1>
                        </div>
                        <h1 className='lg:text-5xl text-xl md:text-2xl text-center font-sans font-bold lg:mt-36 mt-8 relative z-5'>At Bright Future Soft, our company values reflect the core beliefs and guiding principles that shape our culture, decision-making process, and overall behavior.</h1>
                  </div>
                  <h1 className='text-5xl font-bold text-center mb-8'>Come join us at Bright Future Soft</h1>
                  <div className='grid grid-cols-1 gap-4 px-4  mx-auto sm:max-w-xl md:max-w-full text-white lg:max-w-screen-xl '>
                        {jobList?.map(data => <JobCard data={data}></JobCard>)}

                  </div>
            </div>
      );
};

export default Job;
