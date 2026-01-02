function NewsCard({ article }) {
  if (!article.urlToImage || !article.title) return null

  const date = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="news-card" onClick={() => window.open(article.url, '_blank')}>
      <div className="card-image-wrapper">
        <img src={article.urlToImage} alt={article.title} loading="lazy" />
      </div>
      <div className="card-content">
        <div className="card-meta">
          <span className="source">{article.source.name}</span>
          <span className="date">{date}</span>
        </div>
        <h3 className="card-title">{article.title}</h3>
        <p className="card-desc">{article.description}</p>
      </div>
    </div>
  )
}

export default NewsCard