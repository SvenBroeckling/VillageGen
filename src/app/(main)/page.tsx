"use client";
import { Container, Tabs } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import CardRow from "../components/CardRow";

export default function Home() {
    return (
        <Tabs defaultValue="villages">
            <Tabs.List justify="center">
                <Tabs.Tab value="villages" leftSection={<IconHome size={12} />}>
                    Villages
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="villages">
                <Container p="lg">
                    <CardRow />
                </Container>
            </Tabs.Panel>
        </Tabs>
    );
}
