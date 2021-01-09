const BASE_URL = 'https://fakestoreapi.com';
const PRODUCTS_URL = `${BASE_URL}/products`;
const CATEGORIES_URL = `${BASE_URL}/products/categories`;

const getLimitedProductsURL = (limit) => `${PRODUCTS_URL}?limit=${limit}`;

export const fetchProducts = async (limitResults) => {
    try {
        const response = limitResults ? await fetch(getLimitedProductsURL(limitResults)) : await fetch(PRODUCTS_URL);
        return response.json();
    } catch (error) {
        return error;
    }
}

export const fetchCategories = async () => {
    try {
        const response = await fetch(CATEGORIES_URL);
        return response.json();
    } catch (error) {
        return error;
    }
}