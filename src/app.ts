import express from "express";
const app = express()
export const port = 5000
import cors from 'cors';
// import cookieParser from 'cookie-parser';
import router from "./app/routes";


app.use(cors());
//parser
// app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', router);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;