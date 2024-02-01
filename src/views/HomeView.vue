<script setup lang="ts">
import useMutationDeleteBook from '@/composables/useMutationDeleteBook'
import useQueryBooks from '@/composables/useQueryBooks'
import dayjs from 'dayjs'
import { ref } from 'vue'

const deleteBookId = ref<number | null>(null)

const dialogRef = ref<{ showModal: () => void }>({ showModal: () => {} })

const { result, refetch } = useQueryBooks()

const { mutate: deleteBook, onDone } = useMutationDeleteBook()

function formatDate(date: string) {
  return dayjs(date).format('MMMM YYYY')
}

function onClickDelete(bookId: number) {
  dialogRef.value.showModal()
  deleteBookId.value = bookId
}

function onMutateDeleteBook() {
  if (deleteBookId.value) {
    deleteBook({ bookId: deleteBookId.value })
  }
}

onDone(() => {
  refetch()
})
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
            <button
              class="btn btn-error text-white !h-[24px] !min-h-[24px]"
              @click="onClickDelete(book.bookId)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <dialog ref="dialogRef" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Do you want to delete book?</h3>
        <p class="py-4">Are you sure?</p>
        <div class="modal-action">
          <form method="dialog" class="flex gap-4">
            <button class="btn">Close</button>
            <button class="btn btn-error text-white" @click="onMutateDeleteBook">Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
