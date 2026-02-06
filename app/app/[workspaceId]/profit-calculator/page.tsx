'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ProfitCalculatorPage() {
    const [cost, setCost] = useState(0)
    const [price, setPrice] = useState(0)
    const [shipping, setShipping] = useState(0)
    const [marketplace, setMarketplace] = useState('AMAZON_IN')

    const calculate = () => {
        let referralFeePercent = 0.15
        let closingFee = 10

        if (marketplace === 'FLIPKART_IN') {
            referralFeePercent = 0.12
            closingFee = 15
        }

        const referralFee = price * referralFeePercent
        const totalFees = referralFee + closingFee + shipping
        const netProfit = price - cost - totalFees
        const margin = (netProfit / price) * 100

        return { referralFee, closingFee, totalFees, netProfit, margin }
    }

    const result = calculate()

    return (
        <div className="space-y-6 max-w-2xl">
            <h1 className="text-3xl font-bold">Profit Calculator</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Calculator Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Marketplace</Label>
                            <Select value={marketplace} onValueChange={setMarketplace}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="AMAZON_IN">Amazon India</SelectItem>
                                    <SelectItem value="FLIPKART_IN">Flipkart</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Selling Price</Label>
                            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Product Cost</Label>
                            <Input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Shipping Cost</Label>
                            <Input type="number" value={shipping} onChange={(e) => setShipping(Number(e.target.value))} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-slate-50">
                <CardHeader>
                    <CardTitle>Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Referral Fee</Label>
                            <div className="text-lg font-semibold">{result.referralFee.toFixed(2)}</div>
                        </div>
                        <div>
                            <Label>Closing Fee</Label>
                            <div className="text-lg font-semibold">{result.closingFee.toFixed(2)}</div>
                        </div>
                        <div>
                            <Label>Total Fees</Label>
                            <div className="text-lg font-semibold text-red-600">{result.totalFees.toFixed(2)}</div>
                        </div>
                        <div>
                            <Label>Net Profit</Label>
                            <div className={`text-2xl font-bold ${result.netProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {result.netProfit.toFixed(2)}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Label>Profit Margin</Label>
                            <div className={`text-xl font-bold ${result.margin > 15 ? 'text-green-600' : 'text-orange-500'}`}>
                                {result.margin.toFixed(1)}%
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
