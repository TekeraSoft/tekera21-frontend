import { Loader2 } from "lucide-react";
import React from "react";

function LoadingBigCircle() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200 ">
      <Loader2 className="h-20 w-20 animate-spin text-primary" />
    </div>
  );
}

export default LoadingBigCircle;
