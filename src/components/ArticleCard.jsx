function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <div className="media" style={{ backgroundImage: `url(${article.urlToImage || '/vite.svg'})` }} />
      <div className="article-top">
        <div className="article-tag">{article.tag || article.source?.name || 'News'}</div>
        <time className="article-meta">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : article.time} · {article.author}</time>
      </div>
      <h3 className="article-title">{article.title}</h3>
      <p className="article-excerpt">{article.description || article.excerpt}</p>
      <div className="article-actions">
        <a className="button" href={article.url || '#'} target="_blank" rel="noreferrer">Read</a>
      </div>
    </article>
  )
}

export default ArticleCard
