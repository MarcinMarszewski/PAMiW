import { useState } from 'react';

export default function Home() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Wysyłamy dane do API
    const res = await fetch('/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number1, number2 }),
    });

    const data = await res.json();

    // Ustawiamy wynik
    setResult(data.result);
  };

  return (
    <div>
      <h1>Prosty Kalkulator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="number1">Liczba 1:</label>
          <input
            type="number"
            id="number1"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="number2">Liczba 2:</label>
          <input
            type="number"
            id="number2"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
            required
          />
        </div>
        <button type="submit">Dodaj</button>
      </form>

      {result !== null && (
        <div>
          <h2>Wynik: {result}</h2>
        </div>
      )}
    </div>
  );
}