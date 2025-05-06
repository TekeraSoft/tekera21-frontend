import ToggleSidebarButton from "./ToggleSidebarButton";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <ToggleSidebarButton />
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
    </div>
  );
}
