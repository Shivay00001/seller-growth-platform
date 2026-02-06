import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import PushToMarketplaceButton from './push-button'
import AIListingGenerator from './ai-generator'

export default async function ProductDetailPage({ params }: { params: { workspaceId: string; productId: string } }) {
    const product = await prisma.product.findUnique({
        where: { id: params.productId },
        include: { listings: true },
    })

    if (!product) return <div>Product not found</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-gray-500">{product.sku}</p>
                </div>
                <div className="space-x-2">
                    <Button variant="outline">Edit</Button>
                    <Button variant="destructive">Delete</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <span className="font-semibold">Base Cost:</span> {product.currency} {product.baseCost}
                        </div>
                        <div>
                            <span className="font-semibold">Description:</span>
                            <p className="text-sm text-gray-600 mt-1">{product.description || 'No description'}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Marketplace Listings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {product.listings.map((listing) => (
                                <div key={listing.id} className="flex justify-between items-center border p-3 rounded-md">
                                    <div>
                                        <div className="font-semibold">{listing.marketplace}</div>
                                        <div className="text-xs text-gray-500">{listing.externalListingId}</div>
                                    </div>
                                    <Badge variant={listing.status === 'ACTIVE' ? 'default' : 'secondary'}>
                                        {listing.status}
                                    </Badge>
                                </div>
                            ))}

                            {product.listings.length === 0 && (
                                <p className="text-sm text-gray-500">Not listed on any marketplace yet.</p>
                            )}

                            <div className="pt-4 border-t">
                                <h4 className="text-sm font-medium mb-2">Push to Marketplace</h4>
                                <div className="flex gap-2">
                                    <PushToMarketplaceButton productId={product.id} marketplace="AMAZON_IN" label="Amazon IN" />
                                    <PushToMarketplaceButton productId={product.id} marketplace="FLIPKART_IN" label="Flipkart" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="md:col-span-2">
                    <AIListingGenerator product={product} />
                </div>
            </div>
        </div>
    )
}
