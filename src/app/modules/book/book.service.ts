import { IBook } from "./book.interface"
import { Book } from "./book.model"

const create = async (data: IBook): Promise<IBook> => {
    const admin = await Book.create(data);

    return admin;
}
const getBooks = async (): Promise<IBook[] | null> => {
    const books = await Book.find({});
    return books;
}
const getBook = async (id: string): Promise<IBook | null> => {
    const books = await Book.findById(id);
    return books;
}
const deleteBook = async (id: string): Promise<IBook | null> => {
    const books = await Book.findOneAndDelete({ _id:id });
    console.log(books);
    return books;
}

export const bookService = {
    create,
    getBooks,
    getBook, deleteBook
}