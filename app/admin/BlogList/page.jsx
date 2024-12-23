'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import BlogItem from '@/Components/BlogItem';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [blogs, setBlogs] = useState([]);
   /*const fetchBlogs = async () => {
    const response = await axios.get('/api/blog/blogRoute');
    setBlogs(response.data.blogs)
  }*/
    const fetchBlogs = async () => {
      try {
          const response = await axios.get('/api/blog/blogRoute');
          if (response.status === 200) {
              console.log("Fetched Blogs:", response.data.blogs);
              setBlogs(response.data.blogs);
              return response.data.blogs; // Use or set this data in your component's state
          }
      } catch (error) {
          console.error("Error fetching blogs:", error);
      }
  };
  const deleteBlogs = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog/blogRoute', {
        params: {
          id: mongoId, // Pass the mongoId as a query parameter
        }
      });
  
      if (response.data.success) {
        toast.success("Blog Deleted"); // Show success message
        fetchBlogs(); // Re-fetch the emails after successful deletion
      } else {
        toast.error("Error: " + response.data.msg); // Display error message if any
      }
    } catch (error) {
      console.error("Error deleting blog:", error); // Log any error
      toast.error("Failed to delete blog. Please try again later."); // Show error message if the request fails
    }
  };
  useEffect ( ()=> {
    fetchBlogs();
  },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>
       <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
           <table className='w-full text-sm text-gray-500'>
            <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
              <tr>
                <th scope='col' className='hidden sm:block px-6 py-3 '> Author Name</th>
                <th scope='col' className='px-6 py-3 '>Blog Title</th>
                <th scope='col' className='px-6 py-3 '>Date</th>
                <th scope='col' className='px-6 py-3 '>Action</th>
              </tr>
            </thead>
            <tbody>
               {blogs.map ((item, index)=> {
                return <BlogTableItem key={index} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} deleteBlogs={deleteBlogs}/>
               })}
               
            </tbody>
           </table>
       </div>
    </div>
  )
}

export default page
