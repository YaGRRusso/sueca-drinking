import { cards } from '@/mock/cards'
import type { NextApiHandler } from 'next'

const getDeck: NextApiHandler = async (req, res) => {
  return res.status(200).json({ deck: cards })
}

const handler: NextApiHandler = async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  switch (req.method) {
    case 'GET':
      return getDeck(req, res)
  }
}

export default handler
