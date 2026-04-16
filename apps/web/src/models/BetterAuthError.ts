export type BetterAuthError = {
    message: string;
    code: string;
}

export const isBetterAuthError = (error: unknown): error is BetterAuthError => {
    return typeof error === "object" && error !== null && "message" in error && "code" in error;
}