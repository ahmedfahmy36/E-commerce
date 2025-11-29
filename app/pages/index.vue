<!-- pages/index.vue -->
<template>
  <div class="bg-white min-h-[calc(100vh-100px)] relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Breadcrumbs -->
      <nav class="text-sm mb-4">
        <ol class="list-none p-0 inline-flex text-gray-500">
          <li class="flex items-center">
            <NuxtLink to="/" class="hover:text-gray-800">Home</NuxtLink>
            <span class="mx-2">/</span>
          </li>
          <li class="flex items-center">
            <NuxtLink to="#" class="text-gray-800 medium">
              Electronics
            </NuxtLink>
          </li>
        </ol>
      </nav>

      <h2 class="text-3xl font-bold text-gray-900 mb-4 lg:mb-8">Electronics</h2>

      <!-- Mobile / Tablet top bar: Filter + item count -->
      <div class="flex items-center justify-between mb-4 lg:hidden">
        <button
          class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          @click="showMobileFilters = true"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <line x1="3" y1="6" x2="21" y2="6" stroke-width="2" />
            <line x1="3" y1="12" x2="21" y2="12" stroke-width="2" />
            <line x1="3" y1="18" x2="21" y2="18" stroke-width="2" />

            <circle cx="8" cy="6" r="2.3" stroke-width="1.3" />
            <circle cx="15" cy="12" r="2.3" stroke-width="1.3" />
            <circle cx="9" cy="18" r="2.3" stroke-width="1.3" />
          </svg>

          Filter
          <span v-if="activeFilterCount > 0" class="ml-1 text-blue-600">
            ({{ activeFilterCount }})
          </span>
        </button>
        <div class="text-xs text-gray-500 font-medium">
          {{ totalItems }} items
        </div>
      </div>

      <!-- Desktop (lg+) top bar: hide/show filters + active filter pills + item count -->
      <div
        class="hidden lg:flex justify-between items-center mb-6 py-3 border-b border-gray-200"
      >
        <div class="flex items-center space-x-3 text-sm flex-wrap gap-2">
          <button
            class="flex items-center text-gray-600 font-medium hover:text-red-500 transition-colors"
            @click="toggleFilters"
          >
            <svg
              class="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <!-- horizontal lines -->
              <line x1="3" y1="6" x2="21" y2="6" stroke-width="2" />
              <line x1="3" y1="12" x2="21" y2="12" stroke-width="2" />
              <line x1="3" y1="18" x2="21" y2="18" stroke-width="2" />

              <!-- circles with thinner stroke + small offset -->
              <circle cx="8" cy="6" r="2.3" stroke-width="1.3" />
              <circle cx="15" cy="12" r="2.3" stroke-width="1.3" />
              <circle cx="9" cy="18" r="2.3" stroke-width="1.3" />
            </svg>

            {{ showFilters ? "Hide Filters" : "Show Filters" }}
          </button>

          <!-- Active filter tags -->
          <template v-if="Object.keys(activeFiltersDisplay).length > 0">
            <span class="text-gray-700">|</span>
            <span
              v-for="(val, key) in activeFiltersDisplay"
              :key="key"
              class="inline-flex items-center bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full"
            >
              {{ key }}: {{ val }}
              <button
                @click="resetSpecificFilter(String(key))"
                class="ml-1.5 -mr-1 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </span>
          </template>
        </div>

        <!-- Item Count -->
        <div class="text-sm font-semibold text-gray-700">
          {{ totalItems }} Items
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <!-- Sidebar (desktop only) -->
        <ShopFilterSidebar
          v-if="showFilters"
          :categories="categories"
          :brands="brands"
        />

        <!-- Product Grid Section -->
        <section :class="showFilters ? 'lg:col-span-3' : 'lg:col-span-4'">
          <!-- Loading -->
          <div
            v-if="pending"
            class="text-center p-12 bg-gray-100 rounded-lg shadow-inner"
          >
            <p
              class="text-lg font-medium text-blue-500 flex items-center justify-center"
            >
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Loading products...
            </p>
          </div>

          <!-- Error -->
          <div
            v-else-if="error"
            class="text-center p-12 bg-red-50 border border-red-300 rounded-lg shadow-sm"
          >
            <p class="text-lg font-medium text-red-700">
              Error loading products.
            </p>
            <p class="text-sm text-red-600 mt-2">
              {{ String(error) }}
            </p>
          </div>

          <!-- Products + Pagination -->
          <div v-else-if="products.length > 0">
            <!-- Products grid -->
            <div
              class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              <ShopProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </div>

            <!-- Pagination -->
            <div
              v-if="pagination && pagination.last_page > 1"
              class="mt-8 flex justify-center"
            >
              <nav class="inline-flex items-center space-x-2 text-sm">
                <!-- Prev -->
                <button
                  class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400 disabled:opacity-40 disabled:cursor-default"
                  @click="goPrev"
                  :disabled="pagination.current_page === 1"
                >
                  ‹
                </button>

                <!-- Page numbers -->
                <button
                  v-for="page in pageNumbers"
                  :key="page"
                  @click="goToPage(page)"
                  class="w-8 h-8 flex items-center justify-center rounded border text-sm"
                  :class="
                    page === pagination.current_page
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:text-gray-900'
                  "
                >
                  {{ page }}
                </button>

                <!-- Next -->
                <button
                  class="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400 disabled:opacity-40 disabled:cursor-default"
                  @click="goNext"
                  :disabled="pagination.current_page === pagination.last_page"
                >
                  ›
                </button>
              </nav>
            </div>
          </div>

          <!-- No Results -->
          <div
            v-else
            class="text-center p-12 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
          >
            <p class="text-xl font-semibold text-gray-700">No results found.</p>
            <p class="text-gray-500 mt-2">
              Try clearing your filters or changing your search term.
            </p>
            <button
              @click="resetFilters"
              class="mt-6 py-2 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
            >
              Clear Filters
            </button>
          </div>
        </section>
      </div>
    </div>

    <!-- Mobile / tablet filter drawer -->
    <ShopFilterDrawer
      v-if="showMobileFilters"
      :categories="categories"
      :brands="brands"
      :items-count="totalItems"
      @close="showMobileFilters = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useHead } from "nuxt/app";
