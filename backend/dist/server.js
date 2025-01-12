import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server listening at PORT ", PORT);
});
