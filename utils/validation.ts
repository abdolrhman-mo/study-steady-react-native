export const validateUsername = (username: string): string | null => {
    if (!username) return "Username is required.";
    if (username.length < 4) return "Username must be at least 4 characters long.";
    return null;
  };

  export const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
    return null;
  };