<template>
  <div>
    <h2 class="text-xl font-bold mb-2">Список цитат</h2>
    <div class="mb-4">
      <label class="mr-2">
        <input type="radio" v-model="filterType" value="all" class="mr-1">
        Все
      </label>
      <label class="mr-2">
        <input type="radio" v-model="filterType" value="author" class="mr-1">
        По авторам
      </label>
      <label>
        <input type="radio" v-model="filterType" value="folklore" class="mr-1">
        Фольклор
      </label>
    </div>
    <ul>
      <li v-for="quote in filteredQuotes" :key="quote._path" class="mb-2 p-2 border rounded">
        <p>"{{ quote.content }}"</p>
        <p class="text-sm text-gray-600">- {{ quote.author || quote.folklore }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { data: quotes } = await useAsyncData('quotes', () => queryContent('quotes').find())
const filterType = ref('all')

const filteredQuotes = computed(() => {
  if (filterType.value === 'all') return quotes.value
  if (filterType.value === 'author') return quotes.value.filter(q => q.author)
  if (filterType.value === 'folklore') return quotes.value.filter(q => q.folklore)
})
</script>
