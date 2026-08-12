// Keep these regex rules in sync with the backend zod schemas
const rules = {
    username: {
        minLength: /^.{2,}$/,
        maxLength: /^.{0,50}$/,
        allowedChars: /^[a-zA-Z0-9_]+$/,
    },
    email: {
        format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        minLength: /^.{8,}$/,
        hasUppercase: /[A-Z]/,
        hasDigit: /[0-9]/,
        hasSpecialChar: /[^a-zA-Z0-9]/,
    },
} as const;

export function validateUsername(value: string): string {
    if (!value) return "";
    if (!rules.username.minLength.test(value)) return "Username must be at least 2 characters";
    if (!rules.username.maxLength.test(value)) return "Username cannot exceed 50 characters";
    if (!rules.username.allowedChars.test(value)) return "Only letters, numbers, and underscores allowed";
    return "";
}

export function validateEmail(value: string): string {
    if (!value) return "";
    if (!rules.email.format.test(value)) return "Must be a valid email address";
    return "";
}

export function validatePassword(value: string): string {
    if (!value) return "";
    if (!rules.password.minLength.test(value)) return "Password must be at least 8 characters";
    if (!rules.password.hasUppercase.test(value)) return "Must contain at least one uppercase letter";
    if (!rules.password.hasDigit.test(value)) return "Must contain at least one digit";
    if (!rules.password.hasSpecialChar.test(value)) return "Must contain at least one special character";
    return "";
}
