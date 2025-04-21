import nodemailer from "nodemailer"
export const contactUs = async(req,res)=>{
    const { name, useremail, message } = req.body;

  if (!name || !useremail || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS  // App password
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${useremail}>`,
      to: process.env.EMAIL_USER, // Where you want to receive emails
      subject: 'New Contact Form Submission',
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${useremail}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    res.status(200).json({success:true, message: 'Email sent successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false , message: 'Failed to send email' });
  }
}