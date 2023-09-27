"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/create-book", book_controller_1.bookController.create);
router.get("/get-book", book_controller_1.bookController.getBooks);
router.get("/get-book/:id", book_controller_1.bookController.getBook);
router.delete("/delete-book/:id", book_controller_1.bookController.deleteBook);
router.patch("/update-book/:id", book_controller_1.bookController.update);
// router.post("/delete-book",bookController.deleteByAuthor);
exports.BookRoutes = router;
