import { computed, type Ref } from 'vue';
import { useFetch, useRuntimeConfig } from 'nuxt/app';
import type { FilterState } from './useProductFilter';


interface Meta {
  code: number;
  errors: any[];
}

interface CategoryApi {
  id: string;
  title: string;
  order: number;
  children: CategoryApi[];
}

interface BrandApi {
  id: string;
  title: string;
  logo: string;
  products_count: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  type: string;
  price: string;
  has_variant: boolean;
  variants_count: number;
  default_variant_id: string | null;
  is_in_stock: boolean;
  sale_price?: string | null;
  sale_percent?: number | null;
  featured_image: string;
  second_image?: string | null;
  rating?: {
    product_ratings: number;
    total_reviews_count: number;
  };
  trendy?: number;
  best_seller?: number;
  featured?: number;
  clearance?: number;
  brand?: {
    id: string;
    title: string;
    logo: string;
    products_count: number;
  };
  [key: string]: any;
}

interface ProductsResponse {
  meta: Meta;
  data: Product[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

interface CategoriesResponse {
  meta: Meta;
  data: CategoryApi[];
}

interface BrandsResponse {
  meta: Meta;
  data: BrandApi[];
}

// ===== Simplified App Types =====

export interface Category {
  id: string;
  name: string;
  count?: number;
}

export interface Brand {
  id: string;
  name: string;
  count?: number;
}

export type FilterOptions = FilterState;

// Flatten nested categories into a single flat list
function flattenCategories(nodes: CategoryApi[]): Category[] {
  const result: Category[] = [];

  const walk = (items: CategoryApi[]) => {
    for (const item of items) {
      result.push({
        id: item.id,
        name: item.title,
      });

      if (item.children?.length) {
        walk(item.children);
      }
    }
  };

  walk(nodes);
  return result;
}

export function useApi() {
  const runtimeConfig = useRuntimeConfig();
  const apiHost = runtimeConfig.public.apiHost;

  /**
   * Products fetch, reactive to filters & page.
   */
  const fetchProducts = (
    filters: Ref<FilterOptions>,
    page: Ref<number>,
    perPage = 12,
  ) => {
    const request = useFetch<ProductsResponse>(
      () => {
        let url = `${apiHost}/api/v2/products`;
        const query = new URLSearchParams();

        if (filters.value.category_id) {
          query.append('filter[v2_categories]', filters.value.category_id);
        }

        if (filters.value.brand_id) {
          query.append('filter[brands]', filters.value.brand_id);
        }

        if (filters.value.search) {
          query.append('search', filters.value.search);
        }

        // Pagination
        query.append('page', String(page.value));
        query.append('per_page', String(perPage));

        const qs = query.toString();
        if (qs) url += `?${qs}`;

        console.log('➡️ Fetching products URL:', url);
        return url;
      },
      {
        default: () => ({
          meta: { code: 200, errors: [] },
          data: [],
          pagination: {
            current_page: 1,
            last_page: 1,
            per_page: perPage,
            total: 0,
          },
        }),
        // Refetch when filters or page change
        watch: [filters, page],
        deep: true,
      },
    );

    return request;
  };

  /**
   * Static filters fetch (categories + brands).
   * Will run once and stay cached; categories are flattened.
   */
  const fetchStaticFilters = () => {
    const {
      data: rawCategories,
      error: catError,
    } = useFetch<CategoriesResponse>(`${apiHost}/api/v2/categories`, {
      key: 'categories',
      default: () => ({
        meta: { code: 200, errors: [] },
        data: [],
      }),
    });

    const {
      data: rawBrands,
      error: brandError,
    } = useFetch<BrandsResponse>(`${apiHost}/api/v1/brands`, {
      key: 'brands',
      default: () => ({
        meta: { code: 200, errors: [] },
        data: [],
      }),
    });

    const categories = computed<Category[]>(() =>
      rawCategories.value ? flattenCategories(rawCategories.value.data) : [],
    );

    const brands = computed<Brand[]>(() =>
      rawBrands.value
        ? rawBrands.value.data.map((b) => ({
            id: b.id,
            name: b.title,
            count: b.products_count,
          }))
        : [],
    );

    if (catError.value || brandError.value) {
      console.error(
        'Error fetching static filters:',
        catError.value || brandError.value,
      );
    }

    return { categories, brands };
  };

  return {
    fetchProducts,
    fetchStaticFilters,
  };
}
