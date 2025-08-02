export interface SubCategory {
    id: string;
    name: string;
    image: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
    subCategories: SubCategory[];
}

export interface PageInfo {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface ICategoryResponse {
    content: Category[];
    page: PageInfo;
}
