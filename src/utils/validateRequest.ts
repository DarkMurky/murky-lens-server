import type { Request } from "express";
import createError from "http-errors";
import type { ZodSchema } from "zod";

export const validateCreateLens = (req: Request, schema: ZodSchema) => {
	const zodSchema = schema;
	const result = zodSchema.safeParse(req.body);
	if (!result.success) {
		const errorMessage = result.error.errors;
		const error = createError(400, JSON.stringify(errorMessage));
		error.isOperational = true;
		throw error;
	}
};

export const validateGetLens = (req: Request, schema: ZodSchema) => {
	const zodSchema = schema;
	const result = zodSchema.safeParse(req.params);
	if (!result.success) {
		const errorMessage = result.error.errors;
		const error = createError(400, JSON.stringify(errorMessage));
		error.isOperational = true;
		throw error;
	}
};

export const validateUpdateLens = (req: Request, schema: ZodSchema) => {
	const zodSchema = schema;
	const result = zodSchema.safeParse({ ...req.body, ...req.params });
	if (!result.success) {
		const errorMessage = result.error.errors;
		const error = createError(400, JSON.stringify(errorMessage));
		error.isOperational = true;
		throw error;
	}
};

export const validateDeleteLens = (req: Request, schema: ZodSchema) => {
	const zodSchema = schema;
	const result = zodSchema.safeParse(req.params);
	if (!result.success) {
		const errorMessage = result.error.errors;
		const error = createError(400, JSON.stringify(errorMessage));
		error.isOperational = true;
		throw error;
	}
};
