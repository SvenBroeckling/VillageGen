import { Button, Card, Space, Text } from "@mantine/core";
import { Village } from "@prisma/client";

export default async function VillageCard({ village }: { village: Village }) {
    return (
        <Card shadow="sm" radius="md" padding="lg" withBorder>
            <Text fw={500}>{village.name}</Text>
            <Text size="sm" c="dimmed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </Text>
            <Space h="md" />
            <Button color="blue" fullWidth>Show</Button>
        </Card>
    )
}

