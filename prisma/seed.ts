import fs from "node:fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ReadFeature {
  name: string,
  population: number,
  positions: Array<string>
}

async function readNames(type: string): Promise<Array<string>> {
  const data = await fs.readFile(`prisma/resources/${type}_names.txt`, "utf8");
  return data.split(/\r?\n/).filter(line => line.trim() !== '').map((str) => { return str[0].toUpperCase() + str.slice(1) });
}

async function readFeatures(): Promise<Array<ReadFeature>> {
  const data = await fs.readFile("prisma/resources/features.txt", "utf8");
  const result = [];
  for (const line of data.split("\n")) {
    if (!line) {
      continue;
    }
    const [name, population, positions] = line.split(";");
    result.push({
      name,
      population: parseInt(population),
      positions: positions.split(","),
    });
  }
  return result;
}


async function main() {
  // Features and positions
  const featuresInput = await readFeatures();
  for (const featureInput of featuresInput) {
    const feature = await prisma.feature.create({
      data: {
        name: featureInput.name,
        populationNeeded: featureInput.population,
      }
    });
    for (const position of featureInput.positions) {
      await prisma.position.create({
        data: {
          name: position,
          featureId: feature.id,
        }
      });
    }
  }

  // Names
  const femaleNames = await readNames("female_first");
  const maleNames = await readNames("male_first");
  const lastNames = await readNames("last");

  await prisma.femaleFirstName.createMany({
    data: femaleNames.map(name => ({ name })),
    skipDuplicates: true,
  });

  await prisma.maleFirstName.createMany({
    data: maleNames.map(name => ({ name })),
    skipDuplicates: true,
  });

  await prisma.lastName.createMany({
    data: lastNames.map(name => ({ name })),
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });

