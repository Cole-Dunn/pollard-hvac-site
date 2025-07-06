// Main JavaScript file for Pollard Heating & Cooling website
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Load content from CMS data
    loadContent();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize contact form
    initContactForm();
    
    // Generate logo
    generateLogo();
});

// Load content from _data/content.json
async function loadContent() {
    try {
        const response = await fetch('/_data/content.json');
        const data = await response.json();
        
        // Update main headline
        const headline = document.getElementById('main-headline');
        if (headline && data.main_headline) {
            headline.textContent = data.main_headline;
        }
        
        // Update about us text
        const aboutContainer = document.getElementById('about-us-container');
        if (aboutContainer && data.about_us_text) {
            aboutContainer.innerHTML = `<p class="lead">${data.about_us_text}</p>`;
        }
        
        // Update services
        if (data.core_services) {
            renderServices(data.core_services);
        }
        
        // Update why choose us points
        if (data.why_choose_us_points) {
            renderWhyChooseUs(data.why_choose_us_points);
        }
        
        // Update reviews
        if (data.reviews) {
            renderReviews(data.reviews);
        }
        
        // Update contact info
        if (data.contact_phone) {
            const phoneDisplay = document.getElementById('contact-phone-display');
            if (phoneDisplay) {
                phoneDisplay.textContent = data.contact_phone;
            }
        }
        
        if (data.contact_address) {
            const addressDisplay = document.getElementById('contact-address-display');
            if (addressDisplay) {
                addressDisplay.textContent = data.contact_address;
            }
        }
        
        // Update navigation (using default navigation for now)
        renderNavigation();
        
    } catch (error) {
        console.error('Error loading content:', error);
        // Fall back to default content if JSON fails to load
        loadDefaultContent();
    }
}

// Render services section
function renderServices(services) {
    const container = document.getElementById('services-container');
    if (!container) return;
    
    const serviceIcons = ['🔥', '❄️', '🛢️', '🔧'];
    const serviceTypes = ['heating', 'cooling', 'heating', 'cooling'];
    
    container.innerHTML = services.map((service, index) => `
        <div class="col-md-6 mb-4">
            <div class="card service-card h-100">
                <div class="card-body text-center">
                    <div class="service-icon ${serviceTypes[index % serviceTypes.length]}">
                        ${serviceIcons[index % serviceIcons.length]}
                    </div>
                    <h4 class="card-title text-primary-blue">${service.name}</h4>
                    <p class="card-text">${service.description}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// Render why choose us section
function renderWhyChooseUs(points) {
    const container = document.getElementById('why-choose-us-container');
    if (!container) return;
    
    container.innerHTML = points.map(item => `
        <div class="why-choose-item">
            <i class="fas fa-check-circle"></i>
            <span>${item.point}</span>
        </div>
    `).join('');
}

// Render reviews section
function renderReviews(reviews) {
    const container = document.getElementById('reviews-container');
    if (!container) return;
    
    container.innerHTML = reviews.map(review => `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card testimonial-card h-100">
                <div class="card-body">
                    <div class="stars mb-3">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                    <p class="card-text fst-italic">${review.quote}</p>
                    <div class="text-end">
                        <strong>- ${review.customer_name}</strong>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render navigation
function renderNavigation() {
    const container = document.getElementById('navigation-links');
    if (!container) return;
    
    const navLinks = [
        { text: 'Home', url: '#hero' },
        { text: 'Services', url: '#services' },
        { text: 'About', url: '#about' },
        { text: 'Reviews', url: '#reviews' },
        { text: 'Contact', url: '#contact' }
    ];
    
    container.innerHTML = navLinks.map(link => `
        <li class="nav-item">
            <a class="nav-link" href="${link.url}">${link.text}</a>
        </li>
    `).join('');
}

// Generate SVG logo
function generateLogo() {
    const container = document.getElementById('logo-container');
    if (!container) return;
    
    container.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
            <!-- Red flame -->
            <path d="M15 35 Q10 25 15 15 Q20 10 25 15 Q30 25 25 35 Q20 40 15 35 Z" fill="#DC3545"/>
            <!-- Blue snowflake -->
            <g fill="#0D6EFD">
                <circle cx="55" cy="20" r="2"/>
                <rect x="54" y="10" width="2" height="20"/>
                <rect x="45" y="19" width="20" height="2"/>
                <rect x="48" y="13" width="14" height="2" transform="rotate(45 55 20)"/>
                <rect x="48" y="25" width="14" height="2" transform="rotate(-45 55 20)"/>
            </g>
        </svg>
    `;
}

// Load default content if JSON fails
function loadDefaultContent() {
    const defaultData = {
        main_headline: "Professional HVAC Services",
        about_us_text: "Family-owned HVAC company serving West Lorne and surrounding communities. Specializes in heating, cooling, and oil tank service. Trusted locally for honest, fast, and professional work.",
        core_services: [
            {
                name: "Furnace Installation & Repair",
                description: "Professional furnace installation, repair, and maintenance services to keep your home warm and comfortable all winter long."
            },
            {
                name: "Air Conditioning Installation & Repair",
                description: "Expert AC installation and repair services to ensure your home stays cool and comfortable during hot summer months."
            },
            {
                name: "Oil Tank Servicing",
                description: "Complete oil tank maintenance and servicing to ensure safe and efficient operation of your heating system."
            },
            {
                name: "HVAC Maintenance (Residential & Light Commercial)",
                description: "Comprehensive maintenance services for residential and light commercial HVAC systems to prevent costly breakdowns."
            }
        ],
        why_choose_us_points: [
            { point: "Over 20 years of local experience" },
            { point: "Friendly, certified technicians" },
            { point: "Emergency availability" },
            { point: "Clean, professional service" },
            { point: "Fair and transparent pricing" }
        ],
        reviews: [
            {
                quote: "Great local company! Fixed my furnace same day — very friendly and professional.",
                customer_name: "Samantha L.",
                rating: 5
            },
            {
                quote: "They installed a new A/C unit and did an amazing job. Clean, fast, and honest.",
                customer_name: "James R.",
                rating: 5
            },
            {
                quote: "Highly recommend Pollard. We've used them for years and always had great service.",
                customer_name: "Megan W.",
                rating: 5
            }
        ],
        contact_phone: "519-768-2800",
        contact_address: "10182 Graham Road (RR 2), West Lorne, ON N0L 2P0"
    };
    
    // Render default content
    renderServices(defaultData.core_services);
    renderWhyChooseUs(defaultData.why_choose_us_points);
    renderReviews(defaultData.reviews);
    renderNavigation();
    
    document.getElementById('about-us-container').innerHTML = `<p class="lead">${defaultData.about_us_text}</p>`;
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Show success message (since this is a demo)
        alert('Thank you for your message! We will contact you soon.\n\nNote: This is a demo form. In production, this would submit to your backend.');
        
        // Reset form
        form.reset();
    });
}