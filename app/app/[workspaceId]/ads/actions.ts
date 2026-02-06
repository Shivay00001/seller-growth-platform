'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AmazonAdsConnector } from '@/lib/ads/connectors/amazon-ads'

export async function createCampaignAction(workspaceId: string, formData: FormData) {
    const name = formData.get('name') as string
    const platform = formData.get('platform') as any
    const budget = parseFloat(formData.get('budget') as string)
    const keywords = (formData.get('keywords') as string).split(',').map(k => k.trim())

    // Create local record
    const campaign = await prisma.adCampaign.create({
        data: {
            workspaceId,
            name,
            platform,
            budgetDaily: budget,
            status: 'ACTIVE',
            targetingParams: { keywords },
        },
    })

    // Call connector stub
    if (platform === 'AMAZON_ADS') {
        const connector = new AmazonAdsConnector()
        const result = await connector.createCampaign({
            name,
            productId: 'generic-product-id', // In real app, user selects product
            budgetDaily: budget,
            currency: 'USD',
            targeting: { keywords }
        })

        if (result.success && result.externalId) {
            await prisma.adCampaign.update({
                where: { id: campaign.id },
                data: { externalId: result.externalId }
            })
        }
    }

    revalidatePath(`/app/${workspaceId}/ads`)
    redirect(`/app/${workspaceId}/ads`)
}
