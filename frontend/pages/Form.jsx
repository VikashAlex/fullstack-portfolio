"use client";

import { useEffect, useRef } from 'react';
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  User,
  MailIcon,
  ArrowRightIcon,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import { Button } from "../app/(user_website)/components/ui/button";
import { Input } from "../app/(user_website)/components/ui/input";
import { Textarea } from "../app/(user_website)/components/ui/textarea";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.info("Sending...", { autoClose: 1500 });

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully ✅");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast.error("Failed to send ❌");
      }
    } catch (error) {
      toast.error("Something went wrong 😓");
    }
  };

  const formRef = useRef(null);

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToForm");

    if (shouldScroll === "true" && formRef.current) {
      // Scroll and clear
      formRef.current.scrollIntoView({ behavior: "smooth" });
      sessionStorage.removeItem("scrollToForm");
    }
  }, []);
  return (
    <>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit} ref={formRef}>
        <div className="relative flex items-center">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <User className="absolute right-6 " size={20} />
        </div>

        <div className="relative flex items-center">
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <MailIcon className="absolute right-6 " size={20} />
        </div>

        <div className="relative flex items-center">
          <Input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <PhoneCall className="absolute right-6 " size={20} />
        </div>

        <div className="relative flex items-center">
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <MessageSquare className="absolute top-4 right-6 " size={20} />
        </div>

        <Button
          className="flex items-center gap-x-1 max-w-[166px]"
          type="submit"
        >
          Let's Talk
          <ArrowRightIcon size={20} />
        </Button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default Form;
