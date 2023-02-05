import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './home.css';
import '../../App.css';
const HomePage = () => {

  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  
  const pathChange = () => {
    navigate('dashboard', {state: {name: file.name}});
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    fetch('/api/upload', {
        method: 'POST',
        body: formData
    }).then((res) => console.log(res))
    .catch((err) => console.log("Error occured", err));

    setIsFileUploaded(true);
  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h2>Upload file here</h2>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
        {
          isFileUploaded &&
          <button type='button' className='dashboard' onClick={pathChange}>Go to Dashboard</button>
        }
    </div>
  );
}

export default HomePage;