'use client'
import SubsItem from '@/Components/AdminComponents/SubsItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [emails, setEmails] = useState([]);
  const fetchEmail = async () => {
    const response = await axios.get('/api/email/route')
    setEmails(response.data.emails)
  }
  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email/route', {
        params: {
          id: mongoId, // Pass the mongoId as a query parameter
        }
      });
  
      if (response.data.success) {
        toast.success(response.data.msg); // Show success message
        fetchEmail(); // Re-fetch the emails after successful deletion
      } else {
        toast.error("Error: " + response.data.msg); // Display error message if any
      }
    } catch (error) {
      console.error("Error deleting email:", error); // Log any error
      toast.error("Failed to delete email. Please try again later."); // Show error message if the request fails
    }
  };
  
  useEffect ( ()=> {
    fetchEmail();
  },[])
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Subscription</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
               <tr>
                <th scope='col' className='px-6 py-3'>
                  Email Subscription
                </th>
                <th scope='col' className='px-6 py-3 hidden sm:block'>
                  Date 
                </th>
                <th scope='col' className='px-6 py-3'>
                  Action
                </th>
               </tr>
            </thead>
            <tbody>
               {emails.map((item,index)=> {
                return <SubsItem key={item._id} mongoId = {item._id} deleteEmail={deleteEmail} email={item.email} date= {item.date}/>
               })}
               
            </tbody>
          </table>
      </div>
    </div>
  )
}

export default page
