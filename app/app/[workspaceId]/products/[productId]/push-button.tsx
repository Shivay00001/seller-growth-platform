'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { pushToMarketplace } from '../actions'

export default function PushToMarketplaceButton({
    productId,
    marketplace,
    label
}: {
    productId: string
    marketplace: 'AMAZON_IN' | 'FLIPKART_IN'
    label: string
}) {
    const [loading, setLoading] = useState(false)

    const handlePush = async () => {
        setLoading(true)
        try {
            await pushToMarketplace(productId, marketplace)
        } catch (error) {
            alert('Failed to push listing')
        }
        setLoading(false)
    }

    return (
        <Button size="sm" variant="outline" onClick={handlePush} disabled={loading}>
            {loading ? 'Pushing...' : `Push to ${label}`}
        </Button>
    )
}
