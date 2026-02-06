'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createCampaignAction } from '../actions'

export default function NewCampaignPage({ params }: { params: { workspaceId: string } }) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        await createCampaignAction(params.workspaceId, formData)
        setLoading(false)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Create Ad Campaign</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Campaign Name</Label>
                            <Input id="name" name="name" required placeholder="Summer Sale 2024" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="platform">Ad Platform</Label>
                            <Select name="platform" defaultValue="AMAZON_ADS">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AMAZON_ADS">Amazon Ads</SelectItem>
                                    <SelectItem value="META_ADS">Meta Ads (Facebook/Instagram)</SelectItem>
                                    <SelectItem value="GOOGLE_ADS">Google Ads</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="budget">Daily Budget</Label>
                            <Input id="budget" name="budget" type="number" required placeholder="50.00" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="keywords">Targeting Keywords (comma separated)</Label>
                            <Input id="keywords" name="keywords" placeholder="shoes, running, sports" />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Creating...' : 'Launch Campaign'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
