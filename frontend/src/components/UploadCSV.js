import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../UrlConfig';

const UploadCSV = () => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('csv', file);

    axios.post(`${baseURL}/upload`, formData)
      .then(res => {
        console.log('CSV uploaded:', res.data);
        // Redirect or update state as needed
      })
      .catch(err => console.error(err));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h2>Upload CSV</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default UploadCSV;
