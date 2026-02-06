import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import prisma from '@/lib/prisma'
import { Check } from 'lucide-react'
import { createCheckoutSession } from './actions'

export default async function BillingPage({ params }: { params: { workspaceId: string } }) {
    const subscription = await prisma.subscription.findUnique({
        where: { workspaceId: params.workspaceId },
    })

    const isPro = subscription?.tier === 'PRO' && subscription?.status === 'active'

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Billing & Plans</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
                {/* Free Plan */}
                <Card className={!isPro ? 'border-2 border-blue-500' : ''}>
                    <CardHeader>
                        <CardTitle>Free Plan</CardTitle>
                        <CardDescription>For getting started</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="text-3xl font-bold">$0<span className="text-sm font-normal text-gray-500">/mo</span></div>
                        <ul className="space-y-2 pt-4">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 5 Products</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Basic Research</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 1 Marketplace</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button disabled={!isPro} variant="outline" className="w-full">
                            {!isPro ? 'Current Plan' : 'Downgrade'}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className={isPro ? 'border-2 border-blue-500' : ''}>
                    <CardHeader>
                        <CardTitle>Pro Plan</CardTitle>
                        <CardDescription>For serious sellers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="text-3xl font-bold">$49<span className="text-sm font-normal text-gray-500">/mo</span></div>
                        <ul className="space-y-2 pt-4">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Unlimited Products</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Advanced AI Tools</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> All Marketplaces</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Priority Support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {isPro ? (
                            <Button disabled className="w-full">Current Plan</Button>
                        ) : (
                            <form action={createCheckoutSession} className="w-full">
                                <input type="hidden" name="workspaceId" value={params.workspaceId} />
                                <Button type="submit" className="w-full">Upgrade to Pro</Button>
                            </form>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
