import { z } from "zod";

const lensSchema = {
	name: z.string().max(16, "Name must be at most 16 characters long").nonempty("Name cannot be empty"),
	desc: z.string().max(30, "Description must be at most 30 characters long").nonempty("Description cannot be empty"),
	iconUrl: z.string().nonempty("Icon URL cannot be empty"),
	location: z.string().nonempty("Location cannot be empty"),
};

const lensIdSchema = {
	id: z
		.string()
		.refine((val) => !Number.isNaN(Number(val)), {
			message: "Lens id must be a number",
		})
		.transform((val) => Number(val)),
};

export const zodCreateLenseSchema = z.object({
	name: z.string().max(16, "Name must be at most 16 characters long").nonempty("Name cannot be empty"),
	desc: z.string().max(30, "Description must be at most 30 characters long").nonempty("Description cannot be empty"),
	iconUrl: z.string().nonempty("Icon URL cannot be empty"),
	location: z.string().nonempty("Location cannot be empty"),
});

export const zodGetLenseSchema = z.object(lensIdSchema);

export const zodUpdateLenseSchema = z.object({
	...lensSchema,
	...lensIdSchema,
});

export const zodDeleteLenseSchema = z.object(lensIdSchema);

export const zodLoginSchema = z.object({
    email: z.string()
        .trim()
        .email("Invalid email format.")
        .nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
});

export const zodRegisterSchema = z.object({
    email: z.string()
        .trim()
        .email("Invalid email format.")
        .nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
});
