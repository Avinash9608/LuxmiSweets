export interface MenuItem {
    name: string;
    category: string;
    price: number;
    priceUnit?: string;
    image: string;
    hint: string;
    dietary?: string[];
}
