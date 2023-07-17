import express from "express";
const app = express()
export const port = 5000
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import sendResponse from "./shared/sendResponse";
import httpStatus from "http-status";


app.use(cors());
//parser
// app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
//global error handler
app.use(globalErrorHandler);

//handle not found route

app.use((req, res, nex) => {
  sendResponse(res, {
    statusCode: httpStatus.NOT_FOUND,
    success: false,
    message:"not found",
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;