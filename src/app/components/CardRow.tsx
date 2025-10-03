import {Grid} from "@mantine/core";
import prisma from "../lib/prisma";
import VillageCard from "./VillageCard";
import WelcomePanel from "@/app/components/WelcomePanel";

export default async function CardRow() {
    const villages = await prisma.village.findMany({
        include: {
            villageFeatures: {
                include: {
                    feature: true,
                    villageFeaturePositions: {
                        include: {
                            position: true,
                        },
                    }
                },
            },
        },
    });

    return (
        <Grid>
            {villages.length === 0 ? (
                <WelcomePanel />
            ) : (
                villages.map((village) => (
                    <VillageCard village={village} key={village.id} />
                ))
            )
            }
        </Grid>
    );
}
