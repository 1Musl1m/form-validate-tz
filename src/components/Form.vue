<script setup lang="ts">
import { useAccountForm } from "../composables/useAccountForm";
import { useFormStore } from "../stores/form";
import List from "./List.vue";
import Toast from "primevue/toast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Password from "primevue/password";

const {
    newLabel,
    newType,
    newEmail,
    newPassword,
    isPasswordVisible,
    addNewForm,
} = useAccountForm();
const formStore = useFormStore();
</script>

<template>
    <div class="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
        <Toast />

        <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-bold text-gray-800">Учетные записи</h1>
            <Button
                icon="pi pi-plus"
                @click="addNewForm"
                class="p-button-rounded p-button-success"
            />
        </div>

        <div class="grid grid-cols-4 gap-4 mb-4">
            <div>
                <label class="block text-gray-600">Метка</label>
                <InputText
                    v-model="newLabel"
                    placeholder="Введите метку"
                    class="w-full border"
                />
            </div>

            <div>
                <label class="block text-gray-600">Тип записи</label>
                <Dropdown
                    v-model="newType"
                    :options="['LDAP', 'Локальная']"
                    class="w-full"
                />
            </div>

            <div>
                <label class="block text-gray-600">Логин</label>
                <InputText
                    v-model="newEmail"
                    placeholder="Введите email"
                    class="w-full"
                />
            </div>

            <div>
                <label class="block text-gray-600">Пароль</label>
                <Password
                    :disabled="!isPasswordVisible"
                    v-model="newPassword"
                    placeholder="Введите пароль"
                    class="w-full"
                    toggleMask
                />
            </div>
        </div>

        <div v-if="formStore.forms.length" class="mt-6">
            <h2 class="text-2xl font-semibold text-gray-700 mb-3">
                Сохраненные записи
            </h2>
            <List />
        </div>
    </div>
</template>
