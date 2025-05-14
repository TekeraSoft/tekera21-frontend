import { CheckCircle, AlertCircle, Edit } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { typeUserData } from "@/data/sellerRegisterData";

export default function DocumentCard({
  document,
}: {
  document: typeUserData["documents"][number];
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={document.fileUrl || "/placeholder.svg"}
          alt={document.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{document.name}</h3>
            <p className="text-xs text-muted-foreground">
              Yükleme: {document.uploadDate}
            </p>
          </div>
          {document.status === "verified" ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-amber-500" />
          )}
        </div>
        <Badge
          variant="outline"
          className={
            document.status === "verified"
              ? "mt-2 bg-green-50 text-green-700"
              : "mt-2 bg-amber-50 text-amber-700"
          }
        >
          {document.status === "verified" ? "Onaylandı" : "İnceleniyor"}
        </Badge>
      </CardContent>
    </Card>
  );
}
