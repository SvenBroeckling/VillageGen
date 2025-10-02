"use server";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

type CreateVillageInput = {
  name: string;
  population: number;
  description: string;
};

export async function createVillage(values: CreateVillageInput) {
  try {
    const village = await prisma.village.create({
      data: values,
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: "Failed to create village" };
  }
}
