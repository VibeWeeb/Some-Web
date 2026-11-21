<script setup>
defineProps({
  field: { type: String, required: true },
  sort: { type: String, default: '' },
  order: { type: String, default: '' },
})

defineEmits(['sort'])
</script>

<template>
  <span class="sort-buttons">
    <button type="button" class="sort-btn asc" :class="{ active: sort === field && order === 'asc' }"
      :aria-pressed="sort === field && order === 'asc'" title="Urutkan naik (asc)" aria-label="Urutkan naik"
      @click="$emit('sort', field, 'asc')" />
    <button type="button" class="sort-btn desc" :class="{ active: sort === field && order === 'desc' }"
      :aria-pressed="sort === field && order === 'desc'" title="Urutkan turun (desc)" aria-label="Urutkan turun"
      @click="$emit('sort', field, 'desc')" />
  </span>
</template>

<style scoped>
.sort-buttons {
  display: inline-flex;
  flex-direction: column;
  margin-left: 6px;
  vertical-align: middle;
}

.sort-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 11px;
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
}

/* segitiga dibuat dari border supaya tajam dan ikut warna teks */
.sort-btn::before {
  content: '';
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}

.sort-btn.asc::before {
  border-bottom: 6px solid currentColor;
}

.sort-btn.desc::before {
  border-top: 6px solid currentColor;
}

.sort-btn:hover,
.sort-btn.active {
  color: var(--color-primary);
}

.sort-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
  border-radius: 2px;
}
</style>
