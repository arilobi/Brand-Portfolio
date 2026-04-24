import { useState, useRef, useEffect } from "react";
import { petProjects, work } from "../data/Projects.json";
import { FAQAccordion } from "../components/Faqs";
import Marion from "../assets/Marion.jpg";
import Lenis from "lenis";

export default function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [activeCategory, setActiveCategory] = useState("petProjects");
    const aboutRef = useRef(null);

    const text = "Hey. My name is Marion. A software developer based in Nairobi. I'm also a digital artist and love incorporating my creative side in almost everything. Including Tech."

    const words = text.split(" ");

    const handleMouseMove = (e) => {
        const rect = aboutRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left + 15,
            y: e.clientY - rect.top + 15,
        });
    };

    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseEnter = () => setIsHovering(true);

    const getCurrentProjects = () => {
        switch (activeCategory) {
            case "petProjects": return petProjects;
            case "work": return work;
            case "figma": return work;
            default: return petProjects;
        }
    };

    const currentProjects = getCurrentProjects();

    // About section word-by-word visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (aboutRef.current) observer.observe(aboutRef.current);
        return () => observer.disconnect();
    }, []);

    // Smooth scroll setup
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    // One-time scroll animation observer (runs once on mount only)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                }
            });
        }, { threshold: 0.1 });

        const els = document.querySelectorAll(
            '.animate-fadeUp, .animate-slideDown, .animate-slideUp, .stagger-item, .project-card'
        );

        els.forEach(el => {
            // Already in viewport — animate immediately, no flash
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('animate-visible');
            } else {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []); // empty array: runs once only

    // Re-observe project cards when tab switches
    useEffect(() => {
        const id = requestAnimationFrame(() => {
            const els = document.querySelectorAll('.project-card, .stagger-item');
            els.forEach(el => {
                el.classList.remove('animate-visible');
            });

            // Next frame: re-add for ones already in viewport, observe the rest
            requestAnimationFrame(() => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                els.forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight) {
                        el.classList.add('animate-visible');
                    } else {
                        observer.observe(el);
                    }
                });

                return () => observer.disconnect();
            });
        });

        return () => cancelAnimationFrame(id);
    }, [currentProjects]); // only re-runs when tab changes

    const filters = [
        { id: "petProjects", label: "Pet Projects" },
        { id: "work", label: "Work" },
        { id: "figma", label: "Figma" },
    ];

    const GitHubIcon = () => (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
    );

    const getCategoryLabel = () => {
        switch (activeCategory) {
            case "petProjects": return "Pet Projects";
            case "work": return "Work";
            case "figma": return "Figma";
            default: return "Pet Projects";
        }
    };

    return (
        <div>
            <div className="hero animate-fadeUp">
                <h1>A Software Developer with interest in building immersive, aesthetically pleasing websites.</h1>
            </div>

            <h5 className="about-title animate-fadeUp">About moi</h5>
            <section id="about">
                <div
                    ref={aboutRef}
                    className="hero-about"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: "relative", cursor: "none" }}
                >
                    <h1>
                        {words.map((word, i) => (
                            <span
                                key={i}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transition: `opacity 0.8s ease ${i * 0.15}s`,
                                    display: "inline-block",
                                    marginRight: "0.25em",
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>

                    <img
                        src={Marion}
                        alt="Marion"
                        className="hover-photo"
                        style={{
                            position: "absolute",
                            left: mousePosition.x,
                            top: mousePosition.y,
                            opacity: isHovering ? 1 : 0,
                            transition: "opacity 0.3s ease",
                            pointerEvents: "none",
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "100px",
                            zIndex: 10,
                        }}
                    />
                </div>
            </section>

            <section id="projects">
                <h5 className="about-title">Projects</h5>

                <div className="project-filters">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveCategory(filter.id)}
                            className={`filter-btn ${activeCategory === filter.id ? 'active' : ''}`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="projects-grid">
                    {currentProjects.map((project) => (
                        <div key={project.id} className="project-card">
                            <div
                                className="project-bg"
                                style={{ backgroundImage: `url(${project.image})` }}
                            />

                            <div className="overlay" />

                            <div className="project-content">
                                <div className="project-header">
                                    <span className="project-category">
                                        {getCategoryLabel()}
                                    </span>
                                </div>

                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-tags">
                                    {project.tags.map((tag, idx) => (
                                        <span key={idx} className="tag">{tag}</span>
                                    ))}
                                </div>

                                {project.github && (
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                        <a href={project.github} className="github-link" target="_blank" rel="noopener noreferrer">
                                            <GitHubIcon />
                                        </a>

                                        {project.link && (
                                            <a href={project.link} className="demo-link" target="_blank" rel="noopener noreferrer">
                                                <span>View</span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <h5 className="about-title animate-fadeUp">Frequently asked questions</h5>
            <div className="animate-fadeUp">
                <FAQAccordion />
            </div>

            <section id="contact" className="contact animate-fadeUp">
                <h5 className="about-title">Projects</h5>
                <p className="wave-text animate-fadeUp">FEEL LIKE<br /> COLLABORATING?</p>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=marionnabulobi@gmail.com" target="_blank" className="btn hidden animate-fadeUp">Contact me</a>
            </section>
        </div>
    );
}