import { useProductFilter } from "../../composables/useProductFilter";
import {
  useApi,
  type Product,
  type Category,
  type Brand,
} from "../../composables/useApi";

// filters composable
const { filters, setFilter, resetFilters } = useProductFilter();

// API composable
const { fetchProducts, fetchStaticFilters } = useApi();

// pagination state
const currentPage = ref(1);
const PER_PAGE = 12;

// show/hide sidebar (desktop)
const showFilters = ref(true);
const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

// mobile / tablet filter drawer
const showMobileFilters = ref(false);

// static filters
const { categories, brands } = fetchStaticFilters();

// products (reactive to filters + page)
const {
  data: productsResponse,
  pending,
  error,
} = fetchProducts(filters, currentPage, PER_PAGE);

const products = computed<Product[]>(() => {
  return productsResponse.value?.data ?? [];
});

// pagination info from API
const pagination = computed(() => productsResponse.value?.pagination);

// total items
const totalItems = computed(
  () => pagination.value?.total ?? products.value.length
);

// Active pill display
const activeFiltersDisplay = computed<Record<string, string>>(() => {
  const active: Record<string, string> = {};

  if (filters.value.search) {
    active["Search"] = filters.value.search;
  }

  const category = categories.value.find(
    (c: Category) => c.id === filters.value.category_id
  );
  if (category) {
    active["Category"] = category.name;
  }

  const brand = brands.value.find(
    (b: Brand) => b.id === filters.value.brand_id
  );
  if (brand) {
    active["Brand"] = brand.name;
  }

  return active;
});

const activeFilterCount = computed(
  () => Object.keys(activeFiltersDisplay.value).length
);

// Reset a specific filter from pill bar
const resetSpecificFilter = (key: string) => {
  if (key === "Category") {
    setFilter("category_id", null);
  } else if (key === "Brand") {
    setFilter("brand_id", null);
  } else if (key === "Search") {
    setFilter("search", null);
  }
};

// Reset to page 1 whenever filters change
watch(
  () => ({ ...filters.value }),
  () => {
    currentPage.value = 1;
  }
);

// Pagination helpers
const pageNumbers = computed<number[]>(() => {
  if (!pagination.value) return [];
  const total = pagination.value.last_page;
  const current = pagination.value.current_page;

  const maxToShow = 3;
  const pages: number[] = [];

  let start = Math.max(1, current - 1);
  let end = Math.min(total, start + maxToShow - 1);

  if (end - start < maxToShow - 1) {
    start = Math.max(1, end - maxToShow + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const goToPage = (page: number) => {
  if (!pagination.value) return;
  if (page < 1 || page > pagination.value.last_page) return;
  currentPage.value = page;
};

const goPrev = () => {
  if (!pagination.value) return;
  if (pagination.value.current_page > 1) {
    currentPage.value = pagination.value.current_page - 1;
  }
};

const goNext = () => {
  if (!pagination.value) return;
  if (pagination.value.current_page < pagination.value.last_page) {
    currentPage.value = pagination.value.current_page + 1;
  }
};

// SEO
useHead({
  title: "E-commerce",
  meta: [
    {
      name: "description",
      content: "Browse all our Products on the Nuxt E-commerce Shop.",
    },
  ],
});
</script>
