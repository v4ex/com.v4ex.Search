/* Copyright (c) 2022, V4EX Inc. All rights reserved. */

// Summary
// -------
// 1. Provide SearchBox component.
// 2. Intend to be used on Homepage.


// System
import React from 'react'
// Next.js
import Head from 'next/head'
import Router from 'next/router'
// App
import styles from '../styles/SearchBox.module.css';


export default class SearchBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchInput: props.input
    }

    this.handleSearchInput = this.handleSearchInput.bind(this)
    this.handleSearchClear = this.handleSearchClear.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchInput(event) {
    this.setState({
      searchInput: event.target.value
    })
  }
  
  handleSearchClear(event) {
    this.setState({
      searchInput: ''
    })
  }

  handleSearchSubmit(event) {
    event.preventDefault()
    
    const query = encodeURIComponent(this.state.searchInput ?? 'V4EX')
    Router.push('/search?q=' + query)
  }
  
  render() {
    return(
      <div id="search-box" className={styles['search-box']}>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
        </Head>


        <form id="search-form" className={styles['search-form']}>
          <div id="search-control" className={styles['search-control']}>
            <div id="search-icon" className={styles['search-icon']}><i className="fa fa-search"></i></div>

            <input id="search-input" className={styles['search-input']} value={this.state.searchInput} onChange={this.handleSearchInput}>
            </input>

            {this.state.searchInput && <div id="search-clear" className={styles['search-clear']} onClick={this.handleSearchClear}><i className="fa fa-times"></i></div>}
          </div>
          
          <input id="search-submit" className={styles['search-submit']} type="submit" value="Search" onClick={this.handleSearchSubmit}></input>
        </form>
      </div>
    )
  }
}
