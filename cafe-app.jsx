/* N's Cafe — single-page site
   Aesthetic: warm cream + espresso + terracotta accent.
   Type: Instrument Serif (display), Geist (body), JetBrains Mono (numerics). */

const { useState, useEffect, useRef, useMemo } = React;

const PALETTES = {
  warm:   { bg: "#f3ece0", paper: "#ebe2d2", ink: "#211712", accent: "#b9532e", muted: "#7a6a5b" },
  forest: { bg: "#eee9dc", paper: "#e3dccb", ink: "#1c2620", accent: "#3f6f4f", muted: "#6f7466" },
  noir:   { bg: "#161311", paper: "#1f1b18", ink: "#f1e9da", accent: "#d39257", muted: "#8a7e6f" },
  pastel: { bg: "#f4eef3", paper: "#ebe3ea", ink: "#2a1e2a", accent: "#a85a78", muted: "#7a6a76" },
};

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "warm",
  "layout": "twoCol",
  "showOrder": true,
  "showDecor": true
}/*EDITMODE-END*/;

function applyPalette(name) {
  const p = PALETTES[name] || PALETTES.warm;
  const r = document.documentElement;
  r.style.setProperty("--bg", p.bg);
  r.style.setProperty("--paper", p.paper);
  r.style.setProperty("--ink", p.ink);
  r.style.setProperty("--accent", p.accent);
  r.style.setProperty("--muted", p.muted);
}

