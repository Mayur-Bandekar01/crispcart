import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, MapPin, ArrowUpRight, LayoutGrid, Star, ArrowRight, ArrowLeft, Play, X, Wallet } from 'lucide-react';
const Instagram = () => <span>📸</span>;
const Facebook = () => <span>📘</span>;
const Linkedin = () => <span>🔗</span>;
const Twitter = () => <span>🐦</span>;
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// --- Sub-Components ---

const LoadingScreen = () => (
  <motion.div 
    exit={{ opacity: 0 }}
    className="loading-v2"
    style={{ background: '#FF4F17', color: 'white' }}
  >
    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="logo-text-styled" 
      style={{ fontSize: '4rem' }}
    >
      <span style={{ color: 'white' }}>Dmore</span>
    </motion.div>
  </motion.div>
);


// --- Refined Minimal Premium Dropdown ---
const DropdownCard = ({ items }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15, x: '-50%' }}
    animate={{ opacity: 1, y: 0, x: '-50%' }}
    exit={{ opacity: 0, y: 10, x: '-50%' }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="dropdown-card"
  >
    <div className="dropdown-grid">
      {items.map((item, index) => (
        <a key={index} href={item.link} className="mini-card">
          <img src={item.img} alt={item.title} />
          <span>{item.title}</span>
        </a>
      ))}
    </div>
  </motion.div>
);

const Navbar = ({ onLoginClick, onLogoClick }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menus = {
    cookbook: [
      { title: "Beyond Metros: Unlocking Bharat", img: "/images/hero.png", link: "#" },
      { title: "A Day at Area 83", img: "/images/customer_banner.png", link: "#" }
    ],
    about: [
      { title: "Our Legacy of Trust", img: "/images/store_rajarhat.png", link: "#" },
      { title: "Our Values & Vision", img: "/images/freshness_bg.png", link: "#" }
    ],
    partner: [
      { title: "Expand with Dmore", img: "/images/customers.png", link: "#" },
      { title: "Store Network Info", img: "/images/store_saltlake.png", link: "#" }
    ]
  };

  return (
    <header className="top-nav" onMouseLeave={() => setActiveMenu(null)}>
      {/* Left: Logo */}
      <div className="logo-section">
        <div className="more-arc-logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
          <span>Dmore</span>
        </div>
      </div>

      {/* Center: Centered Links */}
      <nav className="nav-links-section">
        <div className="nav-item-wrapper" onMouseEnter={() => setActiveMenu('cookbook')}>
          <a href="#" className="nav-link">cookbook</a>
          <AnimatePresence>
            {activeMenu === 'cookbook' && <DropdownCard items={menus.cookbook} />}
          </AnimatePresence>
        </div>

        <div className="nav-item-wrapper" onMouseEnter={() => setActiveMenu('about')}>
          <a href="#" className="nav-link">about</a>
          <AnimatePresence>
            {activeMenu === 'about' && <DropdownCard items={menus.about} />}
          </AnimatePresence>
        </div>

        <div className="nav-item-wrapper" onMouseEnter={() => setActiveMenu('partner')}>
          <a href="#" className="nav-link">partner with us</a>
          <AnimatePresence>
            {activeMenu === 'partner' && <DropdownCard items={menus.partner} />}
          </AnimatePresence>
        </div>
      </nav>

      <div className="actions-section">
        <button className="connect-wallet-btn">
          <Wallet size={20} />
          <span>Connect Wallet</span>
        </button>
        <button className="orders-btn" onClick={onLoginClick}>
          <ShoppingBag size={20} />
          <span>Orders</span>
        </button>
      </div>
    </header>
  );
};



