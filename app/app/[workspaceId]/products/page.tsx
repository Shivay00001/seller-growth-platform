import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import prisma from '@/lib/prisma'
import { Plus } from 'lucide-react'

export default async function ProductsPage({ params }: { params: { workspaceId: string } }) {
    const products = await prisma.product.findMany({
        where: { workspaceId: params.workspaceId },
        orderBy: { updatedAt: 'desc' },
        include: { listings: true },
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link href={`/app/${params.workspaceId}/products/new`}>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Base Cost</TableHead>
                                <TableHead>Active Listings</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>{product.sku || '-'}</TableCell>
                                    <TableCell>{product.currency} {product.baseCost}</TableCell>
                                    <TableCell>{product.listings.filter(l => l.status === 'ACTIVE').length}</TableCell>
                                    <TableCell>
                                        <Link href={`/app/${params.workspaceId}/products/${product.id}`}>
                                            <Button variant="outline" size="sm">View</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                                        No products found. Create one to get started.
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
