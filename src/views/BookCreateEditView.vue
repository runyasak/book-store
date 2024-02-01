<script setup lang="ts">
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Form, Field, ErrorMessage } from 'vee-validate'

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
        />
        <ErrorMessage name="title">
          <span class="text-error"> Book name is required. </span>
        </ErrorMessage>
      </div>

      <div class="flex flex-col gap-2 w-full max-w-xs">
        <label class="font-bold" for="authorId">Author</label>
        <Field
          as="select"
          class="select select-bordered"
          name="authorId"
          id="authorId"
          placeholder="Type here"
          rules="required"
        >
          <option disabled selected>Who shot first?</option>
          <option :value="1">Han Solo</option>
          <option :value="2">Greedo</option>
        </Field>
        <!-- <select class="select select-bordered w-full max-w-xs">
  <option disabled selected>Who shot first?</option>
  <option>Han Solo</option>
  <option>Greedo</option>
</select> -->
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
        />
        <ErrorMessage name="description">
          <span class="text-error"> Description is required. </span>
        </ErrorMessage>
      </div>

      <button class="btn btn-success text-white" type="submit">Save</button>
    </Form>
  </div>
</template>
