import { NextApiRequest } from 'next';
import React from 'react';

export async function GET(request: NextApiRequest) {
  return new Response('John Doe');
}
