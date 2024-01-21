export const checkPasswordValidity = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*\s).{6,24}$/;
    return passwordRegex.test(password);
}