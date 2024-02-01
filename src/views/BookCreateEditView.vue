<script setup lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Form, Field, ErrorMessage } from 'vee-validate'

interface QueryAuthors {
  authors: {
    id: number
    name: string
  }[]
}

const { result: authorsResult } = useQuery<QueryAuthors>(gql`
  query Authors {
    authors {
      id
      name
    }
  }
`)

const { mutate: createBook } = useMutation(gql`
  mutation createBook($createBookRequest: RequestBookInput!) {
    addBook(bookRequest: $createBookRequest) {
      title
      description
      coverImageUrl
      rating
      authorId
    }
  }
`)

function onSubmit(params) {
  createBook({
    createBookRequest: params
  })
}
</script>
<template>
  <div class="container mx-auto p-8">
    <Form class="flex flex-col gap-4 items-center" @submit="onSubmit">
      <div class="flex flex-col gap-2 w-full max-w-xs">
        <label class="font-bold" for="title">Book Name</label>
        <Field
          class="input input-bordered"
          name="title"
          id="title"
          placeholder="Type here"
          rules="required"
          model-value="World Book"
        />
        <ErrorMessage name="title">
          <span class="text-error"> Book name is required. </span>
        </ErrorMessage>
      </div>

      <div class="flex flex-col gap-2 w-full max-w-xs">
        <label class="font-bold" for="authorId">Author</label>
        <Field
          v-if="authorsResult"
          as="select"
          class="select select-bordered"
          name="authorId"
          id="authorId"
          placeholder="Type here"
          rules="required"
          model-value="Shakesword"
        >
          <option disabled selected>Who shot first?</option>
          <option
            v-for="author in authorsResult.authors"
            :key="author.id"
            :value="author.id"
          >
            {{ author.name }}
          </option>
        </Field>
        <ErrorMessage name="author">
          <span class="text-error"> Author is required. </span>
        </ErrorMessage>
      </div>

      <div class="flex flex-col gap-2 w-full max-w-xs">
        <label class="font-bold" for="coverImageUrl">Image URL</label>
        <Field
          class="input input-bordered"
          name="coverImageUrl"
          id="coverImageUrl"
          placeholder="Type here"
          rules="required"
          model-value="https://fastly.picsum.photos/id/103/200/300.jpg?hmac=QNhmiuWX_v7Br1-vACnDXKchd_VJ1OjbxDKwIM2NpD4"
        />
        <ErrorMessage name="coverImageUrl">
          <span class="text-error"> Image URL is required. </span>
        </ErrorMessage>
      </div>

      <div class="flex flex-col gap-2 w-full max-w-xs">
        <label class="font-bold" for="rating">Rating (number)</label>
        <Field
          class="input input-bordered"
          name="rating"
          id="rating"
          placeholder="Type here"
          rules="required"
          :model-value="5"
        />
        <ErrorMessage name="rating">
          <span class="text-error"> Rating is required. </span>
        </ErrorMessage>
      </div>

      <div class="flex flex-col gap-2 w-full max-w-xs">
        <label class="font-bold" for="description">Description</label>
        <Field
          class="textarea textarea-bordered"
          name="description"
          id="description"
          placeholder="Type here"
          rules="required"
          as="textarea"
          model-value="This is the great book!!"
        />
        <ErrorMessage name="description">
          <span class="text-error"> Description is required. </span>
        </ErrorMessage>
      </div>

      <!-- <textarea class="textarea textarea-bordered" placeholder="Bio"></textarea> -->

      <button class="btn btn-success text-white" type="submit">Save</button>
    </Form>
  </div>
</template>
