"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ProductTableSkeleton() {
  // Placeholder rows for the skeleton
  const skeletonRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-1 flex-wrap gap-y-2 items-center space-x-2">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-8 w-[150px]" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-5 w-[180px]" />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                <Skeleton className="h-4 w-24" />
              </div>
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-20" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skeletonRows.map((index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-10 w-10 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[140px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[100px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[60px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-[40px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[80px] rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Skeleton className="h-8 w-[80px]" />
        <Skeleton className="h-8 w-[80px]" />
      </div>
    </Card>
  );
}
