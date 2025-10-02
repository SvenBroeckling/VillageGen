import { Button, Group } from "@mantine/core";

export function MainNav() {

    return (
        <Group justify="end" align="center" h="100%" p="md">
            <Button variant="light">Register</Button>
            <Button
                component="a"
                href="/login"
            >Login</Button>
        </Group>
    )
}
