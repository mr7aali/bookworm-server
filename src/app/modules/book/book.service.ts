import { SortOrder } from 'mongoose';
import { IGenericResponse } from './../../../interfaces/common';
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IBook } from "./book.interface"
import { Book } from "./book.model"
import { IPaginationOptions } from "../../../interfaces/pagination";
import { calculatePagination } from '../../../helpers/paginationsHelpers';


const create = async (data: IBook): Promise<IBook> => {
    const book = await Book.create(data);
    if (!book) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create book")
    }
    return book;
}


const getBooks = async (paginationOptions: IPaginationOptions): Promise<IGenericResponse<IBook[] | null>> => {//! i have to add pagination


    // const { page = 1, limit = 2 } = paginationOptions;
    // const skip = (page - 1) * limit;
    const { skip, page, limit, sortBy, sortOrder } =
        calculatePagination(paginationOptions);


    const sortCondition: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
 

    console.log(sortCondition);
    const books = await Book.find().sort(sortCondition).skip(skip).limit(limit);
    if (!books) {
        throw new ApiError(httpStatus.BAD_REQUEST, "books are not exists")
    }
    const total = await Book.countDocuments()
    // console.log("get books");
    return {
        meta: {
            page,
            limit,
            total
        },
        data: books
    };


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