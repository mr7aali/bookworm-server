import express from 'express';
import { bookController } from './book.controller';
const router = express.Router();

router.post("/create-book", bookController.create);
router.get("/get-book", bookController.getBooks);

router.get("/get-book/:id", bookController.getBook);

router.delete("/delete-book/:id", bookController.deleteBook);
router.patch("/update-book/:id",bookController.update)

// router.post("/delete-book",bookController.deleteByAuthor);

export const BookRoutes = router;