const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    genre: "Classic",
    cover: "https://picsum.photos/200?1"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    price: 10.99,
    genre: "Dystopian",
    cover: "https://picsum.photos/200?2"
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 14.5,
    genre: "Classic",
    cover: "https://picsum.photos/200?3"
  },
  {
    id: 4,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 18.99,
    genre: "Fantasy",
    cover: "https://picsum.photos/200?4"
  },
  {
    id: 5,
    title: "Dune",
    author: "Frank Herbert",
    price: 22.0,
    genre: "Sci-Fi",
    cover: "https://picsum.photos/200?5"
  },
  {
    id: 6,
    title: "Harry Potter",
    author: "J.K. Rowling",
    price: 19.99,
    genre: "Fantasy",
    cover: "https://picsum.photos/200?6"
  },
  {
    id: 7,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 11.99,
    genre: "Fiction",
    cover: "https://picsum.photos/200?7"
  },
  {
    id: 8,
    title: "Atomic Habits",
    author: "James Clear",
    price: 16.99,
    genre: "Self-Help",
    cover: "https://picsum.photos/200?8"
  }
];

export function getBooks() {
  return mockBooks;
}

export function getBookById(id) {
  return mockBooks.find(b => b.id === Number(id));
}
