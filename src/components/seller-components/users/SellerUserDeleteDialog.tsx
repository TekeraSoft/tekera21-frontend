"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserDeleteDialogProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export function SellerUserDeleteDialog({
  user,
  open,
  onOpenChange,
  onDelete,
}: UserDeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Kullanıcıyı silmek istediğinize emin misiniz?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium">{user?.name}</span> ({user?.email})
            kullanıcısını silmek üzeresiniz. Bu işlem geri alınamaz ve
            kullanıcının tüm verileri silinecektir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Kullanıcıyı Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
