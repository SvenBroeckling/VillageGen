import { Card, Flex, Space, Text } from "@mantine/core";
import VillageCard from "./VillageCard";
import prisma from "../lib/prisma";
import CreateModal from "./CreateModal";

export default async function CardRow() {
    const villages = await prisma.village.findMany();

    return (
        <Flex gap="xs">
            {
                villages.length === 0 &&
                <Flex justify="center" align="center" h="50vh" w="100%">
                    <Card withBorder shadow="sm" radius="md" padding="lg">
                        <Text>No villages found</Text>
                        <Space h="md"></Space>
                        <CreateModal />
                    </Card>
                </Flex>
            }
            {
                villages.map((village, i) => (
                    <VillageCard village={village} key={i} />
                ))
            }
        </Flex>
    );
}
