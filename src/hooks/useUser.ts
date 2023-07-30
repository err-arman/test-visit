import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Define the type for the user object
export interface User {
    id: number;
    email: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    phone?: string
    address?:string
}

// Define the type for the decoded token
interface DecodedToken {
    sub: number;
    role: string;
    user: User;
    iat: number;
    exp: number;
}

const useUser = (access_token: string): User | null => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (!access_token || access_token === '') {
            // If access_token is not found or empty, navigate to login page
            router.push('/auth/login');
        } else {
            try {
                // Decode the JWT access_token
                const decodedToken = jwt.decode(access_token) as unknown as DecodedToken;
                if (decodedToken) {
                    // Extract the user object from the decoded token
                    const { user } = decodedToken;
                    setUser(user);
                } else {
                    // Invalid access_token, navigate to login page
                    router.push('/auth/login');
                }
            } catch (error) {
                console.error('Error decoding access_token:', error);
                // If decoding fails, navigate to login page
                router.push('/auth/login');
            }
        }
    }, []);

    return user;
};

export default useUser;