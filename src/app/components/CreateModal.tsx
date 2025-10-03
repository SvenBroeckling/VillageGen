"use client";
import { Button, Modal, NumberInput, Textarea, TextInput } from "@mantine/core";
import { createVillage } from "@/app/lib/actions";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

interface FormValues {
    name: string;
    population: number;
    description: string;
}

export default function CreateModal() {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm<FormValues>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            population: 4000,
            description: "",
        },
        validate: {
            name: (value) => value.length > 0 ? null : "Name is required",
            population: (value) => value > 0 ? null : "Population must be greater than 0",
            description: (value) => value.length > 0 ? null : "Description is required",
        },
    });

    const handleSubmit = async (values: FormValues) => {
        await createVillage(values);
        form.reset();
        close();
    }

    return (
        <>
            <Modal
                centered
                title="Create Village"
                opened={opened}
                onClose={close}>
                <form method="post" onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Name"
                        placeholder="Name"
                        name={"name"}
                        key={form.key('name')}
                        {...form.getInputProps("name")}
                    />
                    <NumberInput
                        label="Population"
                        placeholder="Population"
                        name={"population"}
                        key={form.key('population')}
                        {...form.getInputProps("population")}
                    />
                    <Textarea
                        label="Description"
                        placeholder="Description"
                        name={"description"}
                        key={form.key('description')}
                        {...form.getInputProps("description")}
                    />
                    <Button type="submit" mt="sm" fullWidth>
                        Submit
                    </Button>
                </form>
            </Modal>
            <Button onClick={open}>Create Village</Button>
        </>
    )
}
