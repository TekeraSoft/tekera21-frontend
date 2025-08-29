export interface IProductOption {
    id: string;
    name: string;
    properties: {
        [key: string]: string[];
    };
};