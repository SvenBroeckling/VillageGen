import { Card, Flex, Grid, Space, Text } from "@mantine/core";
import prisma from "../lib/prisma";
import VillageCard from "./VillageCard";

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
                <Flex justify="center" align="center" h="50vh" w="100%">
                    <Card withBorder shadow="sm" radius="md" padding="lg">
                        <Text>No villages found</Text>
                        <Space h="md"></Space>
                        <Text c="dimmed">Create one</Text>
                    </Card>
                </Flex>
            ) : (
                villages.map((village) => (
                    <VillageCard village={village} key={village.id} />
                ))
            )
            }
        </Grid>
    );
}
