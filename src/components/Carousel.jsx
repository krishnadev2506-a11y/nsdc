import { useEffect, useRef, useState } from 'react'

function Carousel({ items = [] }) {
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => setIndex(i => (i + 1) % items.length), 4000)
    return () => clearInterval(id)
  }, [items.length])

  useEffect(() => {
    if (ref.current) ref.current.style.transform = `translateX(-${index * 100}%)`
  }, [index])

  return (
    <div className="carousel">
      <div className="carousel-track" ref={ref}>
        {items.map((it, i) => (
          <div className="carousel-slide" key={i}>
            <div className="carousel-inner">
              <div className="carousel-card">
                <div className="carousel-media" style={{ backgroundImage: `url(${it.urlToImage || '/vite.svg'})` }} />
                <div className="carousel-info">
                  <h3 className="article-title">{it.title}</h3>
                  <p className="article-excerpt">{it.description || it.excerpt}</p>
                  <div style={{marginTop:'8px'}}>
                    <a className="button" href={it.url || '#'} target="_blank" rel="noreferrer">Read</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {items.map((_, i) => <div key={i} className={`carousel-dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} />)}
      </div>
    </div>
  )
}

export default Carousel
