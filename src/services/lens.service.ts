import type { Prisma } from "@prisma/client";
import prisma from "../utils/initializePrismaClient";

export function createLens(input: Prisma.LensCreateInput) {
	return prisma.lens.create({
		data: {
			name: input.name,
			desc: input.desc,
			iconUrl: input.iconUrl,
			location: input.location,
		},
	});
}

export function updateLens(input: Prisma.LensCreateInput, id: string) {
	return prisma.lens.update({
		where: {
			id: Number(id),
		},
		data: input,
	});
}

export function getAllLenses() {
	return prisma.lens.findMany();
}

export function getLense(id: string) {
	return prisma.lens.findUnique({
		where: {
			id: Number(id),
		},
	});
}

export function deleteLense(id: string) {
	return prisma.lens.delete({
		where: {
			id: Number(id),
		},
	});
}
