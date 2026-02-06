'use server'

export async function searchSuppliersAction(keyword: string) {
    // Mock supplier search
    await new Promise(resolve => setTimeout(resolve, 800))

    return Array.from({ length: 6 }).map((_, i) => ({
        name: `Supplier ${i + 1} - ${keyword}`,
        platform: i % 2 === 0 ? 'IndiaMart' : 'Alibaba',
        products: `Manufacturer of high quality ${keyword}`,
        location: i % 2 === 0 ? 'Delhi, India' : 'Shenzhen, China',
        moq: `${(i + 1) * 50} units`,
    }))
}
