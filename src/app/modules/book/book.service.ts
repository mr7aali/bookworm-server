import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "./book.interface"
import { Book } from "./book.model"

const create = async (data: IBook): Promise<IBook> => {
    const book = await Book.create(data);
    if (!book) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create book")
    }
    return book;
}
const getBooks = async (): Promise<IBook[] | null> => {
    const books = await Book.find({});
    if (!books) {
        throw new ApiError(httpStatus.BAD_REQUEST, "books are not exists")
    }
    return books;
}
const getBook = async (id: string): Promise<IBook | null> => {
    const books = await Book.findById(id);

    if (!books) {
        throw new ApiError(httpStatus.BAD_REQUEST, "book are not exists")
    }
    return books;
}
const deleteBook = async (id: string): Promise<IBook | null> => {
    const books = await Book.findOneAndDelete({ _id: id });
    console.log(books);
    if (!books) {
        throw new ApiError(httpStatus.BAD_REQUEST, "book are aredy deleted")
    }
    return books;
}

export const bookService = {
    create,
    getBooks,
    getBook, deleteBook
}