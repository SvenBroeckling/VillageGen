"use client";
import { Button, Card, Grid, Space, Text } from "@mantine/core";
import { Village } from "@prisma/client";

export default function VillageCard({ village }: { village: Village }) {
    return (
        <Grid.Col key={village.id} span={{ base: 12, md: 6, lg: 4 }}>
            <Card shadow="sm" radius="md" padding="lg" withBorder>
                <Text fw={500}>{village.name}</Text>
                <Text size="sm" c="dimmed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </Text>
                <Space h="md" />
                <Button color="blue" fullWidth>Show</Button>
            </Card>
        </Grid.Col>
    )
}

