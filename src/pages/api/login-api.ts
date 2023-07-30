import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;
    const apiBaseUrl = process.env.API_BASE_URL;
    const cookieName = process.env.COOKIE_NAME;

    axios.post(`${apiBaseUrl}/auth/user/login`, {
        email,
        password
    }).then((response) => {
        const token = response.data.access_token;
        res.setHeader('Set-Cookie', `${cookieName}=${token};Max-Age=3600;HttpOnly;Path=/`);
        res.status(200).json({ access_token: token })
    }).catch((error: AxiosError) => {
        const errorData = error.response?.data as any ;
        res.status(401).json({ message: errorData?.message || 'Login failed with unexpected server error' });
    });
}
