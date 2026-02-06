'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { runResearchAction } from './actions'

export default function ResearchPage({ params }: { params: { workspaceId: string } }) {
    const [keyword, setKeyword] = useState('')
    const [results, setResults] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const data = await runResearchAction(params.workspaceId, keyword)
        setResults(data)
        setLoading(false)
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Product Research</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Search Marketplaces</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <Input
                            placeholder="Enter product keyword (e.g. 'wireless earbuds')"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Analyzing...' : 'Analyze Market'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {results && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Avg Price</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold">${results.avgPrice}</div></CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Competition</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold">{results.competitionScore}/100</div></CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Demand</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold">{results.demandScore}/100</div></CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2"><CardTitle className="text-sm text-gray-500">Rec. Price</CardTitle></CardHeader>
                            <CardContent><div className="text-2xl font-bold text-green-600">${results.recommendedPrice}</div></CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader><CardTitle>Top Competitors</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Reviews</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {results.competitors.map((comp: any) => (
                                        <TableRow key={comp.id}>
                                            <TableCell className="font-medium">{comp.title}</TableCell>
                                            <TableCell>${comp.price}</TableCell>
                                            <TableCell>{comp.rating} ★</TableCell>
                                            <TableCell>{comp.reviewCount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
