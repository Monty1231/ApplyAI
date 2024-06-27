import{ useState } from 'react';
//import './App.css';
import { initializeOpenAIClient } from './api/openaiClient';

function App() {
  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleSend = async () => {
    if (userInput.trim()) {
      const openAIResponse = await initializeOpenAIClient(userInput);
      setResponse(openAIResponse ?? 'No response from OpenAI'); // Default to a non-null string
    } else {
      setResponse('Please enter a message.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>OpenAI Chat</h1>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value ?? '')} // Using nullish coalescing operator
          placeholder="Type your message here"
        />
        <button onClick={handleSend}>Send</button>
        <div id="response">{response}</div>
      </header>
    </div>
  );
}

export default App;
