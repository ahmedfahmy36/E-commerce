<!-- components/Shop/ShopFilterDrawer.vue -->
<template>
  <!-- 👇 was md:hidden, now lg:hidden so it works on tablet too -->
  <div class="fixed inset-0 z-40 flex lg:hidden">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/40"
      @click="emit('close')"
    ></div>

    <!-- Panel -->
    <div
      class="relative ml-auto h-full w-full max-w-sm bg-white shadow-xl flex flex-col"
    >
      <!-- Header -->
      <header
        class="flex items-center justify-between px-4 py-3 border-b border-gray-200"
      >
        <h3 class="text-base font-semibold text-gray-900">
          Filter by
          <span v-if="activeFilterCount > 0" class="text-blue-600">
            ({{ activeFilterCount }})
          </span>
        </h3>
        <button
          class="p-1 rounded hover:bg-gray-100"
          @click="emit('close')"
        >
          <svg
            class="w-5 h-5 text-gray-600"
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
      </header>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <!-- Category accordion -->
        <section>
          <button
            class="w-full flex items-center justify-between py-3 border-b border-gray-200"
            @click="openCategory = !openCategory"
          >
            <span class="text-sm font-medium text-gray-900">Category</span>
            <span class="text-gray-500">
              <svg
                v-if="!openCategory"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <svg
                v-else
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </span>
          </button>

          <div v-if="openCategory" class="pt-3 space-y-3">
            <!-- Search -->
            <div class="relative">
              <input
                v-model="categorySearch"
                type="text"
                placeholder="Search for category"
                class="w-full p-2 pl-8 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
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

            <ul class="space-y-2 max-h-64 overflow-y-auto pr-1">
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
        </section>

        <!-- Brand accordion -->
        <section>
          <button
            class="w-full flex items-center justify-between py-3 border-b border-gray-200"
            @click="openBrand = !openBrand"
          >
            <span class="text-sm font-medium text-gray-900">Brand</span>
            <span class="text-gray-500">
              <svg
                v-if="!openBrand"
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <svg
                v-else
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </span>
          </button>

          <div v-if="openBrand" class="pt-3 space-y-3">
            <!-- Search -->
            <div class="relative">
              <input
                v-model="brandSearch"
                type="text"
                placeholder="Search for brand name"
                class="w-full p-2 pl-8 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
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

            <ul class="space-y-2 max-h-64 overflow-y-auto pr-1">
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
        </section>
      </div>

      <!-- Footer CTA -->
      <footer
        class="px-4 py-3 border-t border-gray-200 bg-white flex items-center gap-3"
      >
        <button
          class="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          @click="handleClearAll"
        >
          Clear All
        </button>
        <button
          class="flex-1 py-2 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 filter-button"
          @click="emit('close')"
        >
          View {{ itemsCount }} Items
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProductFilter } from '../../../composables/useProductFilter';
import type { Category, Brand } from '../../../composables/useApi';

const props = defineProps<{
  categories: Category[];
  brands: Brand[];
  itemsCount: number;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const { filters, setFilter, resetFilters } = useProductFilter();

const openCategory = ref(true);
const openBrand = ref(true);

const categorySearch = ref('');
const brandSearch = ref('');

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

const activeFilterCount = computed(() => {
  let count = 0;
  if (filters.value.category_id) count++;
  if (filters.value.brand_id) count++;
  if (filters.value.search) count++;
  return count;
});

const handleClearAll = () => {
  resetFilters();
};
</script>
