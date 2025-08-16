export interface IPageableData<T> {
    content: T[];
    page: {
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
    }
}

export interface IPageableResponse<T> {
    success: boolean;
    message: string;
    data: IPageableData<T> | undefined;
}
