import CardBack from './Back'
import CardFront from './Front'
import CardPreview from './Preview'

export type { CardFrontProps } from './Front'
export type { CardBackProps } from './Back'
export type { CardPreviewProps } from './Preview'

const Card = {
  Front: CardFront,
  Back: CardBack,
  Preview: CardPreview,
}

export default Card
