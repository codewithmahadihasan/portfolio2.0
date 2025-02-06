import React, { useEffect, useState } from 'react';
import BlogCart from './BlogCart/BlogCart';
import { useLoaderData } from 'react-router-dom';
import Title from '../../layout/Title';
import MetaTitle from '../../layout/Title';
import moduleName from '../../Assctes/logo.png';

const Blog = () => {
      const blog_data = useLoaderData();
      useEffect(() => {
            window.scrollTo(0, 0);
      }, []);

      const blog = blog_data?.data


      return (
            <div className="p-2 bg-[#1b1b22]">
                  <MetaTitle
                        title="Blog"
                        description="Read our latest blog posts and insights on various topics including technology, industry trends, and company updates."
                        keywords="blog, technology, updates, industry trends, Bright Future Soft"
                        author="Bright Future Soft"
                        ogTitle="Bright Future Soft Blog"
                        ogDescription="Explore our blog for the latest updates and insights on technology and industry trends from Bright Future Soft."
                        ogImage={moduleName}
                        ogUrl="https://www.brightfuturesoft.com/blog"
                  />
                  <div className="blog-bg py-6 mt-20 h-[400px] rounded ">
                        <div className="px-1 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 lg:px-8 md:w-[80%] w-[95%] ">
                              <div className="text-center mt-8">
                                    <h2 className="md:text-6xl text-4xl font-semibold text-[#00ccff]">
                                          Welcome to our blog
                                    </h2>
                                    <p className='mt-8'>
                                          Discover the latest technological innovations and trends: your <br /> ultimate guide to the digital world.
                                    </p>
                              </div>
                        </div>
                  </div>
                  <div className="content px-1  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 py-4 lg:px-2 md:w-[100%] w-[95%]">
                        {/* <h1 className="text-white font-semibold text-2xl border-b pb-2 border-[#80808093]">Blogs</h1>
        <br /> */}
                        <div className="grid md:grid-cols-3 gap-12">
                              {
                                    blog?.map(bData => <BlogCart key={bData.id} bData={bData} />)
                              }
                        </div>
                  </div>
            </div>
      );
};

export default Blog;
