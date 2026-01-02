import { useEffect, useState } from 'react'
import articlesFallback from '../data/articles'
import ArticleCard from '../components/ArticleCard'
import Carousel from '../components/Carousel'

function normalizeNewsApi(items){
  return items.map((a,i)=>({ id:i, title:a.title, description:a.description, url:a.url, urlToImage:a.urlToImage, author:a.author, publishedAt:a.publishedAt, source:a.source }))
}

function normalizeGNews(items){
  return items.map((a,i)=>({ id:i, title:a.title, description:a.description, url:a.url, urlToImage:a.image, author:a.source?.name || a.source, publishedAt:a.publishedAt, source:{name:a.source?.name || a.source} }))
}

function normalizeNewsData(items){
  return items.map((a,i)=>({ id:i, title:a.title, description:a.description, url:a.link, urlToImage:a.image_url, author:a.creator?.[0], publishedAt:a.pubDate, source:{name:a.source_id} }))
}

function News() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [featured, setFeatured] = useState([])
  const [source, setSource] = useState('Local')
  const [error, setError] = useState(null)

  useEffect(() => {
    const localKeyNewsApi = localStorage.getItem('astra_key_newsapi')
    const localKeyGNews = localStorage.getItem('astra_key_gnews')
    const localKeyNewsData = localStorage.getItem('astra_key_newsdata')
    const keyNewsApi = localKeyNewsApi || import.meta.env.VITE_NEWS_API_KEY || '873f12e52d2246c9b8c7e45669959233'
    const keyGNews = localKeyGNews || import.meta.env.VITE_GNEWS_API_KEY
    const keyNewsData = localKeyNewsData || import.meta.env.VITE_NEWSDATA_KEY
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        if (keyNewsApi) {
          const url = 'https://newsapi.org/v2/everything?' +
                    'q=Apple&' +
                    'sortBy=popularity&' +
                    'apiKey=' + keyNewsApi;
          const response = await fetch(url, { signal: controller.signal })
          const data = await response.json()
          console.log('NewsAPI response', data);
          if (data.articles && data.articles.length) {
            const items = normalizeNewsApi(data.articles)
            setArticles(items)
            setFeatured(items.slice(0,4))
            setSource('NewsAPI')
            setError(null)
            return
          }
          if (data.code || data.status === 'error') {
            setError(data.message || 'NewsAPI error')
          }
        }
        if (keyGNews) {
          const res = await fetch(`https://gnews.io/api/v4/top-headlines?lang=en&max=12&token=${keyGNews}`, { signal: controller.signal })
          const data = await res.json()
          console.log('GNews response', data)
          if (data.articles && data.articles.length) {
            const items = normalizeGNews(data.articles)
            setArticles(items)
            setFeatured(items.slice(0,4))
            setSource('GNews')
            setError(null)
            return
          }
          if (data.code || data.errors) {
            setError(data.message || 'GNews error')
          }
        }
        if (keyNewsData) {
          const res = await fetch(`https://newsdata.io/api/1/news?country=us&language=en&apikey=${keyNewsData}`, { signal: controller.signal })
          const data = await res.json()
          console.log('NewsData response', data)
          if (data.results && data.results.length) {
            const items = normalizeNewsData(data.results)
            setArticles(items)
            setFeatured(items.slice(0,4))
            setSource('NewsData')
            setError(null)
            return
          }
          if (data.status === 'error') {
            setError(data.message || 'NewsData error')
          }
        }
        // if none succeeded, set fallback
        setArticles(articlesFallback)
        setFeatured(articlesFallback.slice(0,4))
        setSource('Local')
      } catch (e) {
        console.error('Fetch error', e)
        setError(e.message)
        setArticles(articlesFallback)
        setFeatured(articlesFallback.slice(0,4))
        setSource('Local')
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, [])

  return (
    <section className="news">
      <div className="container">
        <div className="card">
          <div className="news-header">
            <h1>Latest Dispatches</h1>
            <div className="source-badge">{source}</div>
          </div>
          {loading ? (
            <div className="loader">
              <div className="paper" />
            </div>
          ) : (
            <>
              {error && <div className="error-notice">Failed to fetch: {error}</div>}
              <div className="meta">Showing {articles.length} articles</div>
              <Carousel items={featured} />
              <div className="news-grid">
                {articles.map((article, i) => <ArticleCard key={i} article={article} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default News
