<script setup lang="ts">
import DeleteBookModal from '@/components/DeleteBookModal.vue'
import useQueryBooksPagination from '@/composables/useQueryBooksPagination'
import { formatDate } from '@/utils/date.util'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref } from 'vue'

const deleteModalOpen = ref(false)

const deleteBookId = ref<number | null>(null)

const { result, refetch } = useQueryBooksPagination()

interface DeleteBookByIdResponse {
  data: {
    deleteBook: boolean
  }
}

const { mutate, onDone } = useMutation<DeleteBookByIdResponse>(gql`
  mutation DeleteBookByBookId($bookId: Int!) {
    deleteBook(id: $bookId)
  }
`)

function onClickDeleteBook(bookId: number) {
  deleteModalOpen.value = true
  deleteBookId.value = bookId
}

function handleMutateDeleteBook() {
  mutate({ bookId: deleteBookId.value })
}

function onRefetchBooks(after?: string) {
  refetch({ after: after })
}

onDone((params) => {
  if (params.data?.data.deleteBook) {
    refetch()
  } else {
    console.error(new Error('Cannot delete book'))
  }
})
</script>

<template>
  <div class="container p-8 mx-auto">
    <div class="flex justify-end">
      <RouterLink
        :to="{ name: 'create-book' }"
        class="btn btn-success text-white"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_4_153)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM8.5 4.5C8.5 4.36739 8.44732 4.24021 8.35355 4.14645C8.25979 4.05268 8.13261 4 8 4C7.86739 4 7.74021 4.05268 7.64645 4.14645C7.55268 4.24021 7.5 4.36739 7.5 4.5V7.5H4.5C4.36739 7.5 4.24021 7.55268 4.14645 7.64645C4.05268 7.74021 4 7.86739 4 8C4 8.13261 4.05268 8.25979 4.14645 8.35355C4.24021 8.44732 4.36739 8.5 4.5 8.5H7.5V11.5C7.5 11.6326 7.55268 11.7598 7.64645 11.8536C7.74021 11.9473 7.86739 12 8 12C8.13261 12 8.25979 11.9473 8.35355 11.8536C8.44732 11.7598 8.5 11.6326 8.5 11.5V8.5H11.5C11.6326 8.5 11.7598 8.44732 11.8536 8.35355C11.9473 8.25979 12 8.13261 12 8C12 7.86739 11.9473 7.74021 11.8536 7.64645C11.7598 7.55268 11.6326 7.5 11.5 7.5H8.5V4.5Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_4_153">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>

        Create New Book
      </RouterLink>
    </div>

    <div class="join grid grid-cols-2 pt-4 max-w-xs mx-auto">
      <button
        class="join-item btn btn-outline"
        :disabled="!result?.booksPagination.pageInfo.hasPreviousPage"
        @click="onRefetchBooks(result?.booksPagination.pageInfo.startCursor)"
      >
        Previous
      </button>
      <button
        class="join-item btn btn-outline"
        :disabled="!result?.booksPagination.pageInfo.hasNextPage"
        @click="onRefetchBooks(result?.booksPagination.pageInfo.endCursor)"
      >
        Next
      </button>
    </div>

    <div class="grid grid-cols-4 gap-4 pt-8">
      <div
        v-for="book in result?.booksPagination.nodes"
        :key="book.bookId"
        class="card bg-base-100 shadow-xl"
      >
        <figure>
          <img
            class="h-[210px] object-cover"
            :src="book.coverImageUrl"
            alt="Some book title"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ book.title }}</h2>
          <div>
            by
            <span class="text-[#2f80ed] underline">{{ book.author.name }}</span>
          </div>
          <div>
            date
            <span class="text-[#2f80ed]">
              {{ formatDate(book.publishedDate) }}
            </span>
          </div>
          <div class="card-actions">
            <RouterLink
              :to="{
                name: 'books-detail',
                params: { bookId: book.bookId }
              }"
              class="btn btn-primary text-white !h-[24px] !min-h-[24px]"
            >
              Read
            </RouterLink>
            <RouterLink
              :to="{ name: 'edit-book', params: { bookId: book.bookId } }"
              class="btn btn-secondary text-white !h-[24px] !min-h-[24px]"
            >
              Edit
            </RouterLink>
            <button
              class="btn btn-error text-white !h-[24px] !min-h-[24px]"
              @click="onClickDeleteBook(book.bookId)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <DeleteBookModal
    v-model="deleteModalOpen"
    @click-delete="handleMutateDeleteBook()"
  ></DeleteBookModal>
</template>
