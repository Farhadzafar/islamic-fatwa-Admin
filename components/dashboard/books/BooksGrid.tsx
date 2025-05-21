// BooksGrid.tsx
import { BookCard } from "./BookCard";

export default function BooksGrid({ books }: { books: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}
