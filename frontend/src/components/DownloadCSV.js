import React from 'react';
import axios from 'axios';

const DownloadCSV = () => {
  const handleDownload = () => {
    axios.get('/api/download-csv', { responseType: 'blob' })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'todo_list.csv');
        document.body.appendChild(link);
        link.click();
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Download CSV</h2>
      <button onClick={handleDownload}>Download CSV</button>
    </div>
  );
};

export default DownloadCSV;
