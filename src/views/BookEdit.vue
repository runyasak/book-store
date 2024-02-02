<script setup lang="ts">
import useMutationUpdateBook from '@/composables/useMutationUpdateBook'
import useQueryAuthorsSelect from '@/composables/useQueryAuthorsSelect'
import useQueryBookEditDetail from '@/composables/useQueryBookEditDetail'
import type { RequestBookInput } from '@/models/book.model'
import {
  Form,
  Field,
  type GenericObject,
  type SubmissionHandler
} from 'vee-validate'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()

const router = useRouter()

const bookId = Number(route.params['bookId'].toString())

const { result: bookDetail } = useQueryBookEditDetail(Number(bookId.toString()))

const { result: authorsSelect } = useQueryAuthorsSelect()

const { mutate: updateBookMutate, onDone: onDoneUpdateBookMutate } =
  useMutationUpdateBook()

const currentBookDetail = computed(() => {
  if (!bookDetail.value) {
    return null
  }

  const { __typename, ...restData } = bookDetail.value.books[0]

  return restData
})

const handleSubmit: SubmissionHandler<GenericObject, GenericObject, unknown> = (
  params
) => {
  const requestBookInput = params as RequestBookInput
  updateBookMutate({ bookId: bookId, requestBookInput: requestBookInput })
}

onDoneUpdateBookMutate(() => {
  router.push({ name: 'home' })
})
</script>

<template>
  <div class="container mx-auto p-8 flex justify-center">
    <Form
      v-if="currentBookDetail"
      :initial-values="currentBookDetail"
      class="flex flex-col gap-4 items-center w-full max-w-xs"
      @submit="handleSubmit"
    >
      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="title">Book Name</label>
        <Field
          class="input input-bordered"
          name="title"
          id="title"
          placeholder="Type here"
        />
      </div>

      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="authorId">Author</label>
        <Field
          as="select"
          class="select select-bordered"
          name="authorId"
          id="authorId"
          placeholder="Type here"
        >
          <option
            v-for="authorData in authorsSelect?.authors"
            :key="authorData.id"
            :value="authorData.id"
          >
            {{ authorData.name }}
          </option>
        </Field>
      </div>

      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="coverImageUrl">Image URL</label>
        <Field
          class="input input-bordered"
          name="coverImageUrl"
          id="coverImageUrl"
          placeholder="Type here"
        />
      </div>

      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="rating">Rating (number)</label>
        <Field
          class="input input-bordered"
          name="rating"
          id="rating"
          placeholder="Type here"
          type="number"
        />
      </div>

      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="description">Description</label>
        <Field
          class="textarea textarea-bordered"
          name="description"
          id="description"
          placeholder="Type here"
          as="textarea"
        />
      </div>

      <button class="btn btn-primary text-white w-full" type="submit">
        Update
      </button>
    </Form>
  </div>
</template>
