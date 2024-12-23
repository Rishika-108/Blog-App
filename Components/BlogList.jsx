import { blog_data } from '@/assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';
import { toast } from 'react-toastify';

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
      const response = await axios.get('/api/blog/blogRoute');
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
      
    }
    const deleteBlogs = async (mongoId) => {
      const response = await axios.delete('/api/blog/blogRoute',{
        params : {
          id : mongoId
        }
      })
      toast.success(response.data.msg)
      fetchBlogs();
    }
    useEffect ( ()=> {
      fetchBlogs();
    },[])

  return (
   
    <div>
      <div className='flex justify-center gap-6 my-10'>
        <button onClick={()=>setMenu("All")} className= {menu === "All" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>All</button>
        <button onClick={()=>setMenu("Technology")} className= {menu === "Technology" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Technology</button>
        <button onClick={()=>setMenu("Startup")} className= {menu === "Startup" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>StartUp</button>
        <button onClick={()=>setMenu("Lifestyle")} className= {menu === "Lifestyle" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>LifeStyle</button>
      </div>
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
           {/*blog_data*/blogs.filter((item)=> menu === "All" ? true : item.category===menu).map((item,index)=> {
              return  <BlogItem key={item._id} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} deleteBlogs={deleteBlogs}/>
           })}
      </div>
    </div>
  )
}

export default BlogList
