import { Flex } from "@mantine/core";
import VillageCard from "./VillageCard";

export default function CardRow() {
    return (
        <Flex gap="xs">
            <VillageCard />
            <VillageCard />
            <VillageCard />
            <VillageCard />
            <VillageCard />
        </Flex>
    );
}
