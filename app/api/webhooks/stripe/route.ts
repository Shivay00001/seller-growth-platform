import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/billing/stripe'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event: Stripe.Event

    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_mock')) {
            // Allow bypassing signature check for mock/dev
            event = JSON.parse(body)
        } else {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            )
        }
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    if (event.type === 'checkout.session.completed') {
        const workspaceId = session.metadata?.workspaceId

        if (workspaceId) {
            await prisma.subscription.upsert({
                where: { workspaceId },
                create: {
                    workspaceId,
                    stripeCustomerId: session.customer as string,
                    stripeSubscriptionId: session.subscription as string,
                    tier: 'PRO',
                    status: 'active',
                },
                update: {
                    stripeCustomerId: session.customer as string,
                    stripeSubscriptionId: session.subscription as string,
                    tier: 'PRO',
                    status: 'active',
                },
            })
        }
    }

    return new NextResponse(null, { status: 200 })
}
