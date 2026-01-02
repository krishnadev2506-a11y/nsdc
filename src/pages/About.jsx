function About() {
  return (
    <section className="about-page">
      <div className="container">
        <div className="about-content">
          <h1>About Astra</h1>
          <p>A minimal news aggregator designed for clarity and focus. Built with React and the NewsAPI, Astra delivers the latest headlines in a clean, distraction-free interface.</p>
          <p>The design philosophy centers on typography, whitespace, and subtle interactions to create a premium reading experience.</p>
          <div className="tech-stack">
            <h3>Built with</h3>
            <ul>
              <li>React</li>
              <li>NewsAPI</li>
              <li>Plain CSS</li>
              <li>Vite</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
