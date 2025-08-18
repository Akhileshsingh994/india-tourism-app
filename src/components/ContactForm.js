import React, { useState } from 'react';
import styled from 'styled-components';
import { db } from "../firebase/config.js";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ContactContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

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
