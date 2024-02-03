<script setup lang="ts">
import { formatDate } from '@/utils/date.util'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const bookId = route.params['bookId']

interface QueryBooksById {
  books: {
    __typename: string
    bookId: number
    title: string
    coverImageUrl: string
    publishedDate: string
    rating: number
    description: string
    author: {
      __typename: string
      name: string
    }
  }[]
}

const { result } = useQuery<QueryBooksById>(
  gql`
    query BooksByBookId($bookId: Int) {
      books(where: { bookId: { eq: $bookId } }) {
        bookId
        title
        coverImageUrl
        publishedDate
        rating
        description
        author {
          name
        }
      }
    }
  `,
  { bookId: Number(bookId.toString()) }
)

const currentBook = computed(() => result.value?.books[0] || null)
</script>

<template>
  <div
    v-if="currentBook"
    class="flex h-[calc(100dvh-64px)] items-center gap-4 p-8"
  >
    <img
      class="h-[405px] w-auto flex-1 object-contain"
      :src="currentBook.coverImageUrl"
    />

    <div class="flex flex-1 flex-col gap-4">
      <div class="text-4xl font-bold">{{ currentBook.title }}</div>
      <div>Author: {{ currentBook.author.name }}</div>
      <div>Published Date : {{ formatDate(currentBook.publishedDate) }}</div>
      <div class="flex gap-4">
        <span> Rating : </span>
        <span>{{ currentBook.rating }}</span>
      </div>
      <div class="pt-8 font-bold">Description :</div>
      <div>
        {{ currentBook.description }}
      </div>
    </div>
  </div>
</template>
