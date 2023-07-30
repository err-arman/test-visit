import { NextApiRequest, NextApiResponse } from "next/types";

export default function handler( req: NextApiRequest, res: NextApiResponse ) {
    // Clear cookie
    res.setHeader('Set-Cookie', `myvisit_user_token=;Max-Age=0;HttpOnly;Path=/`);
    res.status(200).json({ message: 'Logout successful' })
}