export const validateUsername = (username: string): string | null => {
    if (!username) return "اسم المستخدم مطلوب.";
    if (username.length < 4) return "يجب أن يتكون اسم المستخدم من 4 أحرف على الأقل.";
    return null;
  };
  
  export const validatePassword = (password: string): string | null => {
    if (!password) return "كلمة المرور مطلوبة.";
    if (password.length < 6) return "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل.";
    if (!/[A-Z]/.test(password)) return "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.";
    if (!/[a-z]/.test(password)) return "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل.";
    if (!/[0-9]/.test(password)) return "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.";
    return null;
  };
  