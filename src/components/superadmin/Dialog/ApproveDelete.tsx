"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogContext } from "@/context/DialogContext";

const ApproveDelete = ({ handler }: { handler: (val?: string) => void }) => {
  const { dialogStatus, setDialogStatus } = useDialogContext();

  return (
    <div className="pt-4">
      <Dialog
        open={dialogStatus.isOpen}
        onOpenChange={() => setDialogStatus({ isOpen: false, value: "" })}
      >
        <DialogContent className="max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Sil</DialogTitle>
          </DialogHeader>
          <p>Emin misiniz? Bu işlem geri alınamaz.</p>
          <DialogFooter className="mt-4 flex flex-col gap-3">
            <Button
              variant="outline"
              onClick={() => setDialogStatus({ isOpen: false, value: "" })}
            >
              Hayır
            </Button>
            <Button
              variant="destructive"
              onClick={() => handler(dialogStatus.value)}
            >
              Evet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApproveDelete;
