'use client'
import { assets } from '@/assets/assets'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'react-toastify'
import React, { useState } from 'react'

const page = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        category: "Startup",
        author: "Rishika Thakur",
        authorImg: "/Author.png",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
        console.log(data);
    };

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();
  
      // Append the fields to formData
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('author', data.author);
      formData.append('authorImg', data.authorImg);
      formData.append('image', image);
  
      // Check the FormData contents before submitting
      for (let [key, value] of formData.entries()) {
          console.log(key, value);
      }
  
      try {
          const response = await axios.post('/api/blog/blogRoute', formData);
          if (response.data.success) {
              toast.success('Blog Added');
              setImage(null);
              setData({
                  title: "",
                  description: "",
                  category: "Startup",
                  author: "Rishika Thakur",
                  authorImg: "/Author.png",
              });
          } else {
              toast.error('Error');
          }
      } catch (error) {
          toast.error('Error submitting the blog');
          console.log(error);
      }
  };  

    return (
        <>
            <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
                <p className='text-xl'>Upload Thumbnail</p>
                <label htmlFor="image">
                    <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} alt='' height={70} />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden /*required*/ />

                <p className='text-xl mt-4'>Blog Title</p>
                <input
                    name='title'
                    onChange={onChangeHandler}
                    value={data.title}
                    className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
                    type="text"
                    placeholder='Type here'
                    required
                />

                <p className='text-xl mt-4'>Blog Description</p>
                <textarea
                    name='description'
                    onChange={onChangeHandler}
                    value={data.description}
                    className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
                    placeholder='Write Content here'
                    required
                />

                <p className='text-xl mt-4'>Blog Category</p>
                <select
                    className='w-40 mt-4 px-4 py-3 border text-gray-500'
                    name="category"
                    onChange={onChangeHandler}
                    value={data.category}
                >
                    <option value="Startup">Startup</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                </select>
                <br />
                <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>Add</button>
            </form>
        </>
    );
};

export default page;
