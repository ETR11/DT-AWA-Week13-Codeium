import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate, Outlet, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { bookName } = useParams();
  const navigate = useNavigate();

  // Fetch the book details based on `bookName`

  return (
    <div>
      <h1>Book Details</h1>
      <p>Name: {bookName}</p>
      {/* Display other book details */}
    </div>
  );
}



function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>This is not the webpage you are looking for.</p>
    </div>
  );
}


function App() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const navigate = useNavigate();

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
    navigate(`/book/${name}`);
  };

  return (
    <Router>
      <div>
        <h1>books</h1>
        <Routes>
          {/* Other routes */}
          <Route path="/book/:bookName" element={<BookDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
    </Router>
  );
}

export default App;
