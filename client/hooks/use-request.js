import axios from 'axios';
import { useState } from 'react';

// Method = type of axios request (get, post, patch, etc)
// Url = url of axios request
// Body = data that will be sent (if request requires it)
export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  // function sends the data from the response OR
  // sends error message inside a div
  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
