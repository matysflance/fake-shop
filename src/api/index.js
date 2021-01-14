const BASE_URL = 'https://fakestoreapi.com';
const CATEGORIES_URL = `${BASE_URL}/products/categories`;
const ALL_PRODUCTS_URL = `${BASE_URL}/products`;
const CATEGORY_PRODUCTS_URL = `${BASE_URL}/products/category`;

const getProductsURL = (category) => {
  const encodedCategory = encodeURI(category.replace('-', ' '));
  return encodedCategory && encodedCategory !== 'all'
    ? `${CATEGORY_PRODUCTS_URL}/${encodedCategory}`
    : ALL_PRODUCTS_URL;
};
const getLimitedProductsURL = (productsURL, limit) => `${productsURL}?limit=${limit}`;

export const fetchProducts = async (category, limitResults) => {
  try {
    const productsURL = limitResults
      ? getLimitedProductsURL(getProductsURL(category), limitResults)
      : getProductsURL(category);

    const response = await fetch(productsURL);
    return response.json();
  } catch (error) {
    return error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(CATEGORIES_URL);
    return response.json();
  } catch (error) {
    return error;
  }
};
