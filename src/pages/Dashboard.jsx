import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const initial = [
    {
      role: 'system',
      content: 'Eres un asistente que recopila nombre, email y teléfono del cliente y los guarda en nuestra base de datos.'
    }
  ];

  const [msgs, setMsgs] = useState(initial);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMsg = { role: 'user', content: input };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs);
    setInput('');

    try {
      const { data } = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: newMsgs
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMsgs([...newMsgs, data.choices[0].message]);
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
    }
  };

  return (
    <div>
      <h2>Chat de Atención</h2>
      <div style={{ height: 300, overflow: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {msgs.map((m, i) => (
          <p key={i}><b>{m.role}:</b> {m.content}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
