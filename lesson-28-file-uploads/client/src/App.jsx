import { useState, useEffect, use } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import axios from 'axios';
import FileInput from './components/FileInput';

function App() {
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [pictures, setPictures] = useState([]);

  const [visible, setVisible] = useState(false);

// Når success settes til true, vis meldingen og skjul den etter 3 sekunder
  useEffect(() => {
    if (success) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setSuccess(false), 500); // vent på fade før reset
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setError(null), 500); // vent på fade før reset
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0] ? [e.target.files[0]] : [] );
  }

  const getPic = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/get-pictures");
      if (res.data.pictures) {
        setPictures(res.data.pictures);
      }

    } catch (error) {
        setError("Something went wrong while fetching the pictures");
    }
  };

  const uploadPic = async () => {

    const formData = new FormData();
    formData.append('file', file[0]);

    try {
      await axios.post('http://localhost:4000/api/upload-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      await getPic();
      setSuccess(true);  // axios kaster automatisk error ved feil, så her er vi alltid OK
      setFileName(null);
      setFile([]);

    } catch (error) {
      console.error('Error uploading file:', error);
      setError(error.message);
    }
  };
  useEffect(() =>{
    getPic();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Upload your pics and other files here!</h1>
      </header>
      {success && <div className="px-4 mt-1">
        <span
        className={`inline-block border border-green-500 bg-green-500 text-white px-4 py-2 rounded-xl transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'}`}>
          File uploaded successfully!</span>
      </div>}
      {error && <div className="px-4 mt-1">
        <span
          className={`inline-block border border-red-500 bg-red-500 text-white px-4 py-2 rounded transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'}`}>
            Choose a file to upload</span>
      </div>}
      <FileInput onChange={handleFileChange} fileName={fileName} setFileName={setFileName} />
      
      <main className="container mx-auto p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded"
          onClick={uploadPic}>
          Upload!
        </button>
        <div className='grid grid-cols-5 gap-6 pt-4'>
          {pictures.map((picture) =>(
            <img key={picture.id} src={"http://localhost:4000/images/" + picture.fileName} className='border-2 border-violet-600 object-cover w-full '/>
          ))}
        </div>
      </main>
    </div>
  )

}

export default App
