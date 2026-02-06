import { Sidebar } from '@/components/sidebar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export default async function WorkspaceLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { workspaceId: string }
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Verify membership
    const membership = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId: params.workspaceId,
                userId: user.id,
            },
        },
    })

    if (!membership) {
        redirect('/app')
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar workspaceId={params.workspaceId} />
            <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
