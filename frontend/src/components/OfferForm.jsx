import React, { useState } from 'react';
import axios from 'axios';

const OfferForm = () => {
  const [formData, setFormData] = useState({
    collectionSlug: '',
    maxBid: 0,
    maxBidPercentage: 0,
    quantity: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the form data, like sending it to an API
    console.log(formData);
    try {
      await axios.post('http://localhost:3000/submit', formData);
      console.log('Form data sent successfully!');
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Collection Slug:
        <input type="text" name="collectionSlug" value={formData.collectionSlug} onChange={handleChange} />
      </label>
        <br />
      <label>
        Max Bid:
        <input type="number" name="maxBid" value={formData.maxBid} onChange={handleChange} />
      </label>
        <br />
      <label>
        Max Bid Percentage to Floor:
        <input type="number" name="maxBidPercentage" value={formData.maxBidPercentage} onChange={handleChange} />
      </label>
        <br />
      <label>
        Quantity:
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      </label>
       <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default OfferForm;
