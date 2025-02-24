<script setup lang="ts">
import { ref } from "vue";
import { useFormStore } from "./stores/form";

const formStore = useFormStore();

const newLabel = ref("");
const newType = ref<"LDAP" | "Локальная">("LDAP");
const newEmail = ref("");
const newPassword = ref("");

const addNewForm = () => {
    if (newLabel.value && newEmail.value && newPassword.value) {
        formStore.addForm({
            label: newLabel.value,
            type: newType.value,
            email: newEmail.value,
            password: newPassword.value,
        });

        newLabel.value = "";
        newType.value = "LDAP";
        newEmail.value = "";
        newPassword.value = "";
    } else {
        alert("Нужно обязательно заполнить все поля");
    }
};
</script>

<template>
  <div class="m-3">
    <div class="flex items-center gap-3">
      <h1 class="text-3xl font-bold">Учетные записи</h1>
      <button @click="addNewForm" class="border rounded p-1">
        <img src="/plus.svg" width="30" height="30" />
      </button>
    </div>

    <div class="grid grid-cols-4">
      <div>
        <h2 class="text-xl font-semibold text-gray-500">Метки</h2>
      </div>
      <div>
        <h2 class="text-xl font-semibold text-gray-500">Тип записи</h2>
      </div>
      <div>
        <h2 class="text-xl font-semibold text-gray-500">Логин</h2>
      </div>
      <div>
        <h2 class="text-xl font-semibold text-gray-500">Пароль</h2>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-3 mt-3">
      <input
        v-model="newLabel"
        type="text"
        placeholder="Метка"
        class="border rounded p-1"
      />
      <select v-model="newType" class="border rounded p-1">
        <option value="LDAP">LDAP</option>
        <option value="Локальная">Локальная</option>
      </select>
      <input
        v-model="newEmail"
        type="email"
        placeholder="Логин"
        class="border rounded p-1"
      />
      <input
        v-model="newPassword"
        type="password"
        placeholder="Пароль"
        class="border rounded p-1"
      />
    </div>

    <div v-if="addNewForm" v-for="(form, index) in formStore.forms" :key="index" class="grid grid-cols-4 gap-3 mt-3">
      <div>{{ form.label }}</div>
      <div>{{ form.type }}</div>
      <div>{{ form.email }}</div>
      <div>{{ form.password }}</div>
      <button @click="formStore.removeForm(index)" class="text-red-500">Удалить</button>
    </div>
  </div>
</template>