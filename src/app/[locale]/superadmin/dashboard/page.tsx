import { DashboardCards } from '@/components/superadmin/DashBoardCards'
import { DashboardHeader } from '@/components/superadmin/DashBoardHeader'
import { RecentOrders } from '@/components/superadmin/RecentOrders'
import { TopProducts } from '@/components/superadmin/TopProducts'
import React from 'react'

const DashBoard = () => {
  return (
    <div className="flex flex-col gap-6 px-6 py-3 w-full">
      <DashboardHeader />
      <DashboardCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  )
}

export default DashBoard