const Hero = ({ onFindStore }) => {
  const stores = [
    { name: 'Salt Lake', img: '/images/store_saltlake.png' },
    { name: 'Rajarhat', img: '/images/store_rajarhat.png' },
    { name: 'Sholinganallur', img: '/images/store_sholinganallur.png' }
  ];
  const [activeStoreIndex, setActiveStoreIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStoreIndex((index) => (index + 1) % stores.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [stores.length]);

  const visibleStores = stores.map((_, index) => stores[(activeStoreIndex + index) % stores.length]);

  return (
    <section className="hero-section">
      <div className="hero-bg">
        <img src="/images/hero_main.png" alt="Fresh Produce" />
      </div>

      <div className="app-float">
        <LayoutGrid size={28} />
        <span>app</span>
        <div className="app-phone-mock">
          <div className="app-phone-bar"></div>
          <div className="app-phone-card purple"></div>
          <div className="app-phone-card orange"></div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hero-content-main"
      >
        <h1 className="hero-title-main">
          <span className="title-your">your decentralized</span>
          <span className="title-supermarket">supermarket</span>
        </h1>
        <p className="hero-subtitle-main">Get more of life with Dmore</p>
        
        <div className="search-bar-glass">
          <Search size={28} color="rgba(255,255,255,0.7)" style={{ marginRight: '20px' }} />
          <input type="text" placeholder='Search for stores like "Domlur", "Bengaluru" or "560095"' />
          <button className="find-store-btn" onClick={onFindStore}>Find A Store</button>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        className="explore-card-float"
      >
        <span>explore</span>
        <span>Dmore+</span>
        <div className="explore-card-arrow">
          <ArrowRight size={20} />
        </div>
      </motion.div>

      <div className="hero-stores-container">
        <div className="hero-stores-wrapper">
          <AnimatePresence mode="popLayout">
          {visibleStores.map((store, i) => (
            <motion.div 
              key={`${store.name}-${activeStoreIndex}`}
              layout
              initial={{ opacity: 0, x: 80, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -80, scale: 0.96 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.04 }}
              className="store-card-hero"
            >
              <img src={store.img} alt={store.name} />
              <div className="store-tag-hero">
                <MapPin size={18} color="white" fill="white" />
                <span>{store.name}</span>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
          
          <button
            className="next-arrow-btn"
            type="button"
            aria-label="Show next store"
            onClick={() => setActiveStoreIndex((index) => (index + 1) % stores.length)}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

const MembershipSection = () => {
  return (
    <section className="membership-v2">
      <div className="membership-text-content">
        <div className="membership-brand">Dmore+</div>
        <h2>the world's <span className="best-italic">best</span> <br/> grocery membership</h2>
        <p className="membership-benefit">
          Earn 5% Dmore+ points cashback^ on every order. <br/>
          Redeem anytime you like. <br/>
          <span>*Dmore diamond</span>
        </p>
        
        <button className="explore-membership-btn">
          <span>Explore Dmore+</span>
          <ArrowRight size={24} strokeWidth={3} />
        </button>
      </div>

      <div className="membership-card-container">
        <motion.div 
          initial={{ opacity: 0, x: 70, y: -20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="membership-card-3d"
        >
          <div className="reference-diamond-card" aria-label="Dmore+ diamond membership card">
            <div className="reference-card-top">
              <span className="reference-card-logo">Dmore+</span>
              <span className="reference-card-name">TOMATO SHARMA</span>
              <span className="reference-card-valid">membership valid thru 31 Feb '26</span>
            </div>
            <div className="reference-card-band">
              <span>diamond</span>
            </div>
          </div>
          <img className="reference-gem" src="/images/gem.png" alt="" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="small-card-overlap"
        >
          <div className="mini-membership-scene">
            <div className="mini-scene-light"></div>
            <div className="mini-scene-pedestal"></div>
            <div className="mini-floating-card">Dmore+</div>
            <div className="mini-arc"></div>
            <div className="mini-play">
              <Play size={30} color="white" fill="white" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BrandsSection = ({ brands = [] }) => {
  const defaultCollections = [
    { brand: "Dmore Selecta", logo: "/images/logos/selecta.png", category: "Premium Staples", class: "bg-selecta" },
    { brand: "Dmore Choice", logo: "/images/logos/choice.png", category: "Value Staples", class: "bg-choice" },
    { brand: "VOW 100%", logo: "/images/logos/vow.png", category: "Cleaning Essentials", class: "bg-vow" },
    { brand: "FEASTERS", logo: "/images/logos/feasters.png", category: "Fun Foods", class: "bg-feasters" },
    { brand: "PRARTHANA", logo: "/images/logos/prarthana.png", category: "Prayer Essentials", class: "bg-prarthana" },
    { brand: "Kitchen's Promise", logo: "/images/logos/kitchen.png", category: "Ready To Eat", class: "bg-kitchen" },
    { brand: "Dmore essentials", logo: "/images/logos/essentials.png", category: "Daily Needs", class: "bg-essentials" },
  ];
  const collections = brands.length ? brands : defaultCollections;

  return (
    <section className="brands-collections-v2">
      <div className="collections-header-v2">
        <h2>crafted with <span className="love-italic">love</span></h2>
        <p>discover our deep commitment to you - experience our in-house collections</p>
      </div>
      
      <div className="collections-pill-grid">
        {collections.map((item, i) => (
          <motion.div 
            key={item.brand || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`brand-pill-card ${item.class}`}
          >
            <div className="brand-logo-container">
              <img src={item.logo} alt={item.brand} />
            </div>
            
            <div className="brand-right-side">
              <div className="category-pill-glass">{item.category || item.sub}</div>
              <div className="arrow-circle-small">
                <ArrowRight size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const FreshestSection = () => {
  const produce = [
    { name: "Potatoes", img: "https://picsum.photos/seed/golden-potatoes/360/360", top: "15%", left: "3.5%", size: "196px", delay: 0, duration: 9.5, float: -26 },
    { name: "Peppers", img: "/images/freshest/peppers.png", top: "35%", left: "17%", size: "118px", delay: 0.4, duration: 8.4, float: 22 },
    { name: "Cauliflower", img: "https://picsum.photos/seed/cauliflower-head/300/300", top: "50%", left: "-1.5%", size: "116px", delay: 0.8, duration: 10.2, float: -20 },
    { name: "Onions", img: "/images/freshest/onions.png", top: "78%", left: "9.5%", size: "198px", delay: 0.2, duration: 9, float: 24 },
    { name: "Oranges", img: "https://picsum.photos/seed/orange-fruit/260/260", top: "88%", left: "24%", size: "116px", delay: 0.65, duration: 8.8, float: -18 },
    { name: "Cucumbers", img: "https://picsum.photos/seed/cucumbers-green/320/320", top: "10%", right: "18%", size: "154px", delay: 0.35, duration: 9.8, float: 26 },
    { name: "Tomatoes", img: "/images/freshest/tomatoes.png", top: "21%", right: "1%", size: "196px", delay: 0.1, duration: 8.7, float: -24 },
    { name: "Eggplant", img: "https://picsum.photos/seed/eggplant-purple/320/320", top: "65%", right: "6.5%", size: "158px", delay: 0.55, duration: 10.4, float: 20 },
    { name: "Carrots", img: "https://picsum.photos/seed/carrots-fresh/280/280", top: "88%", right: "18%", size: "118px", delay: 0.75, duration: 9.2, float: -22 },
    { name: "Broccoli", img: "/images/broccoli.png", top: "94%", right: "2.2%", size: "86px", delay: 0.95, duration: 8.6, float: 16 },
  ];

  return (
    <section className="freshest-section">
      <div className="freshest-container">
        <div className="freshest-bg" />
        <div className="freshest-overlay" />
        
        <div className="freshest-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2>enjoy the <span className="freshest-italic">freshest</span></h2>
            <p>we handpick the freshest from selected organic farms to your plates</p>
          </motion.div>
        </div>

        {produce.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ 
              y: [0, item.float, 0],
              rotate: [0, i % 2 === 0 ? 2.5 : -2.5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.7, delay: item.delay },
              scale: { duration: 0.7, delay: item.delay },
              y: { duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay },
              rotate: { duration: item.duration + 2, repeat: Infinity, ease: "easeInOut", delay: item.delay }
            }}
            className="floating-produce-card"
            style={{ 
              top: item.top, 
              left: item.left, 
              right: item.right,
              '--card-size': item.size
            }}
          >
            <img src={item.img} alt={item.name} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const CustomerSection = ({ testimonials = [] }) => {
  const defaultTestimonials = [
    {
      name: "Karan Sharma",
      avatar: "https://i.pravatar.cc/150?u=karan",
      text: "I've had a great experience shopping at Dmore. The supermarkets are always clean, well-organized, and fully stocked with everything from fresh fruits and vegetables to grocery essentials. Their staff is courteous and helpful, and checkout is usually quick and efficient. Dmore has become my go-to place for all my shopping needs.",
      rating: 5
    },
    {
      name: "Deepali Ghosh",
      avatar: "https://i.pravatar.cc/150?u=deepali",
      text: "As a Dmore+ diamond member, I can say that it is excellent! 5% Dmore+ points cashback on all purchases adds real value. You get so many coupons, free subscriptions, and exclusive deals. To a frequent shopper like me, Dmore with its Dmore+ rewards membership is a great way to save more while getting premium perks.",
      rating: 4
    },
    {
      name: "K Eesvari",
      avatar: "https://i.pravatar.cc/150?u=eesvari",
      text: "The Dmore app is a game-changer. It's easy to use, with a wide range of products and smooth checkout. I really like the slotted delivery option - it lets me choose a time that works for me, and deliveries are always on time. Managing my Dmore+ points is quick and hassle-free. Great experience overall!",
      rating: 5
    }
  ];
  const reviews = testimonials.length ? testimonials : defaultTestimonials;

  return (
    <section className="customer-section">
      <div className="customer-banner">
        <img src="/images/customer_banner.png" alt="Happy Customers" />
        <div className="banner-overlay">
          
          <div className="banner-main-text">
            <h2>50,00,000+ <br/><span className="happy-italic">happy</span> customers</h2>
            <p>join us on this journey built on trust and satisfaction</p>
          </div>

          <div className="google-reviews-badge">
            <div className="star-icon-circle">
              <Star size={24} fill="white" color="white" />
            </div>
            <div className="reviews-info">
              <h4>4+ stars</h4>
              <span>45K Google Reviews</span>
            </div>
          </div>
        </div>
      </div>

      <div className="testimonials-grid">
        {reviews.map((t, i) => (
          <motion.div 
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
            className="testimonial-card"
          >
            <div className="testimonial-avatar">
              <img src={t.avatar} alt={t.name} />
            </div>
            <p className="testimonial-text">{t.text || t.comment}</p>
            <div className="testimonial-footer">
              <span className="customer-name">{t.name}</span>
              <div className="star-rating">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={16} 
                    fill={idx < t.rating ? "#fa4b16" : "transparent"} 
                    color={idx < t.rating ? "#fa4b16" : "#ccc"} 
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};



const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'

  const handleContinue = () => {
    if (phoneNumber.length >= 10) setStep('otp');
  };

  const handleLogin = () => {
    onLoginSuccess();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
      className="modal-overlay" onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }} 
        className="login-card-v2" onClick={e => e.stopPropagation()}
      >
        <div className="login-header-tab">
          <div className="more-arc-logo small"><span>Dmore</span></div>
        </div>
        <button className="login-close-btn" onClick={onClose}><X size={24} /></button>

        <div className="login-hero-section">
          <img src="/images/store_rajarhat.png" alt="Store" className="login-bg-img" />
          <div className="login-hero-overlay">
            <h2 className="login-title">your<br/>super-<br/>market</h2>
            <p className="login-subtitle">Get more of life with Dmore</p>
          </div>
        </div>

        <div className="login-form-area">
          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.div key="phone" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }}>
                <div className="phone-input-card">
                  <label>Phone</label>
                  <div className="phone-input-wrapper">
                    <div className="phone-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fa4b16" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </div>
                    <input type="text" placeholder="98765 43210" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <button className="login-continue-btn" onClick={handleContinue}>Continue</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="otp" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                <div className="otp-input-card">
                  <div className="otp-header-row">
                    <button className="back-btn" onClick={() => setStep('phone')}><ArrowLeft size={24} /></button>
                    <h3>verify</h3>
                  </div>
                  <div className="otp-info-box">
                    <div className="info-icon">!</div>
                    <p>Verify the OTP we sent to +91{phoneNumber}</p>
                  </div>
                  <div className="otp-label-row">
                    <label>OTP</label>
                    <span className="resend-timer">Resend in 45s</span>
                  </div>
                  <div className="otp-inputs-row">
                    {[1,2,3,4].map(i => <input key={i} type="text" maxLength="1" className="otp-box" />)}
                  </div>
                  <button className="login-continue-btn" onClick={handleLogin}>Log In</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="modal-external-footer">
          <a href="#">Terms & Privacy</a>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DashboardView = ({ onLogout }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="dashboard-container">
    <div className="dashboard-header">
      <h1>hey there!</h1>
      <div className="user-icon-circle" onClick={onLogout} style={{ cursor: 'pointer' }} title="Click to logout">
        <div className="user-avatar-mini">
          <div className="avatar-head"></div>
          <div className="avatar-body"></div>
        </div>
      </div>
    </div>

    <div className="profile-completion-card">
      <div className="profile-card-header">
        <span>complete your profile</span>
        <div className="percent-badge">25%</div>
        <ArrowRight size={18} className="chevron-right" />
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: '25%' }}></div></div>
    </div>

    <div className="dashboard-menu-list">
      <div className="dashboard-menu-item">
        <div className="menu-icon-box orange"><ShoppingBag size={20} color="#FF4F17" /></div>
        <div className="menu-text"><h3>Orders</h3><p>Track orders & reorder items</p></div>
      </div>
      <div className="dashboard-menu-item">
        <div className="menu-icon-box purple"><Star size={20} color="#7C3AED" fill="#7C3AED" /></div>
        <div className="menu-text"><h3>Dmore+</h3><p>View points balance and month-wise transactions</p></div>
      </div>
      <div className="dashboard-menu-item">
        <div className="menu-icon-box green"><div className="wallet-icon-mini">₹</div></div>
        <div className="menu-text"><h3>Dmore wallet</h3><p>View Dmore wallet transactions</p></div>
      </div>
    </div>
    
    <div className="dashboard-footer-links">
      <a href="#">Terms & Privacy</a>
    </div>
  </motion.div>
);

// --- Store Locator Component ---
const StoreLocator = () => {
  const [search, setSearch] = useState("");
  const stores = [
    { name: "Dmore Hypermart - Salt Lake", address: "Block GD, Sector III, Salt Lake City, Kolkata", phone: "+91 33 2335 1234" },
    { name: "Dmore Supermarket - Rajarhat", address: "Main Road, Chinar Park, Rajarhat, Kolkata", phone: "+91 33 4001 5678" },
    { name: "Dmore Hypermart - Garia", address: "NSC Bose Road, Garia, Kolkata", phone: "+91 33 2435 9012" },
    { name: "Dmore Supermarket - Jadavpur", address: "Raja SC Mullick Road, Jadavpur, Kolkata", phone: "+91 33 2414 3456" },
    { name: "Dmore Hypermart - Sarjapur", address: "Sarjapur Main Road, Bangalore", phone: "+91 80 4000 1122" },
    { name: "Dmore Supermarket - Koramangala", address: "80 Feet Road, Bangalore", phone: "+91 80 4000 3344" }
  ];

  const filteredStores = stores.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.address.toLowerCase().includes(search.toLowerCase()));

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="locator-container"
    >
      <div className="locator-left-panel">
        <div className="locator-search-header">
          <input 
            type="text" 
            className="locator-search-input" 
            placeholder="Search city, area or pincode..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="store-list">
          {filteredStores.map((store, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i} 
              className="store-card-list"
            >
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <MapPin size={16} color="#fa4b16" />
                <span style={{ fontWeight: 'bold', color: '#fa4b16', fontSize: '0.9rem' }}>{store.phone}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="locator-right-panel">
        <div className="locator-map-placeholder">
          <div className="map-overlay"></div>
          <div className="india-map-graphic">
             <motion.div
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
             >
               <MapPin size={120} strokeWidth={1.5} color="#fa4b16" fill="rgba(250, 75, 22, 0.1)" />
             </motion.div>
             <div style={{ position: 'absolute', bottom: '40px', textAlign: 'center' }}>
               <h2 style={{ color: '#1A1A1A', fontFamily: 'Fraunces', fontSize: '2rem' }}>Store Locator Map</h2>
               <p style={{ color: '#666', marginTop: '8px' }}>Select a store to view its location</p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = ({ onLoginClick }) => {
  return (
    <footer className="main-footer">
      <div className="footer-bg-blur"></div>
      <div className="container footer-content">
        <div className="footer-grid">
          {/* Logo & Contact */}
          <div className="footer-col brand-col">
            <div className="footer-logo">Dmore</div>
            <a href="mailto:hello@dmore.in" className="footer-email">hello@dmore.in</a>
            <div className="footer-socials">
              <div className="social-icon"><Instagram size={18} /></div>
              <div className="social-icon"><Facebook size={18} /></div>
              <div className="social-icon"><Linkedin size={18} /></div>
              <div className="social-icon"><Twitter size={18} /></div>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="footer-col">
            <a href="#" className="footer-link bold" onClick={(e) => { e.preventDefault(); onLoginClick(); }}>Orders ↗</a>
            <a href="#" className="footer-link">Find A Store</a>
            <a href="#" className="footer-link">Investors</a>
          </div>

          {/* App Buttons */}
          <div className="footer-col app-buttons-col">
            <div className="app-store-btn">
              <div className="play-icon">▶</div>
              <div className="btn-text">
                <span>GET IT ON</span>
                <span>Google Play</span>
              </div>
            </div>
            <div className="app-store-btn">
              <div className="apple-icon"></div>
              <div className="btn-text">
                <span>Download on the</span>
                <span>App Store</span>
              </div>
            </div>
          </div>

          {/* Links Col 2 */}
          <div className="footer-col">
            <a href="#" className="footer-link">History</a>
            <a href="#" className="footer-link">Leadership</a>
            <a href="#" className="footer-link">Values</a>
          </div>

          {/* Links Col 3 */}
          <div className="footer-col">
            <a href="#" className="footer-link">Careers</a>
            <a href="#" className="footer-link">FAQs</a>
          </div>

          {/* Links Col 4 */}
          <div className="footer-col">
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Policies</a>
            <a href="#" className="footer-link">Privacy</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Dmore protocol limited © 2025</p>
          <div className="footer-tagline">your supermarket</div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'locator'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [data, setData] = useState({ brands: [], testimonials: [] });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/landing-data`);
        if (res.ok) setData(await res.json());
      } catch (e) { console.warn("Using fallbacks"); }
    };
    fetchData();
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (page) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <div className="app-main-content">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {!isLoggedIn && (
              <Navbar 
                onLoginClick={() => setShowLogin(true)} 
                onLogoClick={() => handleNavigate('home')} 
              />
            )}

            <AnimatePresence mode="wait">
              {isLoggedIn ? (
                <DashboardView onLogout={() => setIsLoggedIn(false)} />
              ) : currentPage === 'home' ? (
                <motion.div 
                  key="home-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Hero onFindStore={() => handleNavigate('locator')} />
                  <MembershipSection />
                  <FreshestSection />
                  <BrandsSection brands={data.brands} />
                  <CustomerSection testimonials={data.testimonials} />
                  <Footer onLoginClick={() => setShowLogin(true)} />
                </motion.div>
              ) : (
                <StoreLocator key="locator-view" />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showLogin && (
                <LoginModal 
                  onClose={() => setShowLogin(false)} 
                  onLoginSuccess={() => {
                    setShowLogin(false);
                    setIsLoggedIn(true);
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
