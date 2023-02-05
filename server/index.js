import express from 'express';
import multer from "multer";
import { partsOfSpeechHandler } from "./handlers/speechHandler.js";
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const app = express();

var upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", async (req, res) => {
    try {
        const queryparams = req.query.name;
        const data = await partsOfSpeechHandler(queryparams);
        res.json({ message: "success", data });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
        res.status(200).send({data: 'uploaded successfully'});
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});