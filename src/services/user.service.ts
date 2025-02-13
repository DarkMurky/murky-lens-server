import prisma from "../utils/initializePrismaClient";

export function findUserById(id: string) {
	return prisma.user.findUnique({
		where: {
			id: Number(id),
		},
	});
}

export function findUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: {
			email: email,
		},
	});
}
