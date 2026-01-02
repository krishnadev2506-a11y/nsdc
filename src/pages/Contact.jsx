import { useState } from 'react'

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Letters to the Editor</h1>
        <p>We await your correspondence with great interest.</p>
      </div>
      
      <div className="contact-paper">
        {submitted ? (
          <div className="success-message">
            <h3>Post Sent</h3>
            <p>Your missive has been received by our clerks.</p>
            <button className="button-vintage" onClick={() => setSubmitted(false)} style={{marginTop: '1rem'}}>Send Another</button>
          </div>
        ) : (
          <form className="vintage-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="6" required></textarea>
            </div>
            <button type="submit" className="button-vintage">Dispatch</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Contact