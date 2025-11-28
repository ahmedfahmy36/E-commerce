<template>
  <div class="flex flex-col min-h-screen">
    <!-- Top Header Bar (Account, Wishlist, Cart) -->
    <header class="bg-white border-b border-gray-100">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center"
      >
        <!-- Logo -->
        <h1 class="text-2xl font-bold text-gray-900 tracking-tight">
          <NuxtLink to="/">LOGO</NuxtLink>
        </h1>

        <!-- Account Links -->
        <div
          class="flex items-center space-x-4 lg:space-x-6 text-sm text-gray-700"
        >
          <!-- Account -->
          <button
            class="flex items-center hover:text-blue-600 transition-colors"
            aria-label="Account"
          >
            <svg
              class="w-5 h-5 mr-0 lg:mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <!-- Text only on large screens -->
            <span class="hidden lg:inline">Account</span>
          </button>

          <!-- Wishlist -->
          <button
            class="flex items-center hover:text-blue-600 transition-colors"
            aria-label="Wishlist"
          >
            <svg
              class="w-5 h-5 mr-0 lg:mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span class="hidden lg:inline">Wishlist</span>
          </button>

          <!-- Cart -->
          <button
            class="flex items-center font-medium hover:text-blue-600 transition-colors"
            aria-label="Cart"
          >
            <svg
              class="w-5 h-5 mr-0 lg:mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <span class="hidden lg:inline">Cart</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Navigation Bar (Sticky) -->
    <nav
      class="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-100 hidden md:block"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6 py-3 text-sm font-medium text-gray-700 overflow-x-auto"
      >
        <!-- Top-Level Categories -->
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Grocery</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap font-semibold text-blue-600"
          >Electronics</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Clothing</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap "
          >Furniture</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Toys & Video games</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Baby</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Beauty</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Personal Care</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Pets</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Sports</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Stationery</NuxtLink
        >
        <NuxtLink
          to="#"
          class="hover:text-blue-600 transition-colors whitespace-nowrap"
          >Brands</NuxtLink
        >
      </div>
    </nav>

    <!-- The main content area where NuxtPage renders -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Simple Footer -->
    <footer class="bg-gray-800 text-white mt-12">
      <div
        class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm"
      >
        &copy; {{ new Date().getFullYear() }} Ahmed Fahmy. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

console.log('Layout default.vue script setup starting...');

onMounted(() => {
  console.log('Layout mounted');
});
</script>
