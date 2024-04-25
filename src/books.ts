import type { Prisma } from "@prisma/client";
import { db } from "./db";

export type BookOutput = Prisma.BookCreateInput;
export type BooksOutput = Prisma.BookCreateManyInput;
export type BookByIdOutput = Prisma.BookAvgAggregateOutputType;
export type BookAvailabilityOutput = { available: boolean | undefined };

export const newBook = async (
  title: string,
  pages: number,
  available: boolean,
  libraryId: number,
  authorId: number
) => {
  const result = await db.book.create({
    data: {
      title,
      pages,
      available,
      libraryId,
      authorId,
    },
  });
  return result;
};

export const findBooksByAuthor = async (authorId: number): Promise<BooksOutput[] | null> => {
  const result = await db.book.findMany({
    where: { authorId },
  });
  return result === null ? (console.log("No book matches your criteria"), null) : result;
};

export const findBooksByLibrary = async (libraryId: number): Promise<BooksOutput[] | null> => {
  const result = await db.book.findMany({
    where: { libraryId },
  });
  return result === null ? (console.log("No book matches your criteria"), null) : result;
};

export const findBooksByTitle = async (title: string): Promise<BooksOutput[] | null> => {
  const result = await db.book.findMany({
    where: { title },
  });
  return result === null ? (console.log("No book matches your criteria"), null) : result;
};

export const findBookById = async (bookId: number): Promise<BookOutput | null> => {
  const result = await db.book.findFirst({ where: { bookId } });
  return result === null ? (console.log("No book matches your criteria"), null) : result;
};

export const bookAvailability = async (bookId: number): Promise<BookAvailabilityOutput | null> => {
  const result = await findBookById(bookId);
  if (result === null) {
    console.log("No book matches your criteria");
    return null;
  }
  return { available: result.available };
};
