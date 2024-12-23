import { connectDB } from "@/lib/Config/db";
import emailModel from "@/lib/Models/emailModel";

export default async function handler(req, res) {
    // Connect to the database
    await connectDB();

    if (req.method === "GET") {
        try {
            const emails = await emailModel.find({});
            return res.status(200).json({ success: true, emails });
        } catch (error) {
            console.error("Error fetching emails:", error);
            return res.status(500).json({ success: false, msg: "Failed to fetch emails" });
        }
    }

    if (req.method === "POST") {
        try {
            const { email } = req.body; // Extract email from JSON body

            // Validate email input
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return res.status(400).json({ success: false, msg: "Invalid email address" });
            }

            // Save email to the database
            await emailModel.create({ email });
            return res.status(200).json({ success: true, msg: "Email Subscribed" });
        } catch (error) {
            console.error("Error saving email:", error);
            return res.status(500).json({ success: false, msg: "Internal Server Error" });
        }
    }

    if (req.method === "DELETE") {
        const { id } = req.query; // Get id from query params

        if (!id) {
            return res.status(400).json({ success: false, msg: "No ID provided for deletion" });
        }

        try {
            const deletedEmail = await emailModel.findByIdAndDelete(id);

            if (!deletedEmail) {
                return res.status(404).json({ success: false, msg: "Email not found" });
            }

            return res.status(200).json({ success: true, msg: "Email deleted" });
        } catch (error) {
            console.error("Error deleting email:", error);
            return res.status(500).json({ success: false, msg: "Failed to delete email" });
        }
    }

    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "POST", "DELETE"]);
    return res.status(405).json({ success: false, msg: `Method ${req.method} not allowed` });
}
