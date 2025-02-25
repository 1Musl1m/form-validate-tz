<script setup lang="ts">
import { ref, computed } from "vue";
import { useFormStore } from "./stores/form";
import { z } from "zod";
import { useToast } from "primevue/usetoast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Password from "primevue/password";
import Toast from "primevue/toast";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const formStore = useFormStore();
const toast = useToast();

const formSchema = z.object({
  label: z.string().max(50, "Максимум 50 символов").nonempty("Метка обязательна"),
  type: z.enum(["LDAP", "Локальная"]),
  email: z.string().max(100, "Максимум 100 символов").email("Некорректный email"),
  password: z.union([
    z.string().max(100, "Максимум 100 символов").nonempty("Пароль обязателен"),
    z.null()
  ])
});

const newLabel = ref("");
const newType = ref<"LDAP" | "Локальная">("LDAP");
const newEmail = ref("");
const newPassword = ref("");

const isPasswordVisible = computed(() => newType.value === "Локальная");

const addNewForm = () => {
  const passwordValue = isPasswordVisible.value ? newPassword.value : null;

  const validation = formSchema.safeParse({
    label: newLabel.value,
    type: newType.value,
    email: newEmail.value,
    password: passwordValue
  });

  if (!validation.success) {
    toast.add({
      severity: "error",
      summary: "Ошибка валидации",
      detail: validation.error.errors.map(e => e.message).join(", "),
      life: 3000
    });
    return;
  }

  formStore.addForm({
    label: newLabel.value,
    type: newType.value,
    email: newEmail.value,
    password: passwordValue
  });

  toast.add({
    severity: "success",
    summary: "Успех",
    detail: "Форма добавлена",
    life: 2000
  });

  newLabel.value = "";
  newType.value = "LDAP";
  newEmail.value = "";
  newPassword.value = "";
};
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
    <Toast />

    <div class="flex items-center justify-between mb-4">
      <h1 class="text-3xl font-bold text-gray-800">Учетные записи</h1>
      <Button icon="pi pi-plus" @click="addNewForm" class="p-button-rounded p-button-success" />
    </div>

    <div class="grid grid-cols-4 gap-4 mb-4">
      <div>
        <label class="block text-gray-600">Метка</label>
        <InputText v-model="newLabel" placeholder="Введите метку" class="w-full border" />
      </div>

      <div>
        <label class="block text-gray-600">Тип записи</label>
        <Dropdown v-model="newType" :options="['LDAP', 'Локальная']" class="w-full" />
      </div>

      <div>
        <label class="block text-gray-600">Логин</label>
        <InputText v-model="newEmail" placeholder="Введите email" class="w-full" />
      </div>

      <div>
        <label class="block text-gray-600">Пароль</label>
        <Password v-if="isPasswordVisible" v-model="newPassword" placeholder="Введите пароль" class="w-full" toggleMask />
      </div>
    </div>

    <div v-if="formStore.forms.length" class="mt-6">
      <h2 class="text-2xl font-semibold text-gray-700 mb-3">Сохраненные записи</h2>

      <DataTable :value="formStore.forms" class="p-datatable-sm">
        <Column field="label" header="Метка" />
        <Column field="type" header="Тип" />
        <Column field="email" header="Логин" />
        <Column header="Пароль">
          <template #body="slotProps">
            <span v-if="slotProps.data.password">●●●●●</span>
            <span v-else class="text-gray-400">Нет пароля</span>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="formStore.removeForm(slotProps.index)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>
