import { useState } from 'react';
import {
  Apple,
  ArrowRight,
  ArrowUpRight,
  Check,
  Leaf,
  MapPin,
  Menu,
  Search,
  Send,
  ShoppingBasket,
  Soup,
  Sparkles,
  SprayCan,
  Star,
  X,
} from 'lucide-react';
import './index.css';

const stores = [
  { name: 'Koregaon Park', city: 'Pune', image: '/images/store_rajarhat.png' },
  { name: 'Indiranagar', city: 'Bengaluru', image: '/images/store_sholinganallur.png' },
  { name: 'Salt Lake', city: 'Kolkata', image: '/images/store_saltlake.png' },
];

const collections = [
  { title: 'Pantry staples', detail: 'Everyday essentials', icon: ShoppingBasket, tone: 'sun' },
  { title: 'Fresh picks', detail: 'Fruit & vegetables', icon: Apple, tone: 'leaf' },
  { title: 'Kitchen ready', detail: 'Quick meal ideas', icon: Soup, tone: 'coral' },
  { title: 'Home care', detail: 'Clean living', icon: SprayCan, tone: 'ink' },
];

const testimonials = [
  {
    name: 'Aditi Mehta',
    place: 'Pune',
    text: 'The fresh produce is consistently excellent and finding what I need feels effortless.',
  },
  {
    name: 'Rohan Kapoor',
    place: 'Bengaluru',
    text: 'more makes the weekly grocery run feel simple, thoughtful, and genuinely convenient.',
  },
  {
    name: 'Maya Thomas',
    place: 'Kolkata',
    text: 'Good value, friendly stores, and a much nicer way to discover everyday essentials.',
  },
];

function Wordmark({ dark = false }) {
  return (
    <a className={dark ? 'wordmark wordmark--dark' : 'wordmark'} href="#top" aria-label="more home">
      <span className="wordmark__mark"><Leaf size={16} strokeWidth={2.5} /></span>
      <span>more</span>
    </a>
  );
}

