import { Card, Grid, Space, Text } from "@mantine/core";
import prisma from "../lib/prisma";
import VillageCard from "./VillageCard";
import CreateModal from "./CreateModal";

export default async function CardRow() {
    const villages = await prisma.village.findMany();

    return (
        <Grid>
            {villages.length === 0 ? (
                <Card withBorder shadow="sm" radius="md" padding="lg">
                    <Text>No villages found</Text>
                    <Space h="md"></Space>
                    <CreateModal />
                </Card>
            ) : (
                villages.map((village) => (
                    <VillageCard village={village} key={village.id} />
                ))
            )
            }
        </Grid>
    );
}
