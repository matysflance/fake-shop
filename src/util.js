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
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      throw Error(`Compared object(s) do not have property '${key}'`);
    }

    const valA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const valB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    if (valA > valB) {
        return order === 'DESC' ? -1 : 1;
    } else if (valA < valB) {
        return order === 'DESC' ? 1 : -1;
    } else {
        return 0;
    }
  }
}

export const sortObjectsByKey = (objectsArr, sortBy) => {
  // sortBy format needs to be: "key_order"
  // regex needs to be updated as multiple '_' shouldn't be allowed
  if (!new RegExp('[a-zA-Z]*_(ASC|DESC)').test(sortBy)) {
    throw Error('Invalid sorting string provided.');
  }

  const [key, order] = sortBy.split('_');
  
  return [...objectsArr].sort(compareArrayOfObjectsByKey(key, order));
}