function StoreSearch({ onFind }) {
  const [query, setQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onFind(query.trim());
  }

  return (
    <form className="store-search" onSubmit={handleSubmit}>
      <Search size={20} aria-hidden="true" />
      <label className="sr-only" htmlFor="store-search-input">Find a store by area, city or PIN code</label>
      <input
        id="store-search-input"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by area, city or PIN code"
      />
      <button type="submit">Find a store <ArrowRight size={17} aria-hidden="true" /></button>
    </form>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [searchMessage, setSearchMessage] = useState('');

  function findStore(query) {
    const normalisedQuery = query.toLowerCase();
    const match = stores.find((store) =>
      [store.name, store.city].join(' ').toLowerCase().includes(normalisedQuery),
    );

    setSelectedStore(match || stores[0]);
    setSearchMessage(
      match
        ? 'Showing the more store in ' + match.name + ', ' + match.city + '.'
        : 'Showing our nearest featured store in ' + stores[0].name + ', ' + stores[0].city + '.',
    );
    document.querySelector('#stores')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div id="top" className="site-shell">
      <header className="site-header">
        <div className="page-width header-inner">
          <Wordmark />
          <nav className={mobileMenuOpen ? 'nav-links nav-links--open' : 'nav-links'} aria-label="Primary navigation">
            <a href="#fresh" onClick={closeMenu}>Fresh picks</a>
            <a href="#collections" onClick={closeMenu}>Collections</a>
            <a href="#membership" onClick={closeMenu}>more+</a>
            <a href="#stories" onClick={closeMenu}>Our story</a>
          </nav>
          <div className="header-actions">
            <a className="header-store-link" href="#stores"><MapPin size={17} aria-hidden="true" /> Stores</a>
            <a className="header-cta" href="#membership">Join more+ <ArrowUpRight size={16} aria-hidden="true" /></a>
            <button
              type="button"
              className="menu-button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-image" role="img" aria-label="Fresh grocery produce" />
          <div className="hero-shade" />
          <div className="page-width hero-content">
            <p className="eyebrow eyebrow--light"><Sparkles size={15} aria-hidden="true" /> Freshness, around the corner</p>
            <h1 id="hero-title">your everyday<br /><em>supermarket</em></h1>
            <p className="hero-copy">From carefully picked produce to your trusted essentials, there is always more to bring home with more.</p>
            <StoreSearch onFind={findStore} />
            <p className="hero-note"><MapPin size={15} aria-hidden="true" /> Serving neighbourhoods across India</p>
          </div>
          <a className="hero-card hero-card--club" href="#membership">
            <span>Meet</span>
            <strong>more+</strong>
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
          <a className="hero-card hero-card--fresh" href="#fresh">
            <span>Picked today</span>
            <strong>Fresh &amp; local</strong>
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </section>

        <section id="stores" className="stores-section section-pad" aria-labelledby="stores-title">
          <div className="page-width">
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow"><MapPin size={15} aria-hidden="true" /> Your neighbourhood, your store</p>
                <h2 id="stores-title">good food is<br /><em>closer than you think.</em></h2>
              </div>
              <p>Choose a nearby more store for a more personal way to shop. Fresh shelves, familiar faces, all your essentials.</p>
            </div>
            <p className="search-status" aria-live="polite">{searchMessage}</p>
            <div className="store-grid">
              {stores.map((store) => (
                <button
                  type="button"
                  className={selectedStore.name === store.name ? 'store-card store-card--selected' : 'store-card'}
                  key={store.name}
                  onClick={() => {
                    setSelectedStore(store);
                    setSearchMessage('Showing the more store in ' + store.name + ', ' + store.city + '.');
                  }}
                  aria-pressed={selectedStore.name === store.name}
                >
                  <img src={store.image} alt="" />
                  <span className="store-card__veil" />
                  <span className="store-card__content">
                    <span className="store-card__location"><MapPin size={16} fill="currentColor" aria-hidden="true" /> {store.city}</span>
                    <strong>{store.name}</strong>
                    <span className="store-card__link">Explore this store <ArrowRight size={16} aria-hidden="true" /></span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="membership" className="membership-section" aria-labelledby="membership-title">
          <div className="page-width membership-layout">
            <div className="membership-copy">
              <p className="eyebrow eyebrow--light"><Sparkles size={15} aria-hidden="true" /> more+</p>
              <h2 id="membership-title">the little <em>extra</em><br />in every basket.</h2>
              <p>Collect more+ points every time you shop. Redeem them whenever you like, and unlock a more rewarding everyday.</p>
              <ul className="benefit-list">
                <li><Check size={17} aria-hidden="true" /> 5% points back on selected baskets</li>
                <li><Check size={17} aria-hidden="true" /> Member-only prices and tastings</li>
                <li><Check size={17} aria-hidden="true" /> Priority access to fresh drops</li>
              </ul>
              <a className="light-button" href="#collections">Explore more+ <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
            <div className="club-visual" aria-label="more+ membership card">
              <div className="club-card">
                <div className="club-card__top"><Wordmark dark /><span>MORE+</span></div>
                <div className="club-card__number">5402&nbsp;&nbsp; 1208&nbsp;&nbsp; 3491</div>
                <div className="club-card__bottom"><span>YOUR EVERYDAY REWARDS</span><strong>gold</strong></div>
              </div>
              <div className="club-orb club-orb--one" />
              <div className="club-orb club-orb--two" />
              <div className="club-sticker"><Leaf size={23} aria-hidden="true" /> Made for<br />your everyday</div>
            </div>
          </div>
        </section>

        <section id="fresh" className="fresh-section" aria-labelledby="fresh-title">
          <div className="fresh-image" role="img" aria-label="A lush field of fresh vegetables" />
          <div className="fresh-overlay" />
          <div className="page-width fresh-content">
            <p className="eyebrow eyebrow--light"><Leaf size={15} aria-hidden="true" /> Grown with care</p>
            <h2 id="fresh-title">enjoy the<br /><em>freshest.</em></h2>
            <p>We pick the best from trusted growers, so every meal starts with produce you can feel good about.</p>
            <a className="light-button" href="#collections">See fresh picks <ArrowRight size={18} aria-hidden="true" /></a>
          </div>
          <img className="produce produce--tomato" src="/images/tomato.png" alt="Fresh tomatoes" />
          <img className="produce produce--pepper" src="/images/pepper.png" alt="Fresh pepper" />
          <img className="produce produce--broccoli" src="/images/broccoli.png" alt="Fresh broccoli" />
        </section>

        <section id="collections" className="collections-section section-pad" aria-labelledby="collections-title">
          <div className="page-width">
            <div className="section-intro section-intro--split">
              <div>
                <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Made for everyday living</p>
                <h2 id="collections-title">things you will<br /><em>love to bring home.</em></h2>
              </div>
              <a className="text-link" href="#stories">Discover the more way <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
            <div className="collection-grid">
              {collections.map(({ title, detail, icon: Icon, tone }) => (
                <a className={['collection-card', 'collection-card--' + tone].join(' ')} href="#stories" key={title}>
                  <span className="collection-card__icon"><Icon size={28} strokeWidth={1.8} aria-hidden="true" /></span>
                  <span className="collection-card__detail">{detail}</span>
                  <strong>{title}</strong>
                  <span className="collection-card__arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="stories" className="stories-section section-pad" aria-labelledby="stories-title">
          <div className="page-width stories-layout">
            <div className="story-image-wrap">
              <img src="/images/customer_banner.png" alt="Friends shopping for fresh food together" />
              <div className="review-total"><Star size={18} fill="currentColor" aria-hidden="true" /><strong>4.8</strong><span>from our community</span></div>
            </div>
            <div className="stories-copy">
              <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> A better kind of everyday</p>
              <h2 id="stories-title">more than a store,<br /><em>part of your routine.</em></h2>
              <p>We believe small everyday choices can make a real difference. more brings quality, warmth, and value to every aisle.</p>
              <a className="dark-button" href="#top">Meet more <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="page-width testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.name}>
                <div className="testimonial-stars" aria-label="Five star review">{Array.from({ length: 5 }, (_, index) => <Star size={15} fill="currentColor" key={index} aria-hidden="true" />)}</div>
                <p>“{testimonial.text}”</p>
                <footer><strong>{testimonial.name}</strong><span>{testimonial.place}</span></footer>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <div className="footer-brand">
            <Wordmark dark />
            <p>Fresh groceries, thoughtful choices, and a little more joy in your everyday.</p>
            <a href="mailto:hello@more.in">hello@more.in <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <div className="footer-links">
            <div><h3>Explore</h3><a href="#fresh">Fresh picks</a><a href="#collections">Collections</a><a href="#membership">more+</a></div>
            <div><h3>About</h3><a href="#stories">Our story</a><a href="#stores">Find a store</a><a href="#top">Contact</a></div>
            <div><h3>Follow along</h3><a href="#top">Instagram</a><a href="#top">Facebook</a><a href="#top">LinkedIn</a></div>
          </div>
        </div>
        <div className="page-width footer-bottom">
          <span>© 2026 more. All rights reserved.</span>
          <span>made for your everyday <Send size={14} aria-hidden="true" /></span>
        </div>
      </footer>
    </div>
  );
}

export default App;

