import { Model } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    genre: string;
    publicationDate: string;
    reviews?: string[];
    email: string;
    image:string;
    wishList?:string[];
    markAsReadList?:string[];
}

interface IBookMethods {
    fullName(): string;
}

export type BookModel = Model<IBook, {}, IBookMethods>;
