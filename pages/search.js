/* Copyright (c) 2022, V4EX Inc. All rights reserved. */

// Summary
// -------
// 1. Provide Search Results Page component.


// System
import React, { useEffect, useState } from 'react'
// Next.js
import Head from 'next/head'
// import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
// App
import SearchBar from '../components/search-bar'
import Pagination from '../components/pagination'
import styles from '../styles/Search.module.css'


function Search() {
  const router = useRouter()
  const { p, q } = router.query

  const [query, setQuery] = useState(q)
  const [page, setPage] = useState(p)
  const [pageAmount, setpageAmount] = useState(null) // Set in useEffect()
  const [content, setContent] = useState('')

  // For SearchBar props onQueryChange(newQuery)
  const handleQueryChange = async function(newQuery) {
    setQuery(newQuery)

    const response = await fetch(`/api/search?q=${query}`)
    const searchOutput = await response.json()
    updateContent(searchOutput.results)
  }

  // For Pagination props onPageChange(newPage)
  const handlePageChange = async function(newPage) {
    setPage(newPage)
    
    const response = await fetch(`/api/search?q=${query}&p=${newPage}`)
    const searchOutput = await response.json()
    updateContent(searchOutput.results)
  }

  // Run at page initialization
  useEffect(() => {
    const run = async function() {
      const response = await fetch(`/api/search?q=${query}&p=${page}`)
      const searchOutput = await response.json()
      updateContent(searchOutput.results)
      setpageAmount(searchOutput.page.amount)
    }
    run()
  }, [query, page])

  // Process search results to be content
  function updateContent(newResults) {
    const newContent = newResults.map((item, index) => {
      return (
        <article key={index} className={styles.result}>
          <h3>
            <a href={item.link}>{item.title}</a>
            <sub>{item.link}</sub>
          </h3>
          <p>{item.snippet}</p>
        </article>
      )
    })
    setContent(newContent)
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Search Result for {query} | V4EX Search</title>
        <meta name="description" content={'Search results for' + query} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.logo}>
          <Link href="/">
            <a><img src="/logo.svg" alt="V4EX Logo" width={86} height={86} /></a>
          </Link>
        </h1>

        <SearchBar input={query} onQueryChange={handleQueryChange} />
      </header>

      <main className={styles.main}>
        Search results for {query}:
        {content}
        <Pagination amount={pageAmount} onPageChange={handlePageChange} />
      </main>

      <footer className={styles.footer}>
        <Link href="/">
          <a>
            <span className={styles.logo}>
              <img src="/logo.svg" alt="V4EX Logo" width={44} height={44} />
            </span>
          </a>
        </Link>
      </footer>
    </div>
  )
}

//
export default Search
