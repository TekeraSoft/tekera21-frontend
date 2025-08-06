"use client";

import { deleteTargetPicture } from "@/app/actions/server/targetPicture.actions";
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/use-toast";

export default function TargetDelete({ id }: { id: string }) {
  const onSubmit = async () => {
    const { success, message } = await deleteTargetPicture(id);

    if (success) {
      toast({
        title: "Success",
        description:
          typeof message === "string"
            ? message
            : message?.message || "Target Image is Deleted.",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description:
          typeof message === "string"
            ? message
            : message?.message || "Failed to delete target picture",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="max-w-md mx-auto p-6">
      <Button onClick={onSubmit}> Tıkla ve Sil</Button>
    </div>
  );
}
