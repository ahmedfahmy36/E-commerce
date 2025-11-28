// composables/useProductFilter.ts
import { useState } from 'nuxt/app';

export interface FilterState {
  category_id: string | null; // UUID of category
  brand_id: string | null;    // UUID of brand
  search: string | null;      // text search
}

export function useProductFilter() {
  // Global, SSR-safe state shared across components
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
