import { useState, useEffect } from 'react'
import NewsCard from '../components/NewsCard'

function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY
        const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${apiKey}`)
        const data = await response.json()
        if (data.articles) {
          const formattedArticles = data.articles.map(article => ({
            ...article,
            urlToImage: article.image
          }))
          setArticles(formattedArticles)
        } else {
          throw new Error(data.message || 'Failed to fetch news')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading) return <div className="loading">Loading top stories...</div>
  if (error) return <div className="error">Error: {error}</div>

  const leadArticle = articles[0]
  const gridArticles = articles.slice(1)

  return (
    <div className="container">
      <div className="date-line">
        {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} | Vol. I, No. 1 | Price: 5¢
      </div>
      <div className="page-header">
        <h1>The Daily Astra</h1>
        <p>Truth, Clarity, and Perspective</p>
      </div>

      {leadArticle && (
        <>
          <div className="section-label">Editor's Pick</div>
          <div className="lead-story" onClick={() => window.open(leadArticle.url, '_blank')}>
            <div className="lead-image">
              <img src={leadArticle.urlToImage} alt={leadArticle.title} />
            </div>
            <div className="lead-content">
              <span className="category-tag">Breaking News</span>
              <h2>{leadArticle.title}</h2>
              <p>{leadArticle.description}</p>
            </div>
          </div>
        </>
      )}

      <div className="section-label">Top Stories</div>
      <div className="news-grid">
        {gridArticles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Home
