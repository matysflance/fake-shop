import slugify from 'slugify';

export const formatPrice = (price) => parseFloat(price).toFixed(2);

export const createSlugsForCategories = (categories) => {
  return categories.map((category) => {
    return {
      name: category,
      slug: slugify(category),
    };
  });
};

export const getCategoryNameBySlug = (slug, allCategories) => {
  const category = allCategories.find((category) => category.slug === slug);
  return category ? category.name : '';
};

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
  };
};

export const sortObjectsByKey = (objectsArr, sortBy) => {
  // sortBy format needs to be: "key_order"
  // regex needs to be updated as multiple '_' shouldn't be allowed
  const correctFormatRegex = new RegExp('[a-zA-Z]*_(ASC|DESC)');
  if (!correctFormatRegex.test(sortBy)) {
    throw Error('Invalid sorting string provided.');
  }

  const [key, order] = sortBy.split('_');

  return [...objectsArr].sort(compareArrayOfObjectsByKey(key, order));
};

export const filterObjectsByKey = (objectsArr, key, searchValue) =>
  objectsArr.filter((obj) => {
    return obj[key].toLowerCase().includes(searchValue.toLowerCase());
  });

export const capitalize = (str) =>
  str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
