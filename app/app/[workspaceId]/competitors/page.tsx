import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prisma from '@/lib/prisma'

export default async function CompetitorsPage({ params }: { params: { workspaceId: string } }) {
    const competitors = await prisma.competitorListing.findMany({
        where: {
            researchSession: { workspaceId: params.workspaceId }
        },
        orderBy: { createdAt: 'desc' },
        take: 20
    })

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Competitor Tracker</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Tracked Competitors</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Title</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Marketplace</TableHead>
                                <TableHead>Last Updated</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {competitors.map((comp) => (
                                <TableRow key={comp.id}>
                                    <TableCell className="font-medium">{comp.title}</TableCell>
                                    <TableCell>{comp.currency} {comp.price.toFixed(2)}</TableCell>
                                    <TableCell>{comp.rating} ★ ({comp.reviewCount})</TableCell>
                                    <TableCell>{comp.marketplace}</TableCell>
                                    <TableCell>{new Date(comp.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                            {competitors.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                                        No competitors tracked yet. Run a research session first.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
