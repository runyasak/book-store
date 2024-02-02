<script setup lang="ts">
import { ref, watch } from 'vue'
const modelValue = defineModel<boolean>()

const emits = defineEmits<{
  clickDelete: []
}>()

const dialogRef = ref<{ showModal: () => void }>({ showModal: () => {} })

watch(
  () => modelValue.value,
  (isOpen) => {
    if (isOpen) {
      dialogRef.value.showModal()
    }
  }
)

function onClickDelete() {
  modelValue.value = false
  emits('clickDelete')
}
</script>

<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Do you want to delete book?</h3>
      <p class="py-4">Are you sure?</p>
      <div class="modal-action">
        <form method="dialog" class="flex gap-4">
          <button class="btn" @click="modelValue = false">Close</button>
          <button class="btn btn-error text-white" @click="onClickDelete">
            Delete
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
