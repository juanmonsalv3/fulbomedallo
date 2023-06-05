import { NextApiRequest, NextApiResponse } from 'next';

const hello = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: 'Hello' });
};

export default hello;
