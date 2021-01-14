import styles from './Filters.module.css';
import { capitalize } from '../../../util';
import clsx from 'clsx';

export const Filters = ({handleCategoryFilter, handleSort, handleSearch, categories, selectedCategory, sortBy}) => {
    return (
        <form
            className={styles.filterForm}
            onSubmit={(e) => e.preventDefault()}
            aria-label="Filter displayed products"
          >
            <div className={styles.formGroup}>
              <label htmlFor="filterCategorySelect" className={styles.formLabel}>
                Category:
              </label>
              <select
                className={clsx(styles.formControl, styles.selectFormControl)}
                id="filterCategorySelect"
                onChange={(e) => handleCategoryFilter(e)}
                value={selectedCategory}
                aria-label="Filter products by category"
                autoComplete="off"
              >
                {categories.map((category) => {
                  const { name, slug } = category;
                  return (
                    <option value={slug} key={slug}>
                      {capitalize(name)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="sortBySelect" className={styles.formLabel}>
                Sort by:
              </label>
              <select
                className={clsx(styles.formControl, styles.selectFormControl)}
                id="sortBySelect"
                onChange={(e) => handleSort(e)}
                value={sortBy}
                aria-label="Sort products by"
                autoComplete="off"
              >
                <option value="price_ASC">Price (Low-High)</option>
                <option value="price_DESC">Price (High-Low)</option>
                <option value="title_ASC">Name (A-Z)</option>
                <option value="title_DESC">Name (Z-A)</option>
              </select>
            </div>
            {/* <div className={styles.formGroup}>
            <label htmlFor="limitResults" className={styles.formLabel}>
              Results per page
            </label>
            <select
              className={clsx(styles.formControl, styles.selectFormControl)}
              id="limitResults"
              onChange={(e) => handlePaginateResults(e)}
              value={productsPerPage}
              aria-label="Limit number of products displayed per page"
              autoComplete="off"
            >
              <option value="">All</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div> */}
            <div className={styles.formGroup}>
              <label htmlFor="nameFilter" className={styles.formLabel}>
                Search
              </label>
              <input
                className={styles.formControl}
                type="text"
                placeholder="Start typing..."
                name="nameFilter"
                id="nameFilter"
                onChange={(e) => handleSearch(e)}
                role="search"
                aria-label="Search products by name"
                autoComplete="off"
              />
            </div>
          </form>
    )
}