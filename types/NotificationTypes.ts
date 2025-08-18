export interface INotification {
    id: number;
    title: string;
    message: string;
    timestamp: Date;
    type: "info" | "warning" | "success" | "error" | "order";
    read?: boolean;
}