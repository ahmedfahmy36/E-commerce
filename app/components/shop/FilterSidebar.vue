<!-- components/Shop/ShopFilterSidebar.vue -->
<template>
  <aside
    class="hidden lg:block lg:col-span-1 bg-white p-0 rounded-2xl h-fit sticky top-[120px]"
  >
    <div class="space-y-6">
      <!-- Category Filter -->
      <div class="border-b border-gray-200 pb-4">
        <h4 class="text-xl font-bold text-gray-900 mb-4 px-1">Category</h4>

        <!-- Search by Category -->
        <div class="mb-4 px-1">
          <div class="relative">
            <input
              v-model="categorySearch"
              type="text"
              placeholder="Search by category"
              class="w-full p-2 pl-8 border border-gray-300 rounded-full text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <ul class="space-y-3 max-h-60 overflow-y-auto pr-2 px-1">
          <li
            v-for="cat in filteredCategories"
            :key="cat.id"
            class="flex items-center justify-between text-sm"
          >
            <label
              class="flex items-center cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
            >
              <input
                type="checkbox"
                :checked="filters.category_id === cat.id"
                @change="
                  setFilter(
                    'category_id',
                    ($event.target as HTMLInputElement).checked
                      ? cat.id
                      : null,
                  )
                "
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2">{{ cat.name }}</span>
            </label>
            <span class="text-gray-500 text-xs">
              ({{ cat.count || 0 }})
            </span>
          </li>
        </ul>
      </div>

      <!-- Brand Filter -->
      <div class="pb-4">
        <h4 class="text-xl font-bold text-gray-900 mb-4 px-1">Brand</h4>

        <!-- Search by Brand -->
        <div class="mb-4 px-1">
          <div class="relative">
            <input
              v-model="brandSearch"
              type="text"
              placeholder="Search by brand"
              class="w-full p-2 pl-8 border border-gray-300 rounded-full text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <svg
              class="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <ul class="space-y-3 max-h-60 overflow-y-auto pr-2 px-1">
          <li
            v-for="brand in filteredBrands"
            :key="brand.id"
            class="flex items-center justify-between text-sm"
          >
            <label
              class="flex items-center cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
            >
              <input
                type="checkbox"
                :checked="filters.brand_id === brand.id"
                @change="
                  setFilter(
                    'brand_id',
                    ($event.target as HTMLInputElement).checked
                      ? brand.id
                      : null,
                  )
                "
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2">{{ brand.name }}</span>
            </label>
            <span class="text-gray-500 text-xs">
              ({{ brand.count || 0 }})
            </span>
          </li>
        </ul>
      </div>

 
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProductFilter } from '../../../composables/useProductFilter';
import type { Category, Brand } from '../../../composables/useApi';

const props = defineProps<{
  categories: Category[];
  brands: Brand[];
}>();

const { filters, setFilter } = useProductFilter();

const categorySearch = ref('');
const brandSearch = ref('');
const priceRange = ref({ min: 0, max: 1000 });

// Filtered lists
const filteredCategories = computed(() => {
  if (!categorySearch.value) return props.categories;
  const searchLower = categorySearch.value.toLowerCase();
  return props.categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchLower),
  );
});

const filteredBrands = computed(() => {
  if (!brandSearch.value) return props.brands;
  const searchLower = brandSearch.value.toLowerCase();
  return props.brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchLower),
  );
});
</script>
