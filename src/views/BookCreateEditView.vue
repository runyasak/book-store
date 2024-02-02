<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRoute } from 'vue-router';

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

const { mutate: updateBook } = useMutation(gql`
  mutation updateBook($bookId: Int!, $bookRequest: RequestBookInput) {
    updateBook(id: $bookId, bookRequest: $bookRequest) {
      title
      authorId
      coverImageUrl
      description
      rating
    }
  }
`)

const formValues = ref({
  title: null,
  authorId: null,
  coverImageUrl: null,
  rating: null,
  description: null,
})

const route = useRoute()
const bookId: number | undefined = route.params.id
if(bookId){
  const { result: bookResult } = useQuery(gql`
    query Book {
      books (where: { bookId: { eq: ${bookId} } }) {
        bookId
        author {
            id
        }
        title
        coverImageUrl
        rating
        description
      }
    }
  `)
  watch(bookResult, value => {
    if(value.books[0]) {
      formValues.value.title = value.books[0].title
      formValues.value.authorId = value.books[0].author.id
      formValues.value.rating = value.books[0].rating
      formValues.value.coverImageUrl = value.books[0].coverImageUrl
      formValues.value.description = value.books[0].description
    }
  })
    
}


function onSubmit(params) {
  if (bookId) {
    onUpdate(params)
  } else {
    onCreate(params)
  }
}

function onCreate(params) {
  createBook({
    createBookRequest: params
  })
}

function onUpdate(params) {
  updateBook({
    bookId: Number(bookId),
    bookRequest: params
  })
}
</script>
<template>
  <div class="container mx-auto p-8 flex justify-center">
    <Form class="flex flex-col gap-4 items-center w-full max-w-xs" @submit="onSubmit">
      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="title">Book Name</label>
        <Field
          v-model="formValues.title"
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

      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="authorId">Author</label>
        <Field
          v-if="authorsResult"
          v-model="formValues.authorId"
          as="select"
          class="select select-bordered"
          name="authorId"
          id="authorId"
          placeholder="Type here"
          rules="required"
        >
          <option disabled selected>Who shot first?</option>
          <option v-for="author in authorsResult.authors" :key="author.id" :value="author.id">
            {{ author.name }}
          </option>
        </Field>
        <ErrorMessage name="author">
          <span class="text-error"> Author is required. </span>
        </ErrorMessage>
      </div>

      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="coverImageUrl">Image URL</label>
        <Field
          v-model="formValues.coverImageUrl"
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

      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="rating">Rating (number)</label>
        <Field
          v-model="formValues.rating"
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

      <div class="flex flex-col gap-2 w-full">
        <label class="font-bold" for="description">Description</label>
        <Field
          v-model="formValues.description"
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

      <button class="btn btn-success text-white w-full" type="submit">Save</button>
    </Form>
  </div>
</template>
