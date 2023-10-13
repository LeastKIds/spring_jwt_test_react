export const emailTypeCheck = (email: string): boolean => {
    const check = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return check.test(email);
}

export const passwordTypeCheck = (password: string): boolean => {
    return password.length >= 8;
}