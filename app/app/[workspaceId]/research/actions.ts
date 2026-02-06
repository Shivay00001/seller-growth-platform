'use server'

import prisma from '@/lib/prisma'

export async function runResearchAction(workspaceId: string, keyword: string) {
    // Mock research logic
    const basePrice = Math.floor(Math.random() * 50) + 20

    const competitors = Array.from({ length: 5 }).map((_, i) => ({
        title: `${keyword} - Competitor ${i + 1}`,
        price: basePrice + (Math.random() * 10 - 5),
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 1000),
        marketplace: 'AMAZON_IN',
    }))

    const avgPrice = competitors.reduce((acc, c) => acc + c.price, 0) / competitors.length

    const session = await prisma.researchSession.create({
        data: {
            workspaceId,
            keyword,
            avgPrice,
            minPrice: Math.min(...competitors.map(c => c.price)),
            maxPrice: Math.max(...competitors.map(c => c.price)),
            competitionScore: Math.floor(Math.random() * 100),
            demandScore: Math.floor(Math.random() * 100),
            recommendedPrice: avgPrice * 0.95,
            results: {
                create: competitors.map(c => ({
                    title: c.title,
                    price: c.price,
                    rating: parseFloat(c.rating),
                    reviewCount: c.reviewCount,
                    marketplace: 'AMAZON_IN',
                }))
            }
        },
        include: { results: true }
    })

    return {
        ...session,
        competitors: session.results
    }
}
