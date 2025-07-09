import { useState } from 'react';
import './Form.css';

const kDefaultFormState = {
  message: ''
};

const CardForm = ({ postNewCard }) => {
  const [formData, setFormData] = useState(kDefaultFormState);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.message.trim()) {
      setError('Message is required');
      return;
    }

    if (formData.message.trim().length > 40) {
      setError('Message must be less than 40 characters');
      return;
    }

    postNewCard(formData);
    setFormData(kDefaultFormState);
    setError('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add a New Card</h2>
      <label>
        Message:
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here"
          className={error && !formData.message.trim() ? 'error-input' : ''}
        />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CardForm;