import { useState } from 'react';
import './CardForm.css'; // Optional, if you want custom styles

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
    <form className="card-form" onSubmit={handleSubmit}>
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



// import { useState } from 'react';

// const kDefaultFormState = {
//   message: ''
// }

// const CardForm = ({postNewCard}) => {
//   const [formData, setFormData] = useState(kDefaultFormState);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     postNewCard(formData);
//     setFormData(kDefaultFormState);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const makeControlledInput = (inputTitle) => {
//     return (
//       <input
//         type="text"
//         name={inputTitle}
//         value={formData[inputTitle]}
//         onChange={handleChange}
//       />
//     )
//   }
// }