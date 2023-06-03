import Head from 'next/head'

export interface HeadProps {
  title: string
  description?: string
  tags?: string[]
}

const HeadLayout = ({
  title,
  description,
  tags = ['sueca', 'drink'],
}: HeadProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

      <title>{title}</title>
      <link rel="shortcut icon" href="/images/icon.svg" type="image/x-icon" />
      <meta name="description" content={description} />
      <meta name="keywords" content={tags?.join(', ')} />
      <meta name="author" content="YaGRRusso" />

      <meta property="og:title" content={title} key="title" />
      <meta property="og:image" content="/images/icon.svg" />
      <meta property="og:description" content={description} key="description" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://sueca-drinking.netlify.app" />
    </Head>
  )
}

export default HeadLayout
