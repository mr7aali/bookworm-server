import { Model } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews?: string[];
}

interface IBookMethods {
    fullName(): string;
}

export type BookModel = Model<IBook, {}, IBookMethods>;
