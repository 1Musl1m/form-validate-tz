import { z } from "zod";

export const formSchema = z.object({
    label: z
        .string()
        .max(50, "Максимум 50 символов")
        .nonempty("Метка обязательна"),
    type: z.enum(["LDAP", "Локальная"]),
    email: z
        .string()
        .max(100, "Максимум 100 символов")
        .email("Некорректный email"),
    password: z.union([
        z
            .string()
            .max(100, "Максимум 100 символов")
            .nonempty("Пароль обязателен"),
        z.null(),
    ]),
});

export function validateForm(data: any) {
    return formSchema.safeParse(data);
}
