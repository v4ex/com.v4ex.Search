/* Copyright (c) 2022, V4EX Inc. All rights reserved. */

// Summary
// -------
// 1. Provide Homepage component.


// System
import React from 'react'
// Next.js
import Head from 'next/head'
// import Image from 'next/image'
// App
import styles from '../styles/Home.module.css'
import SearchBox from '../components/search-box'


function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Homepage | V4EX Search</title>
        <meta name="description" content="World Wide Web Search Engine" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="V4EX Logo" width={86} height={86} />
        </div>

        <h1 id="title" className={styles.title}>
          V4EX
        </h1>

        <SearchBox />
      </main>

    </div>
  )
}

//
export default Home
