/* Copyright (c) 2022, V4EX Inc. All rights reserved. */

// Links
// -----
// 1. https://developers.cloudflare.com/workers/runtime-apis/kv
// Summary
// -------
// 1. Provide Search Results API.
// 2. Try to get search results from KV.
// 3. Fetch fallback API if no result in KV.


export async function onRequest({ env, request }) {
  const init = {
    status: 200
  }

  const url = new URL(request.url)
  const params = url.searchParams
  const page = params.get('p', 1) // Page number
  const query = params.get('q', 'v4ex') // Search query

  let rawResults = await env.SEARCH_RESULTS.get(query, {type: 'json'})
  rawResults = rawResults || []

  const start = (page - 1) * 10
  const output = {
    results: rawResults.slice(start, start + 10),
    page: {
      amount: Math.ceil(rawResults.length / 10),
      current: page
    }
  }
  console.log(output) // DEBUG

  return new Response(JSON.stringify(output), init)
}
