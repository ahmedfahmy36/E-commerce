import { useState } from 'nuxt/app';

export interface FilterState {
  category_id: string | null;
  brand_id: string | null;   
  search: string | null;     
}

export function useProductFilter() {
  const filters = useState<FilterState>('product-filters', () => ({
    category_id: null,
    brand_id: null,
    search: null,
  }));

  /**
   * Update a specific filter key.
   */
  const setFilter = (key: keyof FilterState, value: string | null) => {
    if (key === 'category_id' || key === 'brand_id' || key === 'search') {
      filters.value[key] = typeof value === 'string' ? value : null;
    }
  };

  /**
   * Reset all filters.
   */
  const resetFilters = () => {
    filters.value.category_id = null;
    filters.value.brand_id = null;
    filters.value.search = null;
  };

  return {
    filters,
    setFilter,
    resetFilters,
  };
}
