import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = {
      name,
      author,
      pages
    };

    try {
      const response = await fetch('/api/book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });

      if (response.ok) {
        console.log('Book saved to database');
      } else {
        console.error('Error saving book to database');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>books</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Book Name"
        />
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Book Author"
        />
        <input
          type="number"
          id="pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          placeholder="Book Pages"
        />
        <button type="submit" id="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
