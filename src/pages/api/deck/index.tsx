import { cards } from '@/mock/cards'
import type { NextApiHandler } from 'next'

const getDeck: NextApiHandler = (req, res) => {
  return res.status(200).json({ deck: cards })
}

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      return await getDeck(req, res)
  }
}

export default handler
