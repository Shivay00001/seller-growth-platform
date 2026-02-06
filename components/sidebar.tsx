'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, ShoppingBag, Search, BarChart3, Calculator, Truck, Megaphone, CreditCard, Settings } from 'lucide-react'

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Research', href: '/research', icon: Search },
    { name: 'Competitors', href: '/competitors', icon: BarChart3 },
    { name: 'Profit Calc', href: '/profit-calculator', icon: Calculator },
    { name: 'Suppliers', href: '/suppliers', icon: Truck },
    { name: 'Ads', href: '/ads', icon: Megaphone },
    { name: 'Billing', href: '/billing', icon: CreditCard },
    { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({ workspaceId }: { workspaceId: string }) {
    const pathname = usePathname()

    return (
        <div className="flex flex-col w-64 bg-gray-900 text-white min-h-screen">
            <div className="p-4 text-xl font-bold border-b border-gray-800">
                Seller Hub
            </div>
            <nav className="flex-1 p-2 space-y-1">
                {navigation.map((item) => {
                    const href = `/app/${workspaceId}${item.href}`
                    const isActive = pathname.startsWith(href)
                    return (
                        <Link
                            key={item.name}
                            href={href}
                            className={cn(
                                'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
                                isActive
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            )}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
