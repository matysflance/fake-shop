const BASE_URL = 'https://fakestoreapi.com';
const PRODUCTS_URL = `${BASE_URL}/products`;

const getLimitedProductsURL = (limit) => `${PRODUCTS_URL}?limit=${limit}`;

export const fetchProducts = async (limitResults) => {
    let productsURL = `${BASE_URL}/products`;

    if (limitResults) {
        productsURL = getLimitedProductsURL(limitResults);
    }

    try {
        const response = await fetch(productsURL);
        return response.json();
    } catch (error) {
        return error;
    }
}