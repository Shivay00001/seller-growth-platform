'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { generateListingAction } from './actions'

export default function AIListingGenerator({ product }: { product: any }) {
    const [features, setFeatures] = useState('')
    const [generated, setGenerated] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        setLoading(true)
        const result = await generateListingAction(product.title, product.category || 'General', features)
        setGenerated(result)
        setLoading(false)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Listing Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Key Features / Notes</Label>
                    <Textarea
                        placeholder="Enter key features to highlight..."
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                    />
                </div>

                <Button onClick={handleGenerate} disabled={loading} className="w-full">
                    {loading ? 'Generating...' : 'Generate Optimized Listing'}
                </Button>

                {generated && (
                    <div className="space-y-4 mt-4 border-t pt-4">
                        <div className="space-y-2">
                            <Label className="font-bold">Optimized Title</Label>
                            <div className="p-2 bg-gray-50 rounded border text-sm">{generated.title}</div>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold">Description</Label>
                            <div className="p-2 bg-gray-50 rounded border text-sm whitespace-pre-wrap">{generated.description}</div>
                        </div>

                        <div className="space-y-2">
                            <Label className="font-bold">Bullet Points</Label>
                            <ul className="list-disc pl-5 text-sm">
                                {generated.bulletPoints.map((bp: string, i: number) => (
                                    <li key={i}>{bp}</li>
                                ))}
                            </ul>
                        </div>

                        <Button variant="secondary" className="w-full">Apply to Product</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
