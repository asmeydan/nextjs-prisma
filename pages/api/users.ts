import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'GET') {
    const users = await prisma.user.findMany()
    res.json(users)
  } 
  
  else if (req.method === 'POST') {
    console.log(req.body)
    const { name, email } = req.body
    if((name === "") || (email === "")) {
      return res.status(400).json({message: "error"})
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
    res.json(user)
  }
  
}