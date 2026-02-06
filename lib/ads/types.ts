export interface CreateCampaignInput {
    name: string
    productId: string
    budgetDaily: number
    currency: string
    targeting: any
}

export interface CreateCampaignResult {
    success: boolean
    externalId?: string
    message?: string
}

export interface CampaignStats {
    impressions: number
    clicks: number
    spend: number
    sales: number
    acos: number // Advertising Cost of Sales %
}

export interface AdsConnector {
    createCampaign(input: CreateCampaignInput): Promise<CreateCampaignResult>
    getCampaignStats(externalId: string): Promise<CampaignStats>
}
