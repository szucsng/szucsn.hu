import { useState, useEffect } from "react";
import PillNav from './components/PillNav';

// Konfigurálható adatok
const DISCORD_USER_ID: string = "1499037894386647133";
const GITHUB_USERNAME: string = "szucsng";

// DiscordCard komponens: Lanyard vizuális kártya
const DiscordCard = () => {
  const [errored, setErrored] = useState(false);
  const envId = (import.meta.env.VITE_DISCORD_ID as string) || "";
  const idToUse = envId || DISCORD_USER_ID;
  const src = `https://lanyard.cnrad.dev/api/${idToUse}?showDisplayName=true`;

  if (errored) {
    return (
      <div className="discord-card-fallback">
        <p style={{ margin: 0, fontWeight: 700 }}>
          Discord státusz
        </p>
        <p style={{ margin: "8px 0 0 0" }}>A Discord státusz jelenleg nem elérhető.</p>
        <p style={{ margin: "8px 0 0 0" }}>
          <a href={`https://discord.com/users/${idToUse}`} target="_blank" rel="noreferrer" style={{ color: "#9bd1ff" }}>Profil megnyitása</a>
        </p>
      </div>
    );
  }

  return (
    <a
      className="discord-card-link"
      href={`https://discord.com/users/${idToUse}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Open Discord profile"
    >
      <img
        className="discord-card-image"
        src={src}
        alt="Discord Status"
        onError={() => setErrored(true)}
      />
    </a>
  );
};
import {Route, Routes } from "react-router-dom";
import {
  FaDiscord,
  FaInstagram,
  FaTwitch,
} from "react-icons/fa";
import { SiNodedotjs, SiJavascript, SiCss, SiMysql } from 'react-icons/si';
import Html5Logo from './assets/html5.svg';
import { HiMiniUserCircle } from "react-icons/hi2";
import LetterGlitch from "./components/LetterGlitch";

type LanyardActivity = {
  type: number;
  name: string;
  details?: string;
  state?: string;
};

type LanyardSpotify = {
  song: string;
  artist: string;
};

type LanyardData = {
  discord_user: {
    username: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: LanyardActivity[];
  listening_to_spotify: boolean;
  spotify?: LanyardSpotify;
};

type LanyardResponse = {
  success: boolean;
  data?: LanyardData;
  error?: {
    code?: string;
    message?: string;
  };
};

type GithubRepo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
  pushed_at: string;
};

const SocialItem = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: JSX.Element;
}) => {
  return (
    <a
      className="social-icon-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      <span>{icon}</span>
    </a>
  );
};

const ProjectsPage = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "web" | "other">("all");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (response.ok) {
          const data = await response.json();
          // Filter out forks if needed, or just take the data
          setRepos(data.filter((repo: any) => !repo.fork));
        }
      } catch (error) {
        console.error("Hiba a GitHub lekérdezés során:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filteredRepos = repos.filter((repo) => {
    if (activeFilter === "all") return true;
    
    // Egyszerű logika ami megpróbálja eldönteni hogy webes-e a projekt
    const lang = repo.language?.toLowerCase() || "";
    const isWeb = ["typescript", "javascript", "html", "css", "vue"].includes(lang) ||
                  repo.topics?.some(t => ["react", "vue", "web", "html", "css", "nextjs"].includes(t));

    if (activeFilter === "web") return isWeb;
    if (activeFilter === "other") return !isWeb;
    return true;
  });

  return (
    <section className="projects-shell">
      <header className="projects-header-large">
        <h1 className="projects-title-large">Projektek.</h1>
        <p className="projects-subtitle-large">Amiket építettem vagy éppen építek.</p>
        
        <div className="projects-filters">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            Összes
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'web' ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveFilter('web')}
          >
            Web
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'other' ? 'filter-btn-active' : ''}`}
            onClick={() => setActiveFilter('other')}
          >
            Egyéb
          </button>
        </div>
      </header>

      {loading ? (
        <p className="text-center text-zinc-500">Projektek betöltése a GitHubról...</p>
      ) : (
        <div className="projects-grid-modern">
          {filteredRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="project-card-modern"
            >
              <div className="project-card-header">
                <h3>{repo.name.replace(/-/g, ' ')}</h3>
                {repo.language && (
                  <span className="project-badge modern-badge">{repo.language}</span>
                )}
              </div>
              
              <p className="project-desc-modern">
                {repo.description || "Nincs megadva leírás a projekthez."}
              </p>

              <div className="project-tags-modern">
                {repo.topics && repo.topics.length > 0 ? (
                  repo.topics.map((topic) => (
                    <span key={topic}>{topic}</span>
                  ))
                ) : (
                  <span>GitHub</span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

// (PillNav is rendered inside the App component below)

const HomePage = () => {
  return (
    <main className="home-hub">
      <header className="home-head">
        <h1 className="home-title">Szűcs Noel Gergő</h1>
        <p className="home-subtitle">informatika • röplabda • fejlesztés</p>
        <div className="social-icon-row">
          <SocialItem href="https://www.twitch.tv/szucs_n" label="Twitch" icon={<FaTwitch />} />
          <SocialItem href="https://www.instagram.com/noel.szucs.940" label="Instagram" icon={<FaInstagram />} />
          <SocialItem href="https://discord.com" label="Discord" icon={<FaDiscord />} />
        </div>
      </header>

      <section className="home-panels">
        <article className="discord-compact">
          <DiscordCard />
        </article>

        <article className="compact-card about-compact">
          <div className="about-compact-content">
              <h2>
                <HiMiniUserCircle className="inline-icon" /> Röviden rólam
              </h2>
              <p>
                Informatikát tanulok, a gyakorlatban főleg <strong>webes</strong> és <strong>adatbázis </strong>
                feladatokon dolgozom. A sportból hozott fegyelem és fókusz a fejlesztői munkában is
                végigkísér.
              </p>
          </div>
        </article>
      </section>
    </main>
  );
};

const AboutPage = () => {
  return (
    <>
      <section className="about-card">
        <h2>Bemutatkozás</h2>
        <p>
          Szűcs Noel Gergő vagyok, jelenleg az informatikai tanulmányaimra és gyakorlati projektekre
          fókuszálok. Fontos számomra a precíz problémamegoldás, a folyamatos fejlődés és a csapatmunka.
        </p>
      </section>

      <section className="about-card">
        <h2>Szakmai Tapasztalat &amp; Képzés</h2>
        <div className="stack-list">
          <article>
            <h3>Miskolci SZC Kandó Kálmán Informatikai Technikum</h3>
            <p>Szakirány: Informatikai rendszer- és alkalmazás-üzemeltető technikus.</p>

            <p>Fókuszterületek: Hálózatmenedzsment, adatbázis-kezelés, szoftverfejlesztés alapjai.</p>
          </article>
          <article>
            <h3>Vadász Dénes Országos Informatika Verseny — 2. helyezés</h3>
            <p>Komplex adatbázis-kezelési és statisztikai feladatok megoldása csapatban.</p>
          </article>
        </div>
      </section>

      <section className="about-card">
        <h2>Készségek (Tech Stack)</h2>
        <div className="skills-grid" role="table" aria-label="Tech stack">
          <div className="skills-row skills-head" role="row">
            <span role="columnheader">Terület</span>
            <span role="columnheader">Technológiák</span>
          </div>
          <div className="skills-row" role="row">
            <span role="cell">Programozás</span>
            <span role="cell">Python, Java (alapok)</span>
          </div>
          <div className="skills-row" role="row">
            <span role="cell">Web</span>
            <span role="cell">HTML5, CSS3, JavaScript</span>
          </div>
          <div className="skills-row" role="row">
            <span role="cell">Adatbázis</span>
            <span role="cell">SQL, MySQL, statisztikai elemzés</span>
          </div>
          <div className="skills-row" role="row">
            <span role="cell">Hálózat</span>
            <span role="cell">Cisco Packet Tracer, rendszerüzemeltetés</span>
          </div>
        </div>

        <div className="tech-icons" aria-hidden="false">
          <div className="icons-row">
            <SiNodedotjs className="tech-icon" title="Node.js" />
            <SiJavascript className="tech-icon" title="JavaScript" />
            <img src={Html5Logo} alt="HTML5" className="tech-icon html5-logo" title="HTML5" />
            <SiCss className="tech-icon" title="CSS3" />
            <SiMysql className="tech-icon" title="MySQL" />
          </div>

        </div>
      </section>

      <section className="about-card">
        <h2>Soft Skills</h2>
        <ul className="soft-list">
          <li>
            <strong>Csapatjátékos:</strong> A röplabda tapasztalat fegyelmet és közös célorientált
            gondolkodást adott.
          </li>
          <li>
            <strong>Problémamegoldás:</strong> Logikai kihívások megoldása kódban és hálózati feladatokban.
          </li>
          <li>
            <strong>Kitartás:</strong> Versenyszintű sportmúltból érkező stabil terhelhetőség és fókusz.
          </li>
        </ul>
      </section>
    </>
  );
};



// Nav items (original Hungarian routes)
const ContactPage = () => {
  return (
    <section className="projects-shell">
      <header className="projects-header-large">
        <h1 className="projects-title-large">Kapcsolat.</h1>
        <p className="projects-subtitle-large">Itt tudsz elérni.</p>
      </header>
      
      <section className="about-card" style={{ marginTop: '2rem' }}>
        <h2>Elérhetőségek</h2>
        <p>
          Ha szeretnél velem kapcsolatba lépni, egy közös projektről egyeztetni, vagy csak egy kérdésed van, nyugodtan keress az alábbi platformok bármelyikén:
        </p>

        <ul className="soft-list" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li>
            <strong>E-mail:</strong> <a href="mailto:mail@szucs.hu" style={{ color: "#9bd1ff", textDecoration: "none" }}>mail@szucs.hu</a>
          </li>
          <li>
            <strong>Discord:</strong> <a href={`https://discord.com/users/${DISCORD_USER_ID}`} target="_blank" rel="noreferrer" style={{ color: "#9bd1ff", textDecoration: "none" }}>Profil megnyitása</a>
          </li>
          <li>
            <strong>GitHub:</strong> <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" style={{ color: "#9bd1ff", textDecoration: "none" }}>github.com/{GITHUB_USERNAME}</a>
          </li>
          <li>
            <strong>Instagram:</strong> <a href="https://www.instagram.com/noel.szucs.940" target="_blank" rel="noreferrer" style={{ color: "#9bd1ff", textDecoration: "none" }}>@noel.szucs.940</a>
          </li>
        </ul>
      </section>
    </section>
  );
};

const NAV_ITEMS = [
  { label: 'Főoldal', href: '/' },
  { label: 'Rólam', href: '/rolam' },
  { label: 'Projektek', href: '/projektek' },
  { label: 'Kapcsolat', href: '/kapcsolat' }
];


const App = () => {
  return (
    <div className="app-shell">
      <LetterGlitch
        className="background-glitch"
        textColor="rgba(255,255,255,0.03)"
        glowColor="transparent"
        backgroundColor="#09090b"
      />

      <div className="content-layer">
        <div className="page">
          <PillNav items={NAV_ITEMS} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rolam" element={<AboutPage />} />
            <Route path="/projektek" element={<ProjectsPage />} />
            <Route path="/kapcsolat" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;