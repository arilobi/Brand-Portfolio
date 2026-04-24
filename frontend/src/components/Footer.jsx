import logo from "../assets/logo.png";

export default function Footer() {
     return (
    <footer style={{
      textAlign: 'center',
      padding: '3rem 1.5rem',
      marginTop: '4rem',
      fontFamily: 'Space Mono, monospace',
    }}>
      {/* Logo Image */}
      <div style={{ marginBottom: '1.5rem' }} className="animate-fadeUp">
        <img 
          src={logo}  
          alt="Logo" 
          style={{ 
            height: '50px', 
            width: 'auto',
            opacity: '0.9',
          }} 
        />
      </div>

      {/* Social Links */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        marginBottom: '2rem',
      }} className="animate-fadeUp">
        <a 
          href="https://github.com/arilobi" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#44403C',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/marion-nabulobi-a7aa5b344?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#44403C',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          LinkedIn
        </a>
        {/* <a 
          href="https://twitter.com/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#44403C',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Twitter
        </a> */}
        <a 
          href="https://instagram.com/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            color: '#44403C',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Instagram
        </a>
      </div>

      {/* Copyright */}
      <div style={{
        color: '#44403C',
        fontSize: '0.75rem',
      }} className="animate-fadeUp">
        © {new Date().getFullYear()} Designed and built by Marion Nabulobi All rights reserved.
      </div>
    </footer>
    )
}