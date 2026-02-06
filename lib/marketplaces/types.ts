export interface CreateListingInput {
    title: string
    description: string
    price: number
    currency: string
    stock: number
    images: string[]
    category?: string
}

export interface CreateListingResult {
    success: boolean
    externalId?: string
    message?: string
}

export interface UpdateListingInput {
    externalId: string
    price?: number
    stock?: number
}

export interface UpdateListingResult {
    success: boolean
    message?: string
}

export interface SyncResult {
    status: 'ACTIVE' | 'INACTIVE' | 'DRAFT' | 'ERROR'
    message?: string
}

export interface FeeEstimateInput {
    price: number
    category: string
    weight?: number // in kg
    dimensions?: { l: number; w: number; h: number } // in cm
}

export interface FeeEstimateResult {
    referralFee: number
    closingFee: number
    shippingFee: number
    totalFee: number
    currency: string
}

export interface MarketplaceConnector {
    createListing(input: CreateListingInput): Promise<CreateListingResult>
    updateListing(input: UpdateListingInput): Promise<UpdateListingResult>
    syncListingStatus(externalId: string): Promise<SyncResult>
    estimateFees(input: FeeEstimateInput): Promise<FeeEstimateResult>
}
