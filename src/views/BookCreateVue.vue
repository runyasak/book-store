<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
</script>

<template>
  <div class="container mx-auto p-8 flex justify-center">
    <Form class="flex flex-col gap-4 items-center w-full max-w-xs">
      <div class="flex flex-col gap-2 w-full">
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

      <div class="flex flex-col gap-2 w-full">
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
          <option>Shakesword</option>
          <option>John Nonlen</option>
        </Field>
        <ErrorMessage name="author">
          <span class="text-error"> Author is required. </span>
        </ErrorMessage>
      </div>

      <div class="flex flex-col gap-2 w-full">
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

      <div class="flex flex-col gap-2 w-full">
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

      <div class="flex flex-col gap-2 w-full">
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

      <button class="btn btn-success text-white w-full" type="submit">Save</button>
    </Form>
  </div>
</template>
