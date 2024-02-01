<script setup lang="ts"></script>

<template>
  <div class="container p-8 mx-auto">
    This is Homepage
    <div class="grid grid-cols-4 gap-4 pt-8">
      <div class="card bg-base-100 shadow-xl">
        <figure>
          <img
            class="h-[210px] object-cover"
            src="https://picsum.photos/id/237/200/300"
            alt="Some book title"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">John Wick</h2>
          <div>by <span>James Camera</span></div>
          <div>date <span>February 2024</span></div>
          <div class="card-actions">
            <button class="btn btn-primary text-white">Read</button>
            <button class="btn btn-primary text-white">Edit</button>
            <button class="btn btn-primary text-white">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
