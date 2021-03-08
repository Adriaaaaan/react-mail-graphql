import { useEffect, useState } from 'react';
import './App.css';
import Message from './components/message.js';



function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      setMessages(await (await fetch('//localhost:5000/rest/messages')).json());
    };
    fetchMessages();
  }, []);
  return (
    <div className="App">
      {
      messages.map(message => (
        <Message message={message}/>
      ))
      }
    </div>
  );
}

export default App;
