<template>
  <div class="mb-4">
    <h2 class="text-xl font-bold mb-2">Загрузить цитаты</h2>
    <form @submit.prevent="uploadQuotes">
      <textarea v-model="quoteText" class="w-full p-2 border rounded" rows="5" placeholder="Введите цитаты (одна на строку)"></textarea>
      <div class="mt-2">
        <label class="mr-2">
          <input type="radio" v-model="quoteType" value="author" class="mr-1">
          Автор
        </label>
        <label>
          <input type="radio" v-model="quoteType" value="folklore" class="mr-1">
          Фольклор
        </label>
      </div>
      <input v-if="quoteType === 'author'" v-model="authorName" class="w-full p-2 border rounded mt-2" placeholder="Имя автора">
      <input v-if="quoteType === 'folklore'" v-model="folkloreName" class="w-full p-2 border rounded mt-2" placeholder="Название фольклора">
      <button type="submit" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Загрузить</button>
    </form>
  </div>
</template>

<script setup>
const quoteText = ref('')
const quoteType = ref('author')
const authorName = ref('')
const folkloreName = ref('')

const uploadQuotes = async () => {
  const quotes = quoteText.value.split('\n').filter(quote => quote.trim() !== '')
  const payload = {
    type: quoteType.value,
    name: quoteType.value === 'author' ? authorName.value : folkloreName.value,
    quotes
  }

  try {
    await $fetch('/api/upload-quotes', {
      method: 'POST',
      body: payload
    })
    // Очистка формы после успешной загрузки
    quoteText.value = ''
    authorName.value = ''
    folkloreName.value = ''
    alert('Цитаты успешно загружены!')
  } catch (error) {
    console.error('Error uploading quotes:', error)
    alert('Ошибка при загрузке цитат')
  }
}
</script>
