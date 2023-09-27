"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const book_model_1 = require("./book.model");
const paginationsHelpers_1 = require("../../../helpers/paginationsHelpers");
const create = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.create(data);
    console.log(book);
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create book");
    }
    return book;
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, data, { new: true });
    return result;
});
const getBooks = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // const { page = 1, limit = 2 } = paginationOptions;
    // const skip = (page - 1) * limit;
    const { skip, page, limit, sortBy, sortOrder } = (0, paginationsHelpers_1.calculatePagination)(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const books = yield book_model_1.Book.find().sort(sortCondition).skip(skip).limit(limit);
    if (!books) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "books are not exists");
    }
    const total = yield book_model_1.Book.countDocuments();
    // console.log("get books");
    return {
        meta: {
            page,
            limit,
            total
        },
        data: books
    };
});
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.findById(id);
    if (!books) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "book are not exists");
    }
    return books;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.findOneAndDelete({ _id: id });
    console.log(books);
    if (!books) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "book are aredy deleted");
    }
    return books;
});
exports.bookService = {
    create,
    getBooks,
    getBook, deleteBook, update
};
