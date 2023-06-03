const BASEURL = '/api'

export type GetDeckProps = {
  deck: CardProps[]
}

/**
 * Get deck of cards
 * @returns Object of deck
 */
export const getDeck = async (): Promise<GetDeckProps> => {
  const res = await fetch(BASEURL + '/deck')
  const json = await res.json()
  return json
}
