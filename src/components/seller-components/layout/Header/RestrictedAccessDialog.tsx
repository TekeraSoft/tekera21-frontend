import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Dialog state
export default function RestrictedAccessDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">Erişim Engellendi</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600">
          Bu alana erişim izniniz bulunmamaktadır. Lütfen yetkili bir kullanıcı
          ile iletişime geçin.
        </div>
      </DialogContent>
    </Dialog>
  );
}
