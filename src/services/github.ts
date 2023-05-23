const BASEURL = 'https://api.github.com/users/'

export type UserProps = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: 'User' | 'Organization'
  site_admin: boolean
  name: string
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  hireable: boolean
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

/**
 * Get user of Github
 * @returns Object of user infos
 */
export const getUser = async (user: string): Promise<UserProps> => {
  const res = await fetch(BASEURL + user)
  const json = await res.json()
  return json
}
