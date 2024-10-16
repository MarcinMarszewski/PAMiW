import { useEffect, useState } from 'react';

export default function Home() {
  const [quotes, setQuotes] = useState<string[]>([]);
  const [newQuote, setNewQuote] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingQuote, setEditingQuote] = useState('');

  // Ładowanie cytatów z Local Storage po załadowaniu komponentu
  useEffect(() => {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      setQuotes(JSON.parse(storedQuotes));
    }
  }, []);

  // Aktualizacja Local Storage, gdy zmieniają się cytaty
  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  // Funkcja dodawania nowego cytatu
  const addQuote = () => {
    if (newQuote.trim() !== '') {
      setQuotes([...quotes, newQuote]);
      setNewQuote('');
    }
  };

  // Funkcja usuwania cytatu
  const deleteQuote = (index: number) => {
    const updatedQuotes = quotes.filter((_, i) => i !== index);
    setQuotes(updatedQuotes);
  };

  // Funkcja rozpoczęcia edycji
  const startEditQuote = (index : number) => {
    setEditingIndex(index);
    setEditingQuote(quotes[index]);
  };

  // Funkcja zapisywania edytowanego cytatu
  const saveEditedQuote = () => {
    const updatedQuotes = [...quotes];
    if (editingIndex !== null) {
      updatedQuotes[editingIndex] = editingQuote;
    }
    setQuotes(updatedQuotes);
    setEditingIndex(null);
    setEditingQuote('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Favorite Quotes</h1>

      {/* Formularz dodawania cytatu */}
      <div>
        <input
          type="text"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
          placeholder="Enter your favorite quote"
        />
        <button onClick={addQuote}>Add Quote</button>
      </div>

      {/* Lista cytatów */}
      <ul>
        {quotes.map((quote, index) => (
          <li key={index} style={{ margin: '10px 0' }}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editingQuote}
                  onChange={(e) => setEditingQuote(e.target.value)}
                />
                <button onClick={saveEditedQuote}>Save</button>
                <button onClick={() => setEditingIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{quote}</span>
                <button onClick={() => startEditQuote(index)}>Edit</button>
                <button onClick={() => deleteQuote(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
