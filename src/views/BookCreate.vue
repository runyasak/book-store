<script setup lang="ts">
import type {
  AddNewBookResult,
  RequestBookInput,
  RequestBookInputVariable
} from '@/models/book.model'
import { useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import {
  Form,
  Field,
  type SubmissionHandler,
  type GenericObject
} from 'vee-validate'
import { useRouter } from 'vue-router'

interface AuthorsSelect {
  authors: {
    id: number
    name: string
  }[]
}

const router = useRouter()

const { result: authorsSelect } = useQuery<AuthorsSelect>(gql`
  query AuthorsSelect {
    authors {
      id
      name
    }
  }
`)

const { mutate, onDone } = useMutation<
  AddNewBookResult,
  RequestBookInputVariable
>(gql`
  mutation AddNewBook($requestBookInput: RequestBookInput) {
    addBook(bookRequest: $requestBookInput) {
      bookId
    }
  }
`)

const handleSubmit: SubmissionHandler<GenericObject, GenericObject, unknown> = (
  params
) => {
  const requestBookInput = params as RequestBookInput
  mutate({ requestBookInput: requestBookInput })
}

onDone(() => {
  router.push({ name: 'home' })
})
</script>

<template>
  <div class="container mx-auto p-8 flex justify-center">
    <Form
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

      <button class="btn btn-success text-white w-full" type="submit">
        Save
      </button>
    </Form>
  </div>
</template>
