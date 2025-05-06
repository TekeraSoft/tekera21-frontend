"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdminAnalyticsCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Monthly revenue for the current year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex h-full flex-col justify-between">
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$50k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$40k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$30k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$20k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$10k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$0</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex h-[200px] items-end justify-between gap-2 pt-6">
                <div className="w-full">
                  <div className="bg-primary h-[30%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Jan</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[40%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Feb</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[60%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Mar</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[45%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Apr</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[70%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">May</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[55%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Jun</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[65%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Jul</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[75%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Aug</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[80%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Sep</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[70%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Oct</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[85%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Nov</div>
                </div>
                <div className="w-full">
                  <div className="bg-primary h-[90%] w-full rounded-t-md"></div>
                  <div className="text-xs text-center mt-2">Dec</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
          <CardDescription>Product category distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex flex-wrap items-center justify-center gap-5 mt-6">
            <div className="flex h-full items-center justify-center">
              <div className="relative h-[220px] w-[220px] rounded-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold">Total Sales</div>
                    <div className="text-sm text-muted-foreground">
                      $45,231.89
                    </div>
                  </div>
                </div>
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="20"
                    strokeDasharray="125.6 251.2"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="20"
                    strokeDasharray="75.36 251.2"
                    strokeDashoffset="-125.6"
                    transform="rotate(-90 50 50)"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="20"
                    strokeDasharray="50.24 251.2"
                    strokeDashoffset="-200.96"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-[#22c55e]"></div>
                <div className="text-sm">Electronics (50%)</div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-[#3b82f6]"></div>
                <div className="text-sm">Clothing (30%)</div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 h-3 w-3 rounded-full bg-[#f59e0b]"></div>
                <div className="text-sm">Accessories (20%)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
          <Tabs defaultValue="weekly">
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <div className="flex h-full flex-col justify-between">
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$10k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$8k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$6k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$4k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$2k</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">$0</div>
                <div className="h-[1px] flex-1 bg-border mx-2 mt-3"></div>
              </div>
              <div className="flex h-[200px] items-end gap-2 pt-6">
                <div className="flex flex-1 flex-col items-center">
                  <div className="relative w-full">
                    <div className="absolute bottom-0 w-full">
                      <div className="bg-primary h-[120px] w-full rounded-t-md"></div>
                    </div>
                  </div>
                  <div className="text-xs mt-2">Mon</div>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <div className="relative w-full">
                    <div className="absolute bottom-0 w-full">
                      <div className="bg-primary h-[80px] w-full rounded-t-md"></div>
                    </div>
                  </div>
                  <div className="text-xs mt-2">Tue</div>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <div className="relative w-full">
                    <div className="absolute bottom-0 w-full">
                      <div className="bg-primary h-[140px] w-full rounded-t-md"></div>
                    </div>
                  </div>
                  <div className="text-xs mt-2">Wed</div>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <div className="relative w-full">
                    <div className="absolute bottom-0 w-full">
                      <div className="bg-primary h-[100px] w-full rounded-t-md"></div>
                    </div>
                  </div>
                  <div className="text-xs mt-2">Thu</div>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <div className="relative w-full">
                    <div className="absolute bottom-0 w-full">
                      <div className="bg-primary h-[160px] w-full rounded-t-md"></div>
                    </div>
                  </div>
                  <div className="text-xs mt-2">Fri</div>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <div className="relative w-full">
                    <div className="absolute bottom-0 w-full">
                      <div className="bg-primary h-[130px] w-full rounded-t-md"></div>
                    </div>
                  </div>
                  <div className="text-xs mt-2">Sat</div>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <div className="relative w-full">
                    <div className="absolute bottom-0 w-full">
                      <div className="bg-primary h-[90px] w-full rounded-t-md"></div>
                    </div>
                  </div>
                  <div className="text-xs mt-2">Sun</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
