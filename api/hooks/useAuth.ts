import { useState } from "react";
import { login, signup } from "../services/auth";
import { deleteToken, saveToken } from "@/utils/tokenStorage";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const performLogin = async (username: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await login(username, password);
        
        // Store the token or user info as needed
        await saveToken(data.token);

        console.log('Login successful:', data);
        return data;
      } catch (err: any) {
        setError(err);
        console.error('Login error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    return { performLogin, loading, error };
  };
  
  
  export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const performSignup = async (username: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await signup(username, password);
        
        await saveToken(data.token); // Save token to SecureStore

        console.log('Signup successful:', data);
        return data;
      } catch (err: any) {
        setError(err);
        console.error('Signup error:', err);
      } finally {
        setLoading(false);
      }
    };
  
    return { performSignup, loading, error };
  };


  export const useLogout = () => {
    const logoutUser = async () => {
      await deleteToken(); // Clear token from SecureStore
      console.log("User logged out.");
    };
  
    return { logoutUser };
  };