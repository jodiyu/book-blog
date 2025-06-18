"use client";

import { useState } from "react";
import  Input from "@/components/form/input";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/form/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        console.error("Error submitting form:", await res.json());
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-6">
        <h1 className="text-3xl font-serif">Reach Out!</h1>
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col space-y-4 w-full max-w-md p-6"
        action="#"
      >
        <Input 
          type="text" 
          name="firstName" 
          placeholder="First Name" 
          value={formData.firstName} 
          onChange={handleChange} 
          required 
        />
        <Input 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          value={formData.lastName} 
          onChange={handleChange} 
          required 
        />
        <Input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <TextInput
          name="message" 
          placeholder="Message..." 
          value={formData.message} 
          onChange={handleChange} 
          required 
          rows={4}
        />
        <div className="flex justify-center mt-auto pt-2">
            <Button type="submit" className="w-[150px] h-[37px] rounded-lg">Submit</Button>
        </div>
        {submitted && <p className="flex justify-center text-green-500 mt-2">Your message has been sent.</p>}
      </form>
    </main>
  );
}
