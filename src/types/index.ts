export interface IerrorHandlingCustomError extends Error {
	statusCode: number;
	status: string;
	isOperational: boolean;
	code: string;
	meta: {
		target: string[];
	};
}
