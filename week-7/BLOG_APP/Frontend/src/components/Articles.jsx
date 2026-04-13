import React, { useEffect, useState } from 'react'
function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8074/auth/articles')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Could not load articles')
        }
        setArticles(data.articles || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <div className="articles">
      <h2>Articles</h2>

      {loading && <p>Loading articles...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && articles.length === 0 && (
        <p>No articles available.</p>
      )}
      {!loading && !error && articles.length > 0 && (
        <div className="article-list">
          {articles.map((article) => (
            <article key={article._id || article.id} className="article-card">
              <h3>{article.title}</h3>
              {article.author && (
                <p className="article-author">
                  By {article.author.firstName} {article.author.lastName}
                </p>
              )}
              {article.createdAt && (
                <p className="article-date">
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
              )}
              <p className="article-excerpt">
                {article.content?.slice(0, 150) || 'No preview available.'}
                {article.content?.length > 150 && '...'}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default Articles;