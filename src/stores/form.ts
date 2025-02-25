import { defineStore } from "pinia";
import { ref } from "vue";

interface Form {
    label: string;
    type: "LDAP" | "Локальная";
    email: string;
    password: string | null;
}

export const useFormStore = defineStore("form", () => {
    const forms = ref<Form[]>([]);

    const addForm = (form: Form) => {
        forms.value.push(form);
    };

    const removeForm = (index: number) => {
        forms.value.splice(index, 1);
    };

    return { forms, addForm, removeForm };
},{
    persist: true
});
