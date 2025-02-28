<script setup lang="ts">
import { useFormStore } from "../stores/form";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

const formStore = useFormStore();
</script>

<template>
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
                <Button
                    icon="pi pi-trash"
                    class="p-button-text p-button-danger"
                    @click="formStore.removeForm(slotProps.index)"
                />
            </template>
        </Column>
    </DataTable>
</template>
