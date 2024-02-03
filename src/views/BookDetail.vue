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
        <span class="flex gap-1">
          <svg
            v-for="rating in currentBook.rating"
            :key="rating"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1.5C9.315 1.5 12 4.1325 12 7.38C12 4.1325 14.685 1.5 18 1.5C21.315 1.5 24 4.1325 24 7.38C24 12.2745 19.149 14.001 12.588 21.792C12.5158 21.8776 12.4257 21.9463 12.3242 21.9935C12.2226 22.0407 12.112 22.0651 12 22.0651C11.888 22.0651 11.7774 22.0407 11.6758 21.9935C11.5743 21.9463 11.4842 21.8776 11.412 21.792C4.851 14.001 0 12.2745 0 7.38C0 4.1325 2.685 1.5 6 1.5Z"
              fill="#DC3545"
            />
          </svg>
        </span>
      </div>
      <div class="pt-8 font-bold">Description :</div>
      <div>
        {{ currentBook.description }}
      </div>
    </div>
  </div>
</template>
