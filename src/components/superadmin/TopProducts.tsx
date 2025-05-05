import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function TopProducts() {
  const products = [
    {
      id: "PROD-001",
      name: "Wireless Headphones",
      category: "Electronics",
      stock: 45,
      price: "$129.99",
      sales: 128,
    },
    {
      id: "PROD-002",
      name: "Smart Watch",
      category: "Electronics",
      stock: 32,
      price: "$199.99",
      sales: 96,
    },
    {
      id: "PROD-003",
      name: "Cotton T-Shirt",
      category: "Clothing",
      stock: 89,
      price: "$24.99",
      sales: 85,
    },
    {
      id: "PROD-004",
      name: "Bluetooth Speaker",
      category: "Electronics",
      stock: 21,
      price: "$79.99",
      sales: 72,
    },
    {
      id: "PROD-005",
      name: "Running Shoes",
      category: "Footwear",
      stock: 54,
      price: "$89.99",
      sales: 67,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium leading-none">{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{product.price}</p>
                <p className="text-xs text-muted-foreground">{product.sales} sold</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
