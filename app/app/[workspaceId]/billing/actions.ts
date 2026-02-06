'use server'

import { stripe } from '@/lib/billing/stripe'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function createCheckoutSession(formData: FormData) {
    const workspaceId = formData.get('workspaceId') as string
    const origin = (await headers()).get('origin')

    // In a real app, you'd get the Stripe Price ID from env or DB
    // For this demo, we'll mock the session creation if no key is present
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith('sk_test_mock')) {
        console.log('Mocking Stripe Checkout Redirect')
        // In a real mock, we might update the DB directly for testing
        // For now, just redirect back
        redirect(`/app/${workspaceId}/billing?success=true`)
    }

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
            {
                price: 'price_H5ggYwtDq4fbrJ', // Example Price ID
                quantity: 1,
            },
        ],
        success_url: `${origin}/app/${workspaceId}/billing?success=true`,
        cancel_url: `${origin}/app/${workspaceId}/billing?canceled=true`,
        metadata: {
            workspaceId,
        },
    })

    if (session.url) {
        redirect(session.url)
    }
}
