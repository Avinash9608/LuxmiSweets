
export interface MenuItem {
    _id?: string;
    name: string;
    category: string;
    price: number;
    priceUnit?: string;
    image: string;
    hint: string;
    dietary?: string[];
    isFeatured?: boolean;
}
