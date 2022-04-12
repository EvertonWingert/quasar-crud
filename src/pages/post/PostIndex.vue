<template>
  <q-page padding>
    <q-btn color="primary" :to="{ name: 'posts.create' }">
      <q-icon name="add"></q-icon>
      Add Post
    </q-btn>
    <q-table
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
      <template #body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditPost(props.row.id)"/>
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import postsService from 'src/services/posts'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const router = useRouter()
const { list, remove } = postsService()

const columns = [
  { name: 'id', field: 'id', label: 'Id', sortable: true, align: 'left' },
  { name: 'title', field: 'title', label: 'Título', sortable: true, align: 'left' },
  { name: 'author', field: 'author', label: 'Autor', sortable: true, align: 'left' },
  { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
]

const posts = ref([])

onMounted(() => {
  getPosts()
})
const getPosts = async () => {
  try {
    posts.value = await list()
  } catch (error) {
    $q.notify({ message: 'Falha ao buscar posts', icon: 'times', color: 'negative' })
  }
}
const handleDeletePost = async (id) => {
  $q.dialog({
    title: 'Deletar',
    message: 'Deseja deletar este post ?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      await remove(id)
      posts.value = posts.value.filter(post => post.id !== id)
      $q.notify({ message: 'Apagado com sucesso', icon: 'check', color: 'positive' })
    } catch (error) {
      $q.notify({ message: 'Erro ao apagar post', icon: 'times', color: 'negative' })
    }
  })
}
const handleEditPost = (id) => {
  router.push({ name: 'posts.edit', params: { id } })
}
</script>
