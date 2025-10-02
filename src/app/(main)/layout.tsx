"use client";

import {AppShell} from '@mantine/core';
import {MainNav} from '@/app/components/MainNav';

export default function MainAppLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <AppShell
            header={{height: 60}}
            padding="md"
        >
            <AppShell.Header>
                <MainNav/>
            </AppShell.Header>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
}