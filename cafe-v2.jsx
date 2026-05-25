/* N's Cafe — V2: warm, photo-driven cafe site */
const { useState, useEffect } = React;

/* ---------- Icons (small inline SVGs) ---------- */
const Icon = {
  calendar: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  ),
  pin: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  chat: () => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a7 7 0 0 1-7 7H8l-5 3 1.5-5A7 7 0 0 1 4 12a7 7 0 0 1 7-7h3a7 7 0 0 1 7 7z" />
    </svg>
  ),
  cup: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 9h12v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9z" />
      <path d="M17 11h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 3c0 1 1 1.5 1 3M12 3c0 1 1 1.5 1 3" />
    </svg>
  ),
  instagram: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  facebook: () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M13 22v-8h2.7l.4-3.1H13V8.9c0-.9.3-1.5 1.6-1.5h1.7v-2.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.2H7v3.1h2.9V22H13z" />
    </svg>
  ),
  x: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M17.5 3h3l-6.5 7.5L22 21h-6.4l-5-6.4L4.8 21H1.8l7-8L1.5 3H8l4.5 5.8L17.5 3zm-1.1 16h1.7L7.6 5H5.8l10.6 14z" />
    </svg>
  ),
  tiktok: () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M16 3c.3 1.7 1.4 3 3 3.4V9c-1.2 0-2.3-.4-3-1v6.5a5.5 5.5 0 1 1-5.5-5.5v2.6a3 3 0 1 0 3 3V3h2.5z" />
    </svg>
  ),
};

/* ---------- Placeholder image fills ----------
   Each slot has a CSS gradient that makes the page look composed
   before the user drags real photos in. The image-slot will cover them. */
const Placeholder = ({ label, gradient, children }) => (
  <div className="ph" style={{ background: gradient, position: "relative", width: "100%", height: "100%" }}>
    <span className="ph-label">{label}</span>
    {children}
  </div>
);

/* ---------- HERO ---------- */
function Hero({ onOpenMenu }) {
  return (
    <header className="hero">
      <div className="hero-bg">
        <image-slot
          id="hero-bg"
          src="./uploads/nathan-dumlao-zEdCT0qrodE-unsplash.jpg"
          shape="rect"
          placeholder="hero photo — moody cafe interior or pour-over close-up"
          style={{
            background:
              "radial-gradient(circle at 30% 60%, #5a3520 0%, #2d1810 55%, #1a0e08 100%)",
          }}
        ></image-slot>
      </div>

      <nav className="nav">
        <div className="brand">
          <span className="brand-mark"><Icon.cup /></span>
          <span>N's Cafe</span>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#menu" onClick={(e) => { e.preventDefault(); onOpenMenu(); }}>Menu</a>
          <a href="#faq">FAQ</a>
          <a className="book" href="#book">Book a Table</a>
        </div>
      </nav>

      <div className="hero-body">
        <h1 className="hero-title">
          Your neighborhood sanctuary<br />
          for exquisite coffee
        </h1>
        <p className="hero-sub">
          Enjoy expertly crafted beverages, baked goods from the
          morning oven, and a stool by the window.
        </p>
        <div className="hero-actions">
          <button className="btn btn-rust" onClick={onOpenMenu}>Full Menu</button>
          <a className="btn btn-ghost-dark" href="#about">More Info</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- INFO BAR ---------- */
function InfoBar() {
  return (
    <div className="info-bar">
      <div className="info-item">
        <span className="info-icon"><Icon.calendar /></span>
        <div>
          <span className="line"><strong>Mon — Fri</strong>&nbsp;&nbsp;7 AM — 6 PM</span>
          <span className="line"><strong>Sat — Sun</strong>&nbsp;&nbsp;8 AM — 4 PM</span>
        </div>
      </div>
      <div className="info-item">
        <span className="info-icon"><Icon.pin /></span>
        <div>
          <span className="line">MSU</span>
          <span className="line">Seksyen 13, Shah Alam</span>
        </div>
      </div>
      <div className="info-item">
        <span className="info-icon"><Icon.chat /></span>
        <div>
          <span className="line">012-3456789</span>
          <span className="line">nami@nscafe.coffee</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- COLLAGE ---------- */
function CollageSection() {
  const features = [
    "Premium Quality",
    "Community Focused",
    "Cozy Atmosphere",
    "Eco-Friendly Practices",
  ];
  return (
    <section className="collage-section" id="about">
      <div className="collage">
        <div className="collage-ring r1"></div>
        <div className="collage-circle c1">
          <image-slot
            id="collage-1"
            shape="circle"
            placeholder="latte art top-down"
            style={{ background: "radial-gradient(circle at 50% 40%, #c08a5a 0%, #6b3a1f 60%, #2d1810 100%)" }}
          ></image-slot>
        </div>
        <div className="collage-circle c2">
          <image-slot
            id="collage-2"
            shape="circle"
            placeholder="three hands cheers-ing with cups"
            style={{ background: "radial-gradient(circle at 60% 50%, #a0673a 0%, #5a2818 70%, #1a0e08 100%)" }}
          ></image-slot>
        </div>
      </div>

      <div className="collage-copy">
        <h2>
          Enjoy expertly crafted beverages made from the finest coffee beans.
        </h2>
        <p className="lead">
          Find delightful treats, and warm, inviting vibes. Seven stools, a
          long bench, and a record player no one's allowed to touch.
        </p>
        <ul className="features">
          {features.map((f) => (
            <li key={f}>
              <span className="check">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- CREAM STRIP ---------- */
function CreamStrip() {
  return (
    <section className="cream-strip">
      <div>
        <h2>Enjoy the rich and robust flavors of locally roasted coffee.</h2>
        <p>Supporting your taste buds — and the small farms and roasters that make our community what it is.</p>
        <button className="btn btn-rust">Learn More</button>
      </div>
      <div className="cream-strip-img">
        <image-slot
          id="cream-strip"
          shape="circle"
          placeholder="cup of dark coffee on cream surface"
          style={{ background: "radial-gradient(circle at 40% 40%, #b07a4a 0%, #4a2818 75%)" }}
        ></image-slot>
      </div>
    </section>
  );
}

/* ---------- FOOD GRID ---------- */
const FOOD_CATS = [
  { id: "espresso", label: "Espresso-based", price: "from $4.00",
    bg: "linear-gradient(135deg, #c89b6f 0%, #8b5a35 100%)",
    ph: "espresso, latte, macchiato" },
  { id: "brewed",   label: "Brewed Coffee", price: "from $4.00",
    bg: "linear-gradient(135deg, #6b3a1f 0%, #2d1810 100%)",
    ph: "pour-over and drip" },
  { id: "tea",      label: "Tea Selection",  price: "from $4.50",
    bg: "linear-gradient(135deg, #d4b87e 0%, #8a9f6f 100%)",
    ph: "matcha set on bamboo mat" },
  { id: "pastry",   label: "Pastries & Desserts", price: "from $3.75",
    bg: "linear-gradient(135deg, #d4805a 0%, #6b2818 100%)",
    ph: "tarts and croissants" },
];

function Foods({ onOpenMenu }) {
  return (
    <section className="foods">
      <h2>Explore our Foods</h2>
      <p className="sub">From the bar and from the oven — everything we serve, in four bites.</p>
      <div className="food-grid">
        {FOOD_CATS.map((c) => (
          <div className="food-card" key={c.id}>
            <image-slot
              id={`food-${c.id}`}
              shape="rounded"
              radius="8"
              placeholder={c.ph}
              style={{ background: c.bg }}
            ></image-slot>
            <div className="label">{c.label}</div>
            <div className="price-line">{c.price}</div>
          </div>
        ))}
      </div>
      <div className="see-menu-wrap">
        <button className="see-menu" onClick={onOpenMenu}>See Full Menu →</button>
      </div>
    </section>
  );
}

/* ---------- PARALLAX BAND ---------- */
function Parallax() {
  return (
    <section className="parallax">
      <div className="parallax-bg">
        <image-slot
          id="parallax"
          shape="rect"
          placeholder="coffee plant / farm photo"
          style={{ background: "radial-gradient(ellipse at center, #4a6b3a 0%, #1f2818 70%, #0e1408 100%)" }}
        ></image-slot>
      </div>
      <h2>We source our milk and dairy products from nearby family-owned farms.</h2>
      <button className="btn btn-rust">Learn More</button>
    </section>
  );
}

/* ---------- BOOKING ---------- */
function Booking() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", people: "" });
  const [submitted, setSubmitted] = useState(false);

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="booking" id="book">
        <h2>Book Your Table</h2>
        <form className="booking-form">
          <div className="booking-success">
            <span className="ok-dot">✓</span>
            <div>
              <div style={{ fontWeight: 600 }}>You're on the list, {form.name.split(" ")[0]}.</div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
                We'll send a confirmation to {form.email} for {form.date} at {form.time || "your preferred time"} —
                table for {form.people || "1"}.
              </div>
            </div>
          </div>
          <button type="button" className="book-btn ghost" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", date: "", time: "", people: "" }); }}>
            Book another
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="booking" id="book">
      <h2>Book Your Table</h2>
      <p className="sub">Walk-ins always welcome. Reservations open for parties of 4 or more.</p>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="field">
          <input type="text" placeholder="Name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div className="field">
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
        <div className="field">
          <input type="date" placeholder="Date" value={form.date} onChange={(e) => update("date", e.target.value)} required />
        </div>
        <div className="field">
          <input type="time" placeholder="Time" value={form.time} onChange={(e) => update("time", e.target.value)} />
        </div>
        <div className="field full">
          <select value={form.people} onChange={(e) => update("people", e.target.value)}>
            <option value="">People</option>
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5">5 people</option>
            <option value="6+">6+ people</option>
          </select>
        </div>
        <button type="submit" className="book-btn">Find a Table</button>
      </form>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ onOpenMenu }) {
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="brand">
          <span className="brand-mark"><Icon.cup /></span>
          <span style={{ fontSize: 22 }}>N's Cafe</span>
        </div>
        <div className="foot-nav">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#menu" onClick={(e) => { e.preventDefault(); onOpenMenu(); }}>Menu</a>
          <a href="#faq">FAQ</a>
          <a className="book" href="#book" onClick={(e) => { e.preventDefault(); onOpenMenu(); }}>Full Menu</a>
        </div>
      </div>
      <div className="foot-bottom">
        <div className="foot-contact">
          <div className="item">
            <Icon.pin />
            <div>
              <div>412 Pine Street,</div>
              <div>San Francisco, CA 94108</div>
            </div>
          </div>
          <div className="item">
            <Icon.chat />
            <div>
              <div>(415) 555-0142</div>
              <div>hello@nscafe.coffee</div>
            </div>
          </div>
        </div>
        <div className="foot-socials">
          <a href="#" aria-label="Instagram"><Icon.instagram /></a>
          <a href="#" aria-label="Facebook"><Icon.facebook /></a>
          <a href="#" aria-label="X"><Icon.x /></a>
          <a href="#" aria-label="TikTok"><Icon.tiktok /></a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- MENU MODAL ---------- */
function MenuModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="menu-modal" onClick={onClose}>
      <div className="menu-modal-inner" onClick={(e) => e.stopPropagation()}>
        <div className="menu-modal-head">
          <div>
            <h2>The Full Menu</h2>
            <p>Prices in USD. Oat, almond, and whole milk at no charge.</p>
          </div>
          <button className="menu-close" onClick={onClose} aria-label="Close">×</button>
        </div>
        {window.MENU.map((section, idx) => (
          <div className="menu-section" key={section.category}>
            <h3 className="menu-section-title">
              <span className="idx">{String(idx + 1).padStart(2, "0")}</span>
              {section.category}
            </h3>
            <p className="menu-section-blurb">{section.blurb}</p>
            {section.items.map((item) => (
              <div className="menu-item" key={item.name}>
                <span className="name">
                  {item.name}
                  {item.tag && <span className="tag">{item.tag}</span>}
                </span>
                <span className="price">${item.price.toFixed(2)}</span>
                <span className="desc">{item.desc}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- APP ---------- */
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Hero onOpenMenu={() => setMenuOpen(true)} />
      <InfoBar />
      <CollageSection />
      <CreamStrip />
      <Foods onOpenMenu={() => setMenuOpen(true)} />
      <Parallax />
      <Booking />
      <Footer onOpenMenu={() => setMenuOpen(true)} />
      <MenuModal open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
