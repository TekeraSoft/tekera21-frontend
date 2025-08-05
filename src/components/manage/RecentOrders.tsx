import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RecentOrders() {
  const orders = [
    {
      id: "ORD-001",
      customer: {
        name: "John Smith",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Delivered",
      date: "2 hours ago",
      amount: "$125.99",
    },
    {
      id: "ORD-002",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Processing",
      date: "5 hours ago",
      amount: "$89.50",
    },
    {
      id: "ORD-003",
      customer: {
        name: "Michael Brown",
        email: "michael@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Shipped",
      date: "Yesterday",
      amount: "$432.00",
    },
    {
      id: "ORD-004",
      customer: {
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Pending",
      date: "Yesterday",
      amount: "$65.25",
    },
    {
      id: "ORD-005",
      customer: {
        name: "Robert Wilson",
        email: "robert@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Delivered",
      date: "2 days ago",
      amount: "$219.99",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Processing":
        return "bg-blue-100 text-blue-800"
      case "Shipped":
        return "bg-purple-100 text-purple-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={order.customer.avatar || "/placeholder.svg"} alt={order.customer.name} />
                  <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{order.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(order.status)} variant="outline">
                  {order.status}
                </Badge>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
