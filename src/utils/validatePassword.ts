import argon2 from "argon2";

export const validatePassword = async (password: string, incomingPassword: string) => {
	return await argon2.verify(password, incomingPassword);
};
