import { useState } from 'react';

const kDefaultFormState = {
  message: ''
}

const CardForm = ({postNewCard}) => {
  const [formData, setFormData] = useState(kDefaultFormState);

  const handleSubmit = (event) => {
    event.preventDefault();
    postNewCard(formData);
    setFormData(kDefaultFormState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const makeControlledInput = (inputTitle) => {
    return (
      <input
        type='text'
        
      ></input>
    )
  }
}