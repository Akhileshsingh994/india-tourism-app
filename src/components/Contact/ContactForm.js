import React, { useState } from 'react';
import { db } from "../../firebase/config.js";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import {
  ContactContainer,
  Form ,
  Label ,
  Input ,
  TextArea ,
  SubmitButton ,
} from './ContactFrom.style.js'



const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('All fields are required.');
      return;
    }

    try {
      // Save to Firestore
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        createdAt: serverTimestamp()
      });

      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // clear form
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <ContactContainer className="fade-in animated-card">
      <h2>Contact Us</h2>
      <Form onSubmit={handleSubmit} className="slide-in-up">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Label htmlFor="message">Message</Label>
        <TextArea
          id="message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit" className="animated-btn">Send</SubmitButton>
      </Form>
    </ContactContainer>
  );
}

export default ContactForm;
