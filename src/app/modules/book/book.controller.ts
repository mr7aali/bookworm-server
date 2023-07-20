import { NextFunction, Request, RequestHandler, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { bookService } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status';
import { IBook } from "./book.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

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
const getBooks = catchAsync(//! i have to add pagination
    async (req: Request, res: Response) => {

        const paginationOptions = pick(req.query, paginationFields)
        // console.log(paginationOptions);
        const result = await bookService.getBooks(paginationOptions);
        sendResponse<IBook[] | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Books got successfully!',
            meta: result.meta,
            data: result.data,
        })
    }
);
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
);
const deleteByAuthor = catchAsync(//single book
    async (req: Request, res: Response) => {
        const {id, email }= req.body;
     


        const result = await bookService.deleteByAuthor(id,email);
    //     sendResponse<IBook | null>(res, {
    //         statusCode: httpStatus.OK,
    //         success: true,
    //         message: 'Deleted successfully!',
    //         data: result,
    //     })
    // }
    }
);
const getAllBooks = catchAsync(
    async (req: Request, res: Response) => {
        const result = await bookService.getAllBooks();


        sendResponse<IBook[] | null>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'books received successfully!',
            data: result,
        })
    }


)






export const bookController = {
    create, getAllBooks,
    getBooks, getBook,
    deleteBook,deleteByAuthor
}