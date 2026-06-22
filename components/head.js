import React from 'react'
import NextHead from 'next/head'
import appImages from '../constants/appImages'

const Head = ({ title, description }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || "FR8"}</title>
    <meta name="description" content={description || "Wait Times Can Be Costly."} />
    <meta property="og:title" content="FR8" />
    <meta property="og:url" content="https://www.fr8.ai" />
    <meta property="og:description" content="Wait Times Can Be Costly."/>
    <meta property="og:image" content={"https://www.fr8.ai/images/logo.png"}/>
    <meta property="og:type" content="article" />
    <meta property="og:locale" content="en_GB" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    

    <link href="/styles/styles.css" rel="stylesheet" />
    <link href="/styles/responsive.css" rel="stylesheet" />
  </NextHead>
)

export default Head