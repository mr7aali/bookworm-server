import express from 'express';
import { bookController } from './book.controller';
const router = express.Router();

router.post("/create-book", bookController.create);
router.get("/get-book", bookController.getBooks);
router.get("/all-book", bookController.getAllBooks);
router.get("/get-book/:id", bookController.getBook);
router.delete("/get-book/:id", bookController.deleteBook);

router.post("/delete-book",bookController.deleteByAuthor);

export const BookRoutes = router;