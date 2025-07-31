import React, { useState } from 'react';
import styled from 'styled-components';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExperienceContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
  margin-top: 50px;
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

const initialExperiences = [
  {
    id: 1,
    name: 'Akhil Sharma',
    location: 'Goa',
    description: 'The beaches were stunning and the seafood was delicious! I enjoyed the vibrant nightlife and water sports.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Priya Singh',
    location: 'Jaipur',
    description: 'Exploring the forts and palaces was like stepping back in time. The local markets were colorful and lively.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Rahul Verma',
    location: 'Kerala',
    description: 'The backwaters were serene and the houseboat stay was unforgettable. Loved the lush greenery everywhere.',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80',
  },
];

const Experience = () => {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const reader = new window.FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidated(true);
    if (!form.name || !form.location || !form.description) return;
    setExperiences([
      {
        ...form,
        id: experiences.length + 1,
        image:
          form.image ||
          'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      },
      ...experiences,
    ]);
    setForm({ name: '', location: '', description: '', image: '' });
    setValidated(false);
  };

  return (
    <div className="content-section">
      <h1>Travel Experiences</h1>
      <p>
        Explore unique experiences and activities to enrich your travels. Find something new to try!
      </p>
      
      <h4 className="mb-3">Recent Experiences</h4>
      <div className="row">
        {experiences.map((exp) => (
          <div className="col-md-6 mb-4" key={exp.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={exp.image}
                className="card-img-top"
                alt={exp.location}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{exp.location}</h5>
                <h6 className="card-subtitle mb-2 text-muted">By {exp.name}</h6>
                <p className="card-text">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <hr className="my-5" />
      
      <ExperienceContainer>
        <h2>Share Your Experience</h2>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input 
            type="text" 
            id="name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          
          <Label htmlFor="location">Location</Label>
          <Input 
            type="text" 
            id="location" 
            name="location" 
            value={form.location} 
            onChange={handleChange} 
            required 
          />
          
          <Label htmlFor="description">Description</Label>
          <TextArea 
            id="description" 
            name="description" 
            rows="4" 
            value={form.description} 
            onChange={handleChange} 
            required 
          />
          
          <Label htmlFor="image">Upload Image (optional)</Label>
          <Input 
            type="file" 
            id="image" 
            name="image" 
            accept="image/*" 
            onChange={handleChange} 
          />
          
          <SubmitButton type="submit">Submit Experience</SubmitButton>
        </Form>
      </ExperienceContainer>
    </div>
  );
};

export default Experience;
