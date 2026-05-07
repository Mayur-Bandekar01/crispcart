// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const findStoreBtn = document.querySelector('.find-store-btn');

findStoreBtn.addEventListener('click', function() {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        alert(`Searching for stores: "${searchValue}"`);
        // In a real application, this would trigger a search API call
    } else {
        alert('Please enter a location to search for stores');
    }
});

// Store carousel functionality
const storesCarousel = document.querySelector('.stores-carousel');
let isDown = false;
let startX;
let scrollLeft;

storesCarousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - storesCarousel.offsetLeft;
    scrollLeft = storesCarousel.scrollLeft;
});

storesCarousel.addEventListener('mouseleave', () => {
    isDown = false;
});

storesCarousel.addEventListener('mouseup', () => {
    isDown = false;
});

storesCarousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - storesCarousel.offsetLeft;
    const walk = (x - startX) * 2;
    storesCarousel.scrollLeft = scrollLeft - walk;
});

// Category card interactions
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const categoryName = this.querySelector('.category-name').textContent;
        console.log(`Clicked on category: ${categoryName}`);
        // In a real application, this would navigate to category page
    });
});

// Explore more+ dropdown functionality
const exploreBtn = document.querySelector('.explore-btn');
let isDropdownOpen = false;

exploreBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    
    if (isDropdownOpen) {
        // Create dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu';
        dropdown.innerHTML = `
            <a href="#stores">Find Stores</a>
            <a href="#deals">Weekly Deals</a>
            <a href="#recipes">Recipes</a>
            <a href="#membership">Membership Benefits</a>
        `;
        
        dropdown.style.position = 'absolute';
        dropdown.style.top = '100%';
        dropdown.style.right = '0';
        dropdown.style.background = 'white';
        dropdown.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        dropdown.style.borderRadius = '10px';
        dropdown.style.padding = '1rem 0';
        dropdown.style.minWidth = '200px';
        dropdown.style.zIndex = '1000';
        
        exploreBtn.appendChild(dropdown);
    } else {
        const existingDropdown = exploreBtn.querySelector('.dropdown-menu');
        if (existingDropdown) {
            existingDropdown.remove();
        }
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', function() {
    const existingDropdown = exploreBtn.querySelector('.dropdown-menu');
    if (existingDropdown) {
        existingDropdown.remove();
        isDropdownOpen = false;
    }
});

// Add some CSS for dropdown
const style = document.createElement('style');
style.textContent = `
    .dropdown-menu {
        animation: fadeIn 0.3s ease;
    }
    
    .dropdown-menu a {
        display: block;
        padding: 0.75rem 1.5rem;
        color: #333;
        text-decoration: none;
        transition: background 0.3s ease;
    }
    
    .dropdown-menu a:hover {
        background: #f8f9fa;
        color: #27ae60;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
