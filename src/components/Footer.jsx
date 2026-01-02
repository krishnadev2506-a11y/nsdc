function Footer(){
  return (
    <footer className="footer container">
      <div className="brand">Astra</div>
      <div>
        <span style={{marginRight:12}}>© {new Date().getFullYear()}</span>
        <a href="/about" style={{color:'inherit',textDecoration:'none',marginRight:12}}>About</a>
        <a href="/contact" style={{color:'inherit',textDecoration:'none'}}>Contact</a>
      </div>
    </footer>
  )
}

export default Footer
