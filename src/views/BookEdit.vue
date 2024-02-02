<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Form, Field } from 'vee-validate'
import { useRoute } from 'vue-router'

interface AuthorsSelect {
  authors: {
    id: number
    name: string
  }[]
}

const route = useRoute()

const bookId = route.params['bookId']

console.log('bookId', bookId)

const { result: authorsSelect } = useQuery<AuthorsSelect>(gql`
  query AuthorsSelect {
    authors {
      id
      name
    }
  }
`)

const initialValue = {
  title: 'World Book',
  authorId: 1,
  coverImageUrl: 'image.com',
  rating: 5,
  description: 'This is the great book'
}
</script>

<template>
  <div class="container mx-auto p-8 flex justify-center">
    <Form
      :initial-values="initialValue"
      class="flex flex-col gap-4 items-center w-full max-w-xs"
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
