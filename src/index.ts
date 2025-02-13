import config from "config";
import cors from "cors";
import dotenv from "dotenv";
import express, { type Express } from "express";

import deserializeUser from "@middleware/deserializeUser";
import routes from "@routes/index";
import globalErrorHandler from "@utils/errorHandling";

dotenv.config();

const app: Express = express();

app.use(
	cors({
		origin: "*",
	}),
);

const serverPort = config.get<number>("server_port");
const serverHost = config.get<string>("server_host");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(deserializeUser);
app.use(routes);
app.use(globalErrorHandler);

app.listen(serverPort, () => {
	console.log(`[server]: Server is running at http://${serverHost}:${serverPort}`);
});
