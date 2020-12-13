const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (limitResults) => {
    let productsURL = `${BASE_URL}/products`;

    if (limitResults) {
        productsURL = `${productsURL}?limit=${limitResults}`;
    }

    

    try {
        const response = await fetch(productsURL);
        console.log(response);
        return response.json();
    } catch (error) {
        console.error('Error in fetchProducts API call.');
        console.error(error);
    }
}