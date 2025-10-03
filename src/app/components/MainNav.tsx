import { Group } from "@mantine/core";
import CreateModal from "./CreateModal";

export function MainNav() {

    return (
        <Group justify="end" align="center" h="100%" p="md">
            <CreateModal />
        </Group>
    )
}
