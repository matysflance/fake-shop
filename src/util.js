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

export const getCategoryNameBySlug = (slug, allCategories) => allCategories.find(category => category.slug === slug).name;

export const compareArrayOfObjectsByKey = (key, order = 'ASC') => {
  return function (a, b) {
    //check if desired order matches available options
    if (order.toUpperCase() !== 'ASC' && order.toUpperCase() !== 'DESC') { return 0; }

    //check if desired property even exists on either object
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
    }

    //make it case insensitive
    const valA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const valB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    
    let comparison = 0;
    if (valA > valB) {
        comparison = 1;
    } else if (valA < valB) {
        comparison = -1;
    }
    return order === 'DESC' ? (comparison * -1) : comparison;
  }
}