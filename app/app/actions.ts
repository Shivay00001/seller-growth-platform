'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createWorkspace(name: string, userId: string) {
    const slug = name.toLowerCase().replace(/ /g, '-') + '-' + Math.random().toString(36).substring(7)

    const workspace = await prisma.workspace.create({
        data: {
            name,
            slug,
            members: {
                create: {
                    userId,
                    role: 'OWNER',
                },
            },
        },
    })

    revalidatePath('/app')
    redirect(`/app/${workspace.id}/dashboard`)
}
