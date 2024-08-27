import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const flaskResponse = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (flaskResponse.redirected) {
        res.status(200).json({ success: true, redirectUrl: flaskResponse.url });
      } else {
        const errorText = await flaskResponse.text();
        res.status(401).json({ success: false, message: errorText });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
