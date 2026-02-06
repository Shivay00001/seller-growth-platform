'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { searchSuppliersAction } from './actions'

export default function SuppliersPage({ params }: { params: { workspaceId: string } }) {
    const [keyword, setKeyword] = useState('')
    const [suppliers, setSuppliers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const data = await searchSuppliersAction(keyword)
        setSuppliers(data)
        setLoading(false)
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Supplier Discovery</h1>

            <Card>
                <CardContent className="pt-6">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <Input
                            placeholder="Search suppliers (e.g. 'cotton t-shirts')"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Searching...' : 'Find Suppliers'}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suppliers.map((supplier, i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">{supplier.name}</CardTitle>
                                <Badge>{supplier.platform}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-sm text-gray-600">{supplier.products}</p>
                            <div className="text-sm">
                                <span className="font-semibold">Location:</span> {supplier.location}
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold">Min Order:</span> {supplier.moq}
                            </div>
                            <Button className="w-full mt-4" variant="outline">Contact Supplier</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
