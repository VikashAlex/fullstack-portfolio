import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !message || !phone) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptionsToYou = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Contact Form Submission",
    html: `
      <h3>New Message Received:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  const mailOptionsToUser = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting Vikash Alwar!",
    html: `
      <p>Hi ${name},</p>
      <p>Thanks for reaching out. I have received your message and will get back to you soon!</p>
      <br/>
      <p>– Vikash Alwar</p>
    `,
  };

  try {
    // Send email to yourself
    await transporter.sendMail(mailOptionsToYou);

    // Send confirmation to user
    await transporter.sendMail(mailOptionsToUser);

    return res.status(200).json({ message: "Emails sent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Email failed to send" });
  }
}
