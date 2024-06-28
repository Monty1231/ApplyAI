import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS
import { initializeOpenAIClient } from './api/openaiClient';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  }; 
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany(event.target.value);
  };
  const handlePositionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value);
  }
  const handleSend = async () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = async (event: ProgressEvent<FileReader>) => {
        const fileContent = event.target?.result as string;
        const prompt = `Make sure to include the provided information: The date is ${date}, The name of the company is ${company}, The name of the position is ${position}, with this information in mind, Generate a cover letter for the following resume: ${fileContent}`;
        const openAIResponse = await initializeOpenAIClient(prompt);
        setResponse(openAIResponse ?? 'No response from OpenAI');
        setIsEditing(true);
      };
      fileReader.readAsText(selectedFile);
    } else {
      setResponse('Please select a file.');
    }
  };

  const handleResponseChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(event.target.value);
  };

  return (
<div className = "custom-background">
    <div className="container text-center">
      <div className="App">
        <header className="App-header custom-header">
          <h1>ApplyAI</h1>
          <div className="form-group">
            <label htmlFor="date">Input the date:</label>
            <input
              type="text"
              className="form-control"
              id="date"
              name="date"
              value={date}
              onChange={handleDateChange}
              placeholder="MM/DD/YYYY"
            />
          </div>
          <div className="form-group">
            <label htmlFor="company">Input the company:</label>
            <input
              type="text"
              className="form-control"
              id="company"
              name="company"
              value={company}
              onChange={handleCompanyChange}
              placeholder="Enter Company name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Input the position:</label>
            <input
              type="text"
              className="form-control"
              id="position"
              name="position"
              value={position}
              onChange={handlePositionChange}
              placeholder="Enter Position name"
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              accept=".txt,.pdf,.docx"
              onChange={handleFileChange}
            />
          </div>
          <button className="btn custom-button" onClick={handleSend}>Send</button>
          {isEditing ? (
            <textarea
              className="form-control mt-3 custom-textarea"
              value={response}
              onChange={handleResponseChange}
              rows={40}
              cols={100}
            />
          ) : (
            <div id="response" className="mt-3">{response}</div>
          )}
        </header>
      </div>
    </div>
    </div>
  );
  
}

export default App;
