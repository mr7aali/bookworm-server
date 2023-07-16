import { NextFunction, Request, RequestHandler, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { bookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status';
import { IBook } from "./book.interface";

const create: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {

        const data = req.body;
        const result = await bookService.create(data);
        sendResponse<IBook>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Book created successfully!',
            data: result,
        })
    }
);

const getBook = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await bookService.getBook(id);
        sendResponse<IBook | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Books details got successfully!',
            data: result,
        })
    }
)
const getBooks = catchAsync(//single book
    async (req: Request, res: Response) => {
        const result = await bookService.getBooks();
        sendResponse<IBook[] | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Books got successfully!',
            data: result,
        })
    }
)
const deleteBook = catchAsync(//single book
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await bookService.deleteBook(id);
        sendResponse<IBook | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Deleted successfully!',
            data: result,
        })
    }
)




export const bookController = {
    create,
    getBooks,
    getBook,
    deleteBook
}