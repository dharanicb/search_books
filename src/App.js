import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [books, setBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    axios.get('/api/books.json').then(response => {
      setBooks(response.data)
    })
  }, [])

  const handleSearch = event => {
    setSearchQuery(event.target.value)
  }

  const filteredBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div>
      <h1>Book List</h1>
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul>
        {filteredBooks.map(book => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} - {book.genre}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
