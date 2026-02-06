import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import CreateWorkspaceForm from './create-workspace-form'

export default async function AppRoot() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch user's workspaces
    const memberships = await prisma.workspaceMember.findMany({
        where: { userId: user.id },
        include: { workspace: true },
    })

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Your Workspaces</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {memberships.map((membership) => (
                    <Link key={membership.workspaceId} href={`/app/${membership.workspaceId}/dashboard`}>
                        <Card className="hover:bg-gray-50 transition-colors cursor-pointer h-full">
                            <CardHeader>
                                <CardTitle>{membership.workspace.name}</CardTitle>
                                <CardDescription>{membership.role}</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}

                <Card className="border-dashed">
                    <CardHeader>
                        <CardTitle>Create New Workspace</CardTitle>
                        <CardDescription>Start a new business</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CreateWorkspaceForm userId={user.id} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
