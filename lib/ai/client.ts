import OpenAI from 'openai'

export interface GeneratedListing {
    title: string
    description: string
    bulletPoints: string[]
    keywords: string[]
}

export class AIClient {
    private client: OpenAI

    constructor() {
        this.client = new OpenAI({
            apiKey: process.env.AI_PROVIDER_API_KEY || 'mock-key',
        })
    }

    async generateListing(productTitle: string, category: string, features: string): Promise<GeneratedListing> {
        if (!process.env.AI_PROVIDER_API_KEY || process.env.AI_PROVIDER_API_KEY === 'mock-key') {
            // Return mock data if no key
            return {
                title: `Premium ${productTitle} - High Quality, Durable, Best in Class`,
                description: `Experience the best with our ${productTitle}. Designed for performance and built to last. This product features ${features} and is perfect for ${category} enthusiasts.`,
                bulletPoints: [
                    'High quality materials',
                    'Durable construction',
                    'Easy to use',
                    'Satisfaction guaranteed'
                ],
                keywords: [category, 'premium', 'best seller', 'top rated']
            }
        }

        try {
            const completion = await this.client.chat.completions.create({
                messages: [
                    { role: 'system', content: 'You are an expert e-commerce copywriter. Generate a high-converting product listing.' },
                    { role: 'user', content: `Product: ${productTitle}\nCategory: ${category}\nFeatures: ${features}\n\nGenerate a title, description, 5 bullet points, and 10 SEO keywords. Return JSON.` }
                ],
                model: 'gpt-3.5-turbo',
                response_format: { type: 'json_object' },
            })

            const content = completion.choices[0].message.content
            if (!content) throw new Error('No content generated')

            return JSON.parse(content) as GeneratedListing
        } catch (error) {
            console.error('AI Generation failed:', error)
            throw new Error('Failed to generate listing')
        }
    }
}
