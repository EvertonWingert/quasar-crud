<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row q-col-gutter-sm"
    >

        <q-input
          outlined
          v-model="form.title"
          label="Título"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
          :loading="isLoading"
        />

        <q-input
          outlined
          v-model="form.author"
          label="Autor"
          lazy-rules
          class="col-lg-6 col-xs-12"
          :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
          :loading="isLoading"
        />

        <div class="col-lg-12 col-xs-12">
          <q-editor
            v-model="form.content"
            min-height="5rem"
            :loading="isLoading"

          />
        </div>

        <div class="col-12 q-gutter-sm">
          <q-btn
            label="Salvar"
            color="primary"
            class="float-right"
            icon="save"
            type="submit"
            :loading="isLoading"
          />
          <q-btn
            label="Cancelar"
            color="white"
            class="float-right"
            text-color="primary"
            :to="{ name: 'home' }"
            :loading="isLoading"
          />
        </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'

const { post, getById, update } = postsService()

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const form = ref({
  title: '',
  content: '',
  author: ''
})
const isLoading = ref(false)

onMounted(() => {
  if (route.params.id) {
    getPost(route.params.id)
  }
})
const getPost = async (id) => {
  isLoading.value = true
  try {
    form.value = await getById(id)
  } catch (error) {
    $q.notify({ message: 'Falha ao buscar post', icon: 'times', color: 'negative' })
  } finally {
    isLoading.value = false
  }
}
const onSubmit = async () => {
  isLoading.value = true
  try {
    if (form.value.id) {
      await update(form.value)
    } else {
      await post(form.value)
    }
    $q.notify({ message: 'Post salvo com sucesso!', icon: 'check', color: 'positive' })
    await router.push({ name: 'posts.index' })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

</script>
