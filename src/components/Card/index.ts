import CardBack from './Back'
import CardFront from './Front'
import CardPreview from './Preview'

export type * from './Front'
export type * from './Back'
export type * from './Preview'

const Card = {
  Front: CardFront,
  Back: CardBack,
  Preview: CardPreview,
}

export default Card
