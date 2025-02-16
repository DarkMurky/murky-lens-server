import type { Prisma } from "@prisma/client";
import prisma from "../utils/initializePrismaClient";

import { signJwt } from "../utils/jwt";

export function createUser(input: Prisma.UserCreateInput) {
	return prisma.user.create({
		data: {
			email: input.email,
			password: input.password,
		},
	});
}

export async function createSession(user: Prisma.UserUncheckedCreateInput) {
	return prisma.session.create({ data: { user: { connect: { id: user.id } } } });
}

export async function findSessionById(id: string) {
	return prisma.session.findUnique({
		where: {
			id: Number(id),
		},
	});
}

export function findUserById(id: number) {
	return prisma.user.findUnique({
		where: {
			id: Number(id),
		},
	});
}

export async function findUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: {
			email: email,
		},
		select: {
			id: true,
			email: true,
			password: true,
		},
	});
}

export async function signRefreshToken(id: number) {
	const refreshToken = signJwt(
		{
			session: id,
		},
		"REFRESH_PRIVATE_KEY",
		{
			expiresIn: "1y",
		},
	);
	return refreshToken;
}

export function signAccessToken(user: Prisma.UserCreateInput) {
	const { password: userPassword, ...userWithoutPassword } = user;

	const payload = user;
	const accessToken = signJwt(payload, "ACCESS_TOKEN_PRIVATE_KEY", {
		expiresIn: "60s",
	});
	return accessToken;
}
