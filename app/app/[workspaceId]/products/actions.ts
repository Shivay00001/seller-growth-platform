'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AmazonConnector } from '@/lib/marketplaces/connectors/amazon'
import { FlipkartConnector } from '@/lib/marketplaces/connectors/flipkart'

export async function createProduct(workspaceId: string, formData: FormData) {
    const title = formData.get('title') as string
    const sku = formData.get('sku') as string
    const baseCost = parseFloat(formData.get('baseCost') as string) || 0
    const currency = formData.get('currency') as string
    const description = formData.get('description') as string

    const product = await prisma.product.create({
        data: {
            workspaceId,
            title,
            sku,
            baseCost,
            currency,
            description,
        },
    })

    revalidatePath(`/app/${workspaceId}/products`)
    redirect(`/app/${workspaceId}/products/${product.id}`)
}

export async function pushToMarketplace(productId: string, marketplace: 'AMAZON_IN' | 'FLIPKART_IN') {
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) throw new Error('Product not found')

    let connector
    if (marketplace === 'AMAZON_IN') connector = new AmazonConnector()
    else if (marketplace === 'FLIPKART_IN') connector = new FlipkartConnector()
    else throw new Error('Unsupported marketplace')

    const result = await connector.createListing({
        title: product.title,
        description: product.description || '',
        price: (product.baseCost || 0) * 1.5, // Mock markup
        currency: product.currency,
        stock: 100, // Mock stock
        images: product.images,
    })

    if (result.success && result.externalId) {
        await prisma.productListing.create({
            data: {
                productId,
                marketplace,
                externalListingId: result.externalId,
                status: 'ACTIVE', // Assume active for demo
                price: (product.baseCost || 0) * 1.5,
                stock: 100,
                lastSyncAt: new Date(),
            },
        })
    }

    revalidatePath(`/app/${product.workspaceId}/products/${productId}`)
    return result
}
