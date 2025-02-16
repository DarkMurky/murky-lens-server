import dotenv from "dotenv";
import express, { type Express } from "express";
import cors from "cors";

import globalErrorHandler from "@utils/errorHandling";
import routes from "@routes/index";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(
	cors({
		origin: "*",
	}),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
