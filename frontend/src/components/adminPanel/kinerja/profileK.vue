<script setup>
import { ref, watch } from 'vue'
import { nilaiOptions } from '@/data/brain'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      nip: '',
      name: '',
      profile: '',
      pedagogik: null,
      profesional: null,
      sosial: null,
      kepribadian: null,
    }),
  },
})

const nilai = ref({ ...props.initialData })

watch(
  () => props.initialData,
  (newData) => {
    nilai.value = { ...newData }
  },
  { deep: true },
)

const grade = (score) => nilaiOptions.find((item) => item.value === Number(score))?.text ?? '-'
</script>

<template>
  <div class="back-side">
    <div class="left-side">
      <div class="left-title">
        <div class="rectangle" />
        <h3>Profile</h3>
      </div>
      <img v-if="nilai.profile" :src="`http://localhost:3000/uploads/${nilai.profile}`" alt="" />
      <img src="@/assets/people.png" alt="" v-else />
    </div>
    <div class="right-side">
      <div class="top">
        <div class="value">
          <div class="header">NIP</div>
          <div class="body">{{ nilai.nip }}</div>
        </div>
        <div class="value">
          <div class="header">NAMA</div>
          <div class="body">{{ nilai.name }}</div>
        </div>
      </div>
      <div class="down">
        <div class="value">
          <div class="header">PEDAGOGIK</div>
          <div class="body">
            <div class="grade">{{ grade(nilai.pedagogik) }}</div>
            <div class="score">{{ nilai.pedagogik }} / 4</div>
          </div>
        </div>
        <div class="value">
          <div class="header">SOSIAL</div>
          <div class="body">
            <div class="grade">{{ grade(nilai.sosial) }}</div>
            <div class="score">{{ nilai.sosial }} / 4</div>
          </div>
        </div>
        <div class="value">
          <div class="header">KEPRIBADIAN</div>
          <div class="body">
            <div class="grade">{{ grade(nilai.kepribadian) }}</div>
            <div class="score">{{ nilai.kepribadian }} / 4</div>
          </div>
        </div>
        <div class="value">
          <div class="header">PROFESIONAL</div>
          <div class="body">
            <div class="grade">{{ grade(nilai.profesional) }}</div>
            <div class="score">{{ nilai.profesional }} / 4</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back-side {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.rectangle {
  width: 40px;
  height: 20px;
  padding-right: 30px;
  background-color: var(--color-primary);
}

/* Left: photo */
.left-side {
  width: 40%;
}

.left-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  height: 10%;
  margin-left: 10px;
}

.left-side img {
  width: 80%;
  margin-top: 20px;
  border: 1px solid var(--color-border);
}

/* Right: scores */
.right-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 60%;
}

.right-side .top,
.down {
  display: flex;
  gap: 20px;
  width: 100%;
  height: 38%;
}

.right-side .top {
  align-items: end;
}

.right-side .value {
  width: 20%;
  height: 50%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
}

.right-side .value .header {
  height: 20%;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-primary-dark);
}

.right-side .value .body {
  padding: 10px;
  overflow-wrap: break-word;
}

.right-side .value .body .grade {
  font-size: 1.3rem;
}

.right-side .value .body .score {
  margin-top: 10px;
  font-size: 0.9rem;
}
</style>
