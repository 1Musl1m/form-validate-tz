import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { useFormStore } from "../stores/form";
import { validateForm } from "../utils/validation";

export function useAccountForm() {
    const formStore = useFormStore();
    const toast = useToast();

    const newLabel = ref("");
    const newType = ref<"LDAP" | "Локальная">("LDAP");
    const newEmail = ref("");
    const newPassword = ref("");

    const isPasswordVisible = computed(() => newType.value === "Локальная");

    const addNewForm = () => {
        const passwordValue = isPasswordVisible.value
            ? newPassword.value
            : null;

        const validation = validateForm({
            label: newLabel.value,
            type: newType.value,
            email: newEmail.value,
            password: passwordValue,
        });

        if (!validation.success) {
            toast.add({
                severity: "error",
                summary: "Ошибка валидации",
                detail: validation.error.errors
                    .map((e) => e.message)
                    .join(", "),
                life: 3000,
            });
            return;
        }

        formStore.addForm({
            label: newLabel.value,
            type: newType.value,
            email: newEmail.value,
            password: passwordValue,
        });

        toast.add({
            severity: "success",
            summary: "Успех",
            detail: "Форма добавлена",
            life: 2000,
        });

        resetForm();
    };

    const resetForm = () => {
        newLabel.value = "";
        newType.value = "LDAP";
        newEmail.value = "";
        newPassword.value = "";
    };

    return {
        newLabel,
        newType,
        newEmail,
        newPassword,
        isPasswordVisible,
        addNewForm,
    };
}
