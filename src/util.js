import slugify from 'slugify';

export const formatPrice = (price) => parseFloat(price).toFixed(2);

export const getUniqueCategories = (products) => {
  const allCategories = getAllCategories(products);
  return allCategories.filter(({name}, index) => allCategories.findIndex(el => el.name === name) === index);
}

// looks a bit ugly, but when I tried making it a 1-liner it was hard to understand what it's doing
// basically, it generates all categories in form of array of objects containing name and slug of category (used for pretty URLs)
export const getAllCategories = (products) => {
  return [
    {
      name: 'all',
      slug: 'all'
    },
    ...products.map(product => {
      return {
        name: product.category,
        slug: slugify(product.category)
      }
    })
  ]
};