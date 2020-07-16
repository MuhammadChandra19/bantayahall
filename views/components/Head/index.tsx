import React from 'react'
import NextHead from 'next/head'

export interface HeaderProps {
  pageTitle: string
  description: string
  currentURL?: string
  previewImage?: string
  siteName?: string
}

const Head: React.FC<HeaderProps> = ({
  pageTitle,
  description,
  currentURL = 'current',
  previewImage = '',
  siteName = '',
}) => {
  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:url" content={currentURL} key="ogurl" />
      <meta property="og:image" content={previewImage} key="ogimage" />
      <meta property="og:site_name" content={siteName} key="ogsitename" />
      <meta property="og:title" content={pageTitle} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <title>{pageTitle}</title>
      <link rel="icon" href="/favicon.ico" />
      {process.env.NODE_ENV !== 'production' && (
        <link rel="stylesheet" type="text/css" href={'/_next/static/css/styles.chunk.css?v=' + Date.now()} />
      )}
    </NextHead>
  )
}

export default Head
