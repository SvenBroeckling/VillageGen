"use client";
import {Card, Grid, Space, Text} from "@mantine/core";
import {Village} from "@prisma/client";
import React from "react";

type VillageWithDetails = Village & {
    villageFeatures: ({
        id: number;
        feature: { name: string };
        villageFeaturePositions: ({
            position: { name: string };
            characterName: string;
            id: number;
        })[];
    })[];
};

export default function VillageCard({ village }: { village: VillageWithDetails }) {
    return (
        <Grid.Col key={village.id} span={{ base: 12, md: 6, lg: 3 }}>
            <Card shadow="sm" radius="md" padding="lg" withBorder>
                <Text fw={500}>{village.name}</Text>
                <Text size="sm" c="dimmed">
                    {village.description}
                </Text>
                <Space h="md" />
                <Text size="sm" c="dimmed">
                    {village.population} people
                </Text>

                <Space h="md" />
                <div>
                    {village.villageFeatures.map((villageFeature) => (
                        <React.Fragment key={villageFeature.id}>
                            <Text fw={500} size="sm">{villageFeature.feature.name}</Text>
                            {villageFeature.villageFeaturePositions.map((pos) => (
                                <Text key={pos.id} size="xs" c="dimmed" ml="md">
                                    {pos.position.name} - {pos.characterName}
                                </Text>
                            ))}
                            <Space h="xs" />
                        </React.Fragment>
                    ))}
                </div>
            </Card>
        </Grid.Col>
    )
}

