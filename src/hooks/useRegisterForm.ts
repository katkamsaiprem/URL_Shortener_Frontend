import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { validateUsername, validateEmail, validatePassword } from "../utils/authValidation";

export type Fields = { username: string; email: string; password: string };
export type Errors = { username: string; email: string; password: string; server: string };

type FormState = {
    fields: Fields;
    errors: Errors;
    loading: boolean;
};

type FormAction =
    | { type: "setField";   field: keyof Fields; value: string }
    | { type: "setError";   field: keyof Errors; message: string }
    | { type: "setErrors";  errors: Partial<Errors> }
    | { type: "setLoading"; value: boolean };

const emptyForm: FormState = {
    fields:  { username: "", email: "", password: "" },
    errors:  { username: "", email: "", password: "", server: "" },
    loading: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "setField":
            return { ...state, fields: { ...state.fields, [action.field]: action.value } };
        case "setError":
            return { ...state, errors: { ...state.errors, [action.field]: action.message } };
        case "setErrors":
            return { ...state, errors: { ...state.errors, ...action.errors } };
        case "setLoading":
            return { ...state, loading: action.value };
    }
}

const validators: Record<keyof Fields, (value: string) => string> = {
    username: validateUsername,
    email:    validateEmail,
    password: validatePassword,
};

export function useRegisterForm() {
    const [form, dispatch] = useReducer(formReducer, emptyForm);
    const register = useAuthStore((s) => s.register);
    const navigate = useNavigate();

    // Validate in real-time as user types
    const handleFieldChange = (field: keyof Fields) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            dispatch({ type: "setField", field, value });
            dispatch({ type: "setError", field, message: validators[field](value) });
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Run full validation check before sending request
        const usernameError = validateUsername(form.fields.username);
        const emailError    = validateEmail(form.fields.email);
        const passwordError = validatePassword(form.fields.password);

        dispatch({ type: "setErrors", errors: {
            username: usernameError,
            email:    emailError,
            password: passwordError,
            server:   "",
        }});

        if (usernameError || emailError || passwordError) return;

        dispatch({ type: "setLoading", value: true });
        try {
            await register(form.fields.username, form.fields.email, form.fields.password);
            navigate("/dashboard");
        } catch (err: unknown) {
            const serverMessage =
                err instanceof Error &&
                (err as { response?: { data?: { message?: string } } }).response?.data?.message;
            dispatch({ type: "setError", field: "server", message: serverMessage || "Registration failed." });
        } finally {
            dispatch({ type: "setLoading", value: false });
        }
    };

    return { form, handleFieldChange, handleSubmit };
}
