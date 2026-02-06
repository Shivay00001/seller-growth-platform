'use server'

import { AIClient } from '@/lib/ai/client'

export async function generateListingAction(title: string, category: string, features: string) {
    const ai = new AIClient()
    return await ai.generateListing(title, category, features)
}
