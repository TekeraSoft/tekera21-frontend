import { ICategory } from "../product";

export interface SubCategory {
    id: string;
    name: string;
    image: string;
}


export interface PageInfo {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface ICategoryResponse {
    content: ICategory[];
    page: PageInfo;
}
