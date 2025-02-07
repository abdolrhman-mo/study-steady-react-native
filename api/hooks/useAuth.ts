import { useState } from "react";
import { login, signup } from "../services/auth";
import { deleteId, deleteToken, saveId, saveToken } from "@/utils/tokenStorage";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any | null>(null);

    const performLogin = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await login(username, password);

            console.log('loggedin data', data)

            const token = data.user.token;
            await saveToken(token);
            
            const id = data.user.id;
            await saveId(id);

            console.log('useAuth: Login successful:', data);
            return data;
        } catch (err: any) {
            setError(err);
            console.error('useAuth: Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return { performLogin, loading, error };
};

// export const useSignup = () => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<any | null>(null);

//     const performSignup = async (username: string, password: string) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const data = await signup(username, password);

//             console.log('signedup data', data)

//             const token = data.token;
//             await saveToken(token);
            
//             const id = data.id;
//             await saveId(id);

//             console.log('useAuth: Signup successful:', data);
//             return data;
//         } catch (err: any) {
//             setError(err);
//             console.error('useAuth: Signup error:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { performSignup, loading, error };
// };

export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ message?: string } | null>(null);

    const performSignup = async (firstName: string, lastName: string, username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await signup( firstName, lastName, username, password );

            console.log('Signed up data:', data);

            await saveToken(data.token);
            await saveId(data.id);

            console.log('useAuth: Signup successful:', data);
            return data;
        } catch (err: any) {
            const errorMessage = err?.message || 'An unexpected error occurred';
            setError({ message: errorMessage });
            console.error('useAuth: Signup error:', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { performSignup, loading, error };
};


export const useLogout = () => {
    const logoutUser = async () => {
        await deleteToken();
        await deleteId();
        console.log("useAuth: User logged out.");
    };

    return { logoutUser };
};
