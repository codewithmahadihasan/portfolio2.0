import React from 'react';
import { Helmet } from 'react-helmet';
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router-dom";

const BlogCart = ({ bData }) => {
      const { _id, title, img, blur_photo, message, meta_tag, meta_description, url } = bData;
      return (
            <div>


                  <article
                        className="overflow-hidden rounded-lg border border-white border-opacity-25  shadow-sm"
                  >
                        <img
                              alt="Office"
                              loading="lazy" src={img}
                              className="h-56 w-full object-cover"
                        />

                        <div className="p-4 sm:p-6">
                              <Link to={`/blog/${url}`}>
                                    <h3 className="text-lg font-medium text-gray-100">
                                          {title}
                                    </h3>
                              </Link>

                              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                                    {meta_description?.slice(0, 100)}
                              </p>

                              <Link to={`/blog/${url}`}
                                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                              >
                                    Read More

                                    <span
                                          aria-hidden="true"
                                          className="block transition-all group-hover:ms-2 rtl:rotate-180"
                                    >
                                          &rarr;
                                    </span>
                              </Link>
                        </div>
                  </article>


            </div>

      );
};

export default BlogCart;
