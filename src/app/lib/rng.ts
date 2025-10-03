"use server";
import prisma from "@/app/lib/prisma";
import { Feature, Position, Prisma, Village, VillageFeaturePosition } from "@prisma/client";

const populationFeatureMap: Record<number, number> = {
  400: 1,
  800: 2,
  1200: 3,
  2400: 4,
  4000: 5,
  8000: 7,
  10000: 10,
};

export async function createRandomVillage(name: string, population: number, description: string): Promise<Village> {
  const village = await prisma.village.create({
    data: {
      name: name,
      population: population,
      description: description,
    },
  });

  const features = await getRandomFeatures(numberOfFeaturesByPopulation(population), population);
  if (features) {
    for (const feature of features) {
      const result = await prisma.villageFeature.create({
        data: {
          villageId: village.id,
          featureId: feature.id,
          villageFeaturePositions: {
            createMany: {
              data: await getFeaturePositions(feature),
            },
          },
        },
      });
    }
  }


  return village;
}

function numberOfFeaturesByPopulation(population: number): number {
  const thresholds = Object.keys(populationFeatureMap)
    .map(Number)
    .sort((a, b) => b - a);
  for (const threshold of thresholds) {
    if (population >= threshold) {
      return populationFeatureMap[threshold];
    }
  }
  return 1;
}

async function getRandomFeatures(amount: number, population: number): Promise<Feature[] | null> {
  // this is raw sql, due to the lack of order by random in prisma
  const result: Feature[] = await prisma.$queryRaw(
    Prisma.sql`
            SELECT * FROM "Feature" 
            WHERE "populationNeeded" <= ${population}
            ORDER BY RANDOM() 
            LIMIT ${amount}
        `
  );
  return result || null;
}

async function getFeaturePositions(feature: Feature): Promise<Prisma.VillageFeaturePositionCreateManyVillageFeatureInput[]> {
  const result: Position[] = await prisma.position.findMany({
    where: {
      featureId: feature.id,
    },
  });

  const featurePositions = await Promise.all(
    result.map(async (position) => ({
      positionId: position.id,
      characterName: await getRandomName(),
    })));

  return featurePositions;
}

async function getRandomName(): Promise<string> {
  let firstName: string;
  if (Math.random() < 0.5) {
    const query: Feature[] = await prisma.$queryRaw(
      Prisma.sql`
              SELECT * FROM "FemaleFirstName"
              ORDER BY RANDOM() 
              LIMIT 1
          `
    );
    firstName = query[0].name;
  } else {
    const query: Feature[] = await prisma.$queryRaw(
      Prisma.sql`
              SELECT * FROM "MaleFirstName"
              ORDER BY RANDOM() 
              LIMIT 1
          `
    );
    firstName = query[0].name;
  }
  const lastName: Feature[] = await prisma.$queryRaw(
    Prisma.sql`
              SELECT * FROM "LastName"
              ORDER BY RANDOM() 
              LIMIT 1
          `
  );
  return `${firstName} ${lastName[0].name}`;
}

