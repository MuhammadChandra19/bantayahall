import React from 'react'
import NextHead from 'next/head'

export interface HeaderProps {
  pageTitle: string
  description: string
  currentURL?: string
  previewImage?: string
  siteName?: string
  subPath?: string
}

const Head: React.FC<HeaderProps> = ({
  pageTitle,
  description,
  currentURL = 'current',
  previewImage = '',
  siteName = '',
  subPath = "",
}) => {
  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" type="text/css" href={`${subPath}css/nprogress.css`} />
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:image" content={previewImage} key="ogimage" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,700;0,900;1,100;1,300&display=swap" rel="stylesheet"></link>
      <title>{pageTitle}</title>
      <link rel="icon" href={`${subPath}image/BNTHLL-LOGO.png`} />
      {process.env.NODE_ENV !== 'production' && (
        <link rel="stylesheet" type="text/css" href={'/_next/static/css/styles.chunk.css?v=' + Date.now()} />
      )}
    </NextHead>
  )
}

export default Head