/* ---------------- Decorative bits (small SVGs only) ---------------- */
function CupMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="20" cy="20" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <line x1="6" y1="20" x2="11" y2="20" stroke="currentColor" strokeWidth="1.4" />
      <line x1="29" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Steam() {
  return (
    <svg viewBox="0 0 80 60" className="steam" aria-hidden="true">
      <path d="M14 56 C 14 36, 26 36, 26 18 C 26 6, 18 6, 18 2" />
      <path d="M40 56 C 40 36, 52 36, 52 18 C 52 6, 44 6, 44 2" />
      <path d="M66 56 C 66 36, 78 36, 78 18 C 78 6, 70 6, 70 2" />
    </svg>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ now, showDecor }) {
  return (
    <header className="hero">
      <div className="hero-top">
        <div className="brand">
          <CupMark />
          <span className="brand-name">N's Cafe</span>
        </div>
        <nav className="topnav">
          <a href="#menu">Menu</a>
          <a href="#visit">Visit</a>
          <a href="#about">About</a>
          <a className="topnav-cta" href="#order">Order ahead →</a>
        </nav>
      </div>

      <div className="hero-body">
        <div className="hero-eyebrow">
          <span className="dot" /> Open now · {now}
        </div>
        <h1 className="hero-title">
          A small, <em>serious</em><br />
          coffee bar on <span className="underline-accent">Pine Street</span>.
        </h1>
        <p className="hero-sub">
          Single-origin filter, milk drinks pulled on a Linea Mini, and
          pastries from the oven at sunrise. Seven stools, a long bench,
          and a record player no one's allowed to touch.
        </p>
        <div className="hero-meta">
          <div>
            <div className="meta-label">Today</div>
            <div className="meta-val">Ethiopia · Bensa · Natural</div>
          </div>
          <div>
            <div className="meta-label">Roaster</div>
            <div className="meta-val">Onyx Coffee Lab</div>
          </div>
          <div>
            <div className="meta-label">Pastry</div>
            <div className="meta-val">Until sold out</div>
          </div>
        </div>
      </div>

      {showDecor && (
        <div className="hero-decor" aria-hidden="true">
          <Steam />
          <div className="hero-cup">
            <div className="hero-cup-inner" />
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Menu ---------------- */
function MenuItem({ item, onAdd, inOrder }) {
  return (
    <li className={"menu-item" + (inOrder ? " in-order" : "")}>
      <button
        className="add-btn"
        onClick={() => onAdd(item)}
        aria-label={`Add ${item.name} to order`}
      >
        {inOrder ? "+" : "+"}
      </button>
      <div className="item-main">
        <div className="item-row">
          <span className="item-name">{item.name}</span>
          <span className="item-dots" aria-hidden="true" />
          <span className="item-price">{item.price.toFixed(2)}</span>
        </div>
        <div className="item-desc">
          {item.desc}
          {item.tag && <span className={`tag tag-${item.tag.replace(/\s/g, "-")}`}>{item.tag}</span>}
        </div>
      </div>
    </li>
  );
}

function MenuSection({ section, onAdd, order, layout, idx }) {
  return (
    <section className={`menu-section layout-${layout}`} id={`sec-${section.category.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="menu-section-head">
        <div className="section-index">{String(idx + 1).padStart(2, "0")}</div>
        <h3 className="section-title">{section.category}</h3>
        <p className="section-blurb">{section.blurb}</p>
      </div>
      <ul className="menu-list">
        {section.items.map((item) => (
          <MenuItem
            key={item.name}
            item={item}
            onAdd={onAdd}
            inOrder={!!order[item.name]}
          />
        ))}
      </ul>
    </section>
  );
}

function MenuBlock({ onAdd, order, layout }) {
  const [active, setActive] = useState("All");
  const cats = ["All", ...window.MENU.map((s) => s.category)];
  const visible = active === "All" ? window.MENU : window.MENU.filter((s) => s.category === active);

  return (
    <section className="menu-block" id="menu">
      <div className="menu-block-head">
        <div className="kicker">— The Menu</div>
        <h2 className="block-title">What's on today.</h2>
        <p className="block-sub">
          Prices in USD. Oat, almond, and whole milk at no charge.
          Decaf available on every drink — just ask.
        </p>
        <div className="cat-bar">
          {cats.map((c) => (
            <button
              key={c}
              className={"cat-pill" + (active === c ? " active" : "")}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-sections">
        {visible.map((s, i) => (
          <MenuSection
            key={s.category}
            section={s}
            onAdd={onAdd}
            order={order}
            layout={layout}
            idx={window.MENU.indexOf(s)}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Visit / Hours ---------------- */
const HOURS = [
  ["Mon", "7:00", "16:00"],
  ["Tue", "7:00", "16:00"],
  ["Wed", "7:00", "16:00"],
  ["Thu", "7:00", "18:00"],
  ["Fri", "7:00", "18:00"],
  ["Sat", "8:00", "18:00"],
  ["Sun", "8:00", "14:00"],
];

function Visit() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon = 0
  return (
    <section className="visit" id="visit">
      <div className="visit-grid">
        <div className="visit-left">
          <div className="kicker">— Visit</div>
          <h2 className="block-title">
            412 Pine Street,<br />
            corner of Pine &amp; 4th.
          </h2>
          <p className="visit-blurb">
            Walk-ins only. The bench seats six. There's a power outlet by the window,
            but we politely ask you to close the laptop after 11 a.m. on Saturdays —
            it gets busy and we'd like everyone to have a stool.
          </p>
          <div className="visit-actions">
            <a className="btn btn-primary" href="#">Get directions</a>
            <a className="btn btn-ghost" href="#">Call (415) 555-0142</a>
          </div>
        </div>
        <div className="visit-right">
          <div className="hours-card">
            <div className="hours-head">
              <span>Hours</span>
              <span className="hours-tz">PST</span>
            </div>
            <ul className="hours-list">
              {HOURS.map(([d, open, close], i) => (
                <li key={d} className={i === todayIdx ? "today" : ""}>
                  <span className="day">{d}</span>
                  <span className="dots" />
                  <span className="time">{open} — {close}</span>
                </li>
              ))}
            </ul>
            <div className="hours-foot">
              Closed Thanksgiving, Christmas, and<br />
              the third Monday of August (staff offsite).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Order tray ---------------- */
function OrderTray({ order, setOrder }) {
  const items = Object.values(order);
  const total = items.reduce((a, i) => a + i.price * i.qty, 0);
  const count = items.reduce((a, i) => a + i.qty, 0);
  const [open, setOpen] = useState(false);

  if (!items.length) {
    return (
      <div className="tray collapsed">
        <div className="tray-empty">
          <span className="tray-cup">◠</span>
          <span>Tap + on any item to start an order.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={"tray" + (open ? " open" : "")}>
      <button className="tray-handle" onClick={() => setOpen(!open)}>
        <span className="tray-count">{count}</span>
        <span className="tray-label">Your order</span>
        <span className="tray-total">${total.toFixed(2)}</span>
        <span className="tray-chev">{open ? "▾" : "▴"}</span>
      </button>
      {open && (
        <div className="tray-body">
          <ul className="tray-list">
            {items.map((it) => (
              <li key={it.name}>
                <button
                  className="qty"
                  onClick={() => {
                    setOrder((o) => {
                      const n = { ...o };
                      if (n[it.name].qty <= 1) delete n[it.name];
                      else n[it.name] = { ...n[it.name], qty: n[it.name].qty - 1 };
                      return n;
                    });
                  }}
                >−</button>
                <span className="qty-num">{it.qty}</span>
                <button
                  className="qty"
                  onClick={() => {
                    setOrder((o) => ({ ...o, [it.name]: { ...o[it.name], qty: o[it.name].qty + 1 } }));
                  }}
                >+</button>
                <span className="tray-name">{it.name}</span>
                <span className="tray-price">${(it.price * it.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="tray-footer">
            <div className="tray-sub">
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary tray-checkout">
              Pick up in 8 min →
            </button>
            <button className="link" onClick={() => setOrder({})}>Clear order</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- About / Footer ---------------- */
function About() {
  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div>
          <div className="kicker">— About</div>
          <h2 className="block-title">Two people, one machine, no rush.</h2>
        </div>
        <div className="about-body">
          <p>
            N's Cafe opened in 2021 above the dry cleaner that used to be here.
            Nadia pulls shots. Mira bakes. There's no Wi-Fi password on the wall
            because there isn't any Wi-Fi.
          </p>
          <p>
            We buy beans from roasters whose hands we've shaken. We bake with
            cultured butter and weigh every shot. If the line is long, talk to
            your neighbor — it's part of the deal.
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="foot-grid">
        <div className="foot-brand">
          <CupMark />
          <span>N's Cafe</span>
        </div>
        <div className="foot-col">
          <div className="foot-label">Find us</div>
          <div>412 Pine Street</div>
          <div>San Francisco, CA 94108</div>
        </div>
        <div className="foot-col">
          <div className="foot-label">Say hi</div>
          <div>hello@nscafe.coffee</div>
          <div>(415) 555-0142</div>
        </div>
        <div className="foot-col">
          <div className="foot-label">Elsewhere</div>
          <div>Instagram</div>
          <div>Are.na</div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 N's Cafe LLC</span>
        <span>Roasted in Bentonville. Brewed on Pine.</span>
      </div>
    </footer>
  );
}

/* ---------------- Tweaks ---------------- */
function CafeTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Palette">
        <TweakRadio
          value={t.palette}
          onChange={(v) => setTweak("palette", v)}
          options={[
            { value: "warm",   label: "Warm" },
            { value: "forest", label: "Forest" },
            { value: "noir",   label: "Noir" },
            { value: "pastel", label: "Pastel" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Menu layout">
        <TweakRadio
          value={t.layout}
          onChange={(v) => setTweak("layout", v)}
          options={[
            { value: "oneCol", label: "Single column" },
            { value: "twoCol", label: "Two columns" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Surfaces">
        <TweakToggle
          label="Show order tray"
          value={t.showOrder}
          onChange={(v) => setTweak("showOrder", v)}
        />
        <TweakToggle
          label="Decorative cup in hero"
          value={t.showDecor}
          onChange={(v) => setTweak("showDecor", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ---------------- App ---------------- */
function App() {
  const [t, setTweak] = useTweaks(DEFAULTS);
  const [order, setOrder] = useState({});
  const [now, setNow] = useState("");

  useEffect(() => {
    applyPalette(t.palette);
  }, [t.palette]);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours();
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ampm = hh >= 12 ? "pm" : "am";
      const h12 = ((hh + 11) % 12) + 1;
      setNow(`until 4 ${ampm === "pm" ? "pm" : "pm"} · ${h12}:${mm}${ampm}`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  function addToOrder(item) {
    setOrder((o) => {
      const existing = o[item.name];
      return {
        ...o,
        [item.name]: existing
          ? { ...existing, qty: existing.qty + 1 }
          : { ...item, qty: 1 },
      };
    });
  }

  return (
    <div className="page">
      <Hero now={now} showDecor={t.showDecor} />
      <MenuBlock onAdd={addToOrder} order={order} layout={t.layout} />
      <Visit />
      <About />
      <Footer />
      {t.showOrder && <OrderTray order={order} setOrder={setOrder} />}
      <CafeTweaks t={t} setTweak={setTweak} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
