<template>
  <div
    class="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer"
  >
    <!-- Image Section -->
    <div class="relative bg-[#f9f9f9] p-3 rounded-2xl">
      <!-- Product Image -->
      <img
        :src="product.featured_image"
        :alt="product.title"
        class="w-full h-48 object-contain rounded-xl"
      />

      <!-- Sale Badge -->
      <div v-if="product.sale_percent" class="absolute top-3 left-3">
        <span
          class="bg-white text-red-600 text-sm font-bold px-3 py-1 rounded-md shadow-sm"
        >
          -{{ product.sale_percent }} %
        </span>
      </div>

      <!-- Wishlist Button -->
      <button
        @click.stop="toggleWishlist"
        class="absolute top-3 right-3 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-sm hover:shadow-md transition"
      >
        <svg
          class="w-5 h-5"
          :fill="isWishlisted ? '#ef4444' : 'none'"
          :stroke="isWishlisted ? '#ef4444' : '#111827'"
          stroke-width="1.7"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
          />
        </svg>
      </button>
    </div>

    <div class="px-3 pb-4 pt-2">
      <h3
        class="text-base font-medium text-gray-900 truncate mb-1"
        :title="product.title"
      >
        {{ product.title }}
      </h3>

      <!-- Price Section -->
      <div class="flex items-baseline gap-2 mt-1">
        <!-- If has sale price -->
        <template v-if="product.sale_price">
          <span class="text-lg font-bold text-red-600">
            {{ formatPrice(product.sale_price) }}
          </span>
          <span class="text-lg text-black line-through opacity-60">
            {{ formatPrice(product.price) }}
          </span>
        </template>

        <!-- Regular price only -->
        <template v-else>
          <span class="text-lg font-bold text-black">
            {{ formatPrice(product.price) }}
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '../../../composables/useApi';

const props = defineProps<{
  product: Product;
}>();

const isWishlisted = ref(false);

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};


const formatPrice = (price: string | null | undefined) => {
  if (!price) return '';
  const num = parseFloat(price.replace(/,/g, ''));
  if (Number.isNaN(num)) return price + '$';
  return `${num.toLocaleString('en-US')}$`;
};
</script>

<style scoped>
</style>
