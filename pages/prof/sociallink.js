import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import { useRouter } from 'next/router';

const SocialLink = () => {
  const [formData, setFormData] = useState({
    Instagram: '',
    Twitter: '',
    Linkedin: '',
    Github: '',
    personalweb: '',
  });

  const router = useRouter();

  // Fetch existing social links when the component mounts
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get('/api/sociallinks');
        if (response.status === 200) {
          // Assuming response.data is the social links object, update state
          setFormData(response.data || {
            Instagram: '',
            Twitter: '',
            Linkedin: '',
            Github: '',
            personalweb: ''
          });
        }
      } catch (error) {
        console.error('Error fetching social links:', error);
      }
    };

    fetchSocialLinks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      
      // Check if the form data already exists (you can use a condition to check if it's an update)
      if (formData._id) {
        // If _id exists, it's an update, so use PUT request
        response = await axios.put('/api/sociallinks', formData);
      } else {
        // If no _id, it's a new entry, so use POST request
        response = await axios.post('/api/sociallinks', formData);
      }
  
      if (response.status === 200 || response.status === 201) {
        alert('Social Links saved successfully!');
        router.push('/prof');
      } else {
        alert('Failed to save social links.');
      }
    } catch (error) {
      console.error('Error saving social links:', error);
      alert('An error occurred while saving the data.');
    }
  };
  

  return (
    <div className="justifycenter">
      <div className="responsive-form">
        <h2>Social Media Links</h2>
        <form onSubmit={handleSubmit}>
          {/* Instagram */}
          <div className="form-box">
            <label htmlFor="Instagram">
              Instagram <BsInstagram />
            </label>
            <input
              type="text"
              id="Instagram"
              name="Instagram"
              placeholder="Enter Instagram link"
              value={formData.Instagram}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Twitter */}
          <div className="form-box">
            <label htmlFor="Twitter">
              Twitter <BsTwitter />
            </label>
            <input
              type="text"
              id="Twitter"
              name="Twitter"
              placeholder="Enter Twitter link"
              value={formData.Twitter}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Linkedin */}
          <div className="form-box">
            <label htmlFor="Linkedin">
              Linkedin <BsLinkedin />
            </label>
            <input
              type="text"
              id="Linkedin"
              name="Linkedin"
              placeholder="Enter Linkedin link"
              value={formData.Linkedin}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Github */}
          <div className="form-box">
            <label htmlFor="Github">
              Github <BsGithub />
            </label>
            <input
              type="text"
              id="Github"
              name="Github"
              placeholder="Enter Github link"
              value={formData.Github}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Personal Website */}
          <div className="form-box">
            <label htmlFor="personalweb">
              Personal Web <CgWebsite />
            </label>
            <input
              type="text"
              id="personalweb"
              name="personalweb"
              placeholder="Enter Personal Website link"
              value={formData.personalweb}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SocialLink;
