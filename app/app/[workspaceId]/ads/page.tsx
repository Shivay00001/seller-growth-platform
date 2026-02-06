import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prisma from '@/lib/prisma'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default async function AdsPage({ params }: { params: { workspaceId: string } }) {
    const campaigns = await prisma.adCampaign.findMany({
        where: { workspaceId: params.workspaceId },
        orderBy: { updatedAt: 'desc' },
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Ads Management</h1>
                <Link href={`/app/${params.workspaceId}/ads/new`}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Campaign
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Total Spend</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">$1,234.56</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Total Sales</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">$5,678.90</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">ACOS</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-green-600">21.7%</div></CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Campaign Name</TableHead>
                                <TableHead>Platform</TableHead>
                                <TableHead>Budget/Day</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {campaigns.map((campaign) => (
                                <TableRow key={campaign.id}>
                                    <TableCell className="font-medium">{campaign.name}</TableCell>
                                    <TableCell>{campaign.platform}</TableCell>
                                    <TableCell>{campaign.currency} {campaign.budgetDaily}</TableCell>
                                    <TableCell>
                                        <Badge variant={campaign.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                            {campaign.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" size="sm">View Stats</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {campaigns.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                                        No campaigns found. Create one to start advertising.
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
