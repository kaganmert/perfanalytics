import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dbConnection } from "./src/utils/helper";
import { defaultRouter } from "./src/routes/metrics.route";

dotenv.config();

export const app = express();
const port = process.env.PORT;

dbConnection(process.env.MONGODB_URI as string);

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
defaultRouter(app);
app.listen(port, () => console.log(`Server listening on port:${port} 🎧`));
