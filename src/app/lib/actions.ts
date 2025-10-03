"use server";
import { revalidatePath } from "next/cache";
import { createRandomVillage } from "./rng";

type CreateVillageInput = {
  name: string;
  population: number;
  description: string;
};

export async function createVillage(values: CreateVillageInput) {
  try {
    await createRandomVillage(values.name, values.population, values.description);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return { error: "Failed to create village" };
  }
}
