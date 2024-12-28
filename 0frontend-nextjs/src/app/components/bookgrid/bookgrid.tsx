"use client";

import BookCard from "./Bookcard";



const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage: "https://www.mockupworld.co/wp-content/uploads/2022/04/standing-softcover-book-mockup-psd.jpg",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    coverImage: "https://www.mockupworld.co/wp-content/uploads/2022/04/standing-softcover-book-mockup-psd.jpg",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage: "https://www.mockupworld.co/wp-content/uploads/2022/04/standing-softcover-book-mockup-psd.jpg",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage: "https://www.mockupworld.co/wp-content/uploads/2022/04/standing-softcover-book-mockup-psd.jpg",
  },
  {
    id: 5,
    title: "Moby Dick",
    author: "Herman Melville",
    coverImage: "https://www.mockupworld.co/wp-content/uploads/2022/04/standing-softcover-book-mockup-psd.jpg",
  },
  {
    id: 6,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverImage: "https://www.mockupworld.co/wp-content/uploads/2022/04/standing-softcover-book-mockup-psd.jpg",
  },
];

export default function BookGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          coverImage={book.coverImage}
        />
      ))}
    </div>
  );
}
