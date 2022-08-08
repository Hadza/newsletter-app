<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal class="bg-white text-black text-center">
      <q-toolbar>
        <q-toolbar-title class="text-h3 text-weight-medium"
          >Newsletter
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LayoutDefault",

  components: {},

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
};
</script>

<style>
.q-toolbar {
  height: 90px;
}
</style>
