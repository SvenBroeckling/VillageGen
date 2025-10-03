"use client"
import {Card, Flex, Text, Title} from "@mantine/core";

export default function WelcomePanel() {
    return (
        <Flex justify="center" align="center" h="50vh" w="100%">
            <Card withBorder shadow="sm" radius="md" padding="lg" w={{xs: "100%", sm: 600}}>
                <Title order={2} ta="center">Village Generator</Title>
                <Text mt="lg">
                    This is a small learning project to refresh React and TypeScript and get to know Prisma ORM.

                    It generates random villages from source data by assigning features (buildings, etc.) and assigning named people to positions within the features.
                </Text>
                <Text mt="lg">
                    Start by clicking the "Create Village" button in the top right corner.
                </Text>
            </Card>
        </Flex>
    )
}
