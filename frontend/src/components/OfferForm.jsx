import React, { useState } from 'react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, like sending it to an API
    console.log(formData);
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
