import { IncomingForm } from "formidable";
import { promises as fsPromises } from "fs";
import path from "path";
import BlogModel from "@/lib/Models/blogModel";
import { connectDB } from "@/lib/Config/db";
import { NextResponse } from "next/server";
const fs = require('fs');

export const config = {
  api: {
    bodyParser: false,  // Disabling default body parser to use formidable
  },
};

export default async function handler(req, res) {
    await connectDB();
    if (req.method === "GET") {
        try {
            const blogs = await BlogModel.find({});
            return res.status(200).json({ blogs });
        } catch (error) {
            console.error("Error fetching blogs:", error);
            return res.status(500).json({ success: false, msg: "Error fetching blogs" });
        }
    }
   else if (req.method === 'DELETE') {
         const { id } = req.query; // Extracting `id` from query parameters
         if (!id) {
            return res.status(400).json({ success: false, message: "Blog ID is required" });
            }
        try {
          const result = await BlogModel.findByIdAndDelete(id);
            if (!result)  {
            return res.status(404).json({ success: false, message: 'Blog not found' });
             }
             res.status(200).json({ success: true, message: 'Blog deleted successfully' });
        } catch (error) {
          res.status(500).json({ success: false, error: error.message });
           }
      } 

  else if (req.method === "POST") {
        const form = new IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error("Error parsing form:", err);
                return res.status(500).json({ success: false, msg: "Error parsing form data" });
            }

            // Log fields and files to verify the structure
            //console.log("Form fields:", fields);
            //console.log("Form files:", files);

            try {
                const timestamp = Date.now();
                const image = files.image[0]; // Assuming the image field is named 'image'

                if (!image) {
                    return res.status(400).json({ success: false, msg: "Image is required" });
                }

                // Handle image upload
                const imageByteData = await fsPromises.readFile(image.filepath);
                const uploadDir = path.join(process.cwd(), "public", "uploads");
                await fsPromises.mkdir(uploadDir, { recursive: true });

                const filePath = path.join(uploadDir, `${timestamp}_${image.originalFilename}`);
                await fsPromises.writeFile(filePath, imageByteData);

                const imgUrl = `/uploads/${timestamp}_${image.originalFilename}`;

                // Prepare blog data
                const blogData = {
                    title: fields.title[0] || "Untitled", // Ensure this is treated as a string
                    description: fields.description[0] || "No description provided", // Ensure this is treated as a string
                    category: fields.category[0] || "Uncategorized", // Ensure this is treated as a string
                    author: fields.author[0] || "Anonymous", // Ensure this is treated as a string
                    authorImg: fields.authorImg[0] || "/Author.png", // Ensure this is treated as a string
                    image: imgUrl,  // Save the image URL
                };

                // Log the blog data to check if all required fields are present
                //console.log("Blog data:", blogData);

                // Save the blog data to the database
                const newBlog = await BlogModel.create(blogData);
                //console.log("Blog Saved:", newBlog);

                return res.status(200).json({ success: true, msg: "Blog Added", imgUrl });
            } catch (error) {
                console.error("Error in POST request:", error.message);
                return res.status(500).json({ success: false, msg: "Server error" });
            }
        });
    }
    else {
    return res.status(405).json({ success: false, msg: "Method not allowed" });
    }
}
