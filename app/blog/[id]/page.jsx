'use client';
import { assets } from '@/assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogData = async () => {
    try {
      const response = await axios.get('/api/blog/blogRoute');
      //console.log('API Response:', response.data);
      setBlogs(response.data.blogs); // Assuming response contains a list of blogs
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  // Find the blog with the matching id
  useEffect(() => {
    if (blogs.length > 0) {
      const blog = blogs.find((blog) => blog._id === params.id);
      setSelectedBlog(blog);
    }
  }, [blogs, params.id]);

  return selectedBlog ? (
    <>
      {/* Header Section */}
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-start">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              alt="Logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get Started <Image src={assets.arrow} alt="Arrow" />
          </button>
        </div>

        {/* Blog Header */}
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {selectedBlog.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={selectedBlog.authorImg || '/default-author.png'}
            width={60}
            height={60}
            alt={selectedBlog.author}
          />
          <p className="mt-1 pb-2 text-large max-w-[740px] mx-auto">
            By {selectedBlog.author}
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          className="border-4 border-white"
          src={selectedBlog.image || '/default-placeholder.png'}
          width={1280}
          height={720}
          alt={selectedBlog.title}
        />
        <div
          className="blog-content mt-8"
          dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
        ></div>

        {/* Social Share */}
        <div className="my-24">
          <p className="text-black font-semibold my-4">
            Share this article on social media
          </p>
          <div className="flex gap-4">
            <Image src={assets.facebook_icon} width={40} alt="Facebook" />
            <Image src={assets.twitter_icon} width={40} alt="Twitter" />
            <Image src={assets.googleplus_icon} width={40} alt="Google Plus" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    // Loading or No Data State
    <div className="text-center py-20">
      <p>Loading blog content...</p>
    </div>
  );
};

export default Page;

