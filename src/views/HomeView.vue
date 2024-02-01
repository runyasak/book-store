<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import dayjs from 'dayjs'
import gql from 'graphql-tag'

interface QueryBooks {
  books: {
    bookId: number
    title: string
    coverImageUrl: string
    publishedDate: string
    author: {
      name: string
    }
  }[]
}

const { result } = useQuery<QueryBooks>(gql`
  query Books {
    books {
      bookId
      title
      coverImageUrl
      publishedDate
      author {
        name
      }
    }
  }
`)

function formatDate(date: string) {
  return dayjs(date).format('MMMM YYYY')
}
</script>

<template>
  <div class="container p-8 mx-auto">
    <div class="flex justify-end">
      <RouterLink :to="{ name: 'book-create' }" class="btn btn-success text-white">
        Create New Book
      </RouterLink>
    </div>

    <div v-if="result" class="grid grid-cols-4 gap-4 pt-8">
      <div v-for="book in result.books" :key="book.bookId" class="card bg-base-100 shadow-xl">
        <figure>
          <img class="h-[210px] object-cover" :src="book.coverImageUrl" :alt="book.title" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ book.title }}</h2>
          <div>
            by <span class="text-[#2F80ED] underline">{{ book.author.name }}</span>
          </div>
          <div>
            date <span class="text-[#2F80ED]"> {{ formatDate(book.publishedDate) }}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-primary text-white !h-[24px] !min-h-[24px]">Read</button>
            <button class="btn btn-secondary text-white !h-[24px] !min-h-[24px]">Edit</button>
            <button class="btn btn-error text-white !h-[24px] !min-h-[24px]">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
