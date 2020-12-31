const BASE_URL = 'https://fakestoreapi.com';
const PRODUCTS_URL = `${BASE_URL}/products`;

const getLimitedProductsURL = (limit) => `${PRODUCTS_URL}?limit=${limit}`;

export const fetchProducts = async (limitResults) => {
    try {
        const response = limitResults ? await fetch(getLimitedProductsURL(limitResults)) : await fetch(PRODUCTS_URL);
        return response.json();
    } catch (error) {
        return error;
    }
}