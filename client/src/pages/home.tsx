import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Logo } from "@/components/ui/logo";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Flame, 
  Snowflake, 
  Wrench, 
  Star,
  CheckCircle,
  Menu,
  X
} from "lucide-react";

interface Service {
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface Review {
  quote: string;
  customer_name: string;
  rating: number;
}

interface NavigationLink {
  text: string;
  url: string;
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  // Initial content data
  const aboutUsText = "Family-owned HVAC company serving West Lorne and surrounding communities. Specializes in heating, cooling, and oil tank service. Trusted locally for honest, fast, and professional work.";
  
  const coreServices: Service[] = [
    {
      name: "Furnace Installation & Repair",
      description: "Professional furnace installation, repair, and maintenance services to keep your home warm and comfortable all winter long.",
      icon: <Flame className="w-12 h-12 text-primary-red" />
    },
    {
      name: "Air Conditioning Installation & Repair", 
      description: "Expert AC installation and repair services to ensure your home stays cool and comfortable during hot summer months.",
      icon: <Snowflake className="w-12 h-12 text-primary-red" />
    },
    {
      name: "Oil Tank Servicing",
      description: "Complete oil tank maintenance and servicing to ensure safe and efficient operation of your heating system.",
      icon: <div className="w-12 h-12 text-primary-red flex items-center justify-center"><svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
    },
    {
      name: "HVAC Maintenance (Residential & Light Commercial)",
      description: "Comprehensive maintenance services for residential and light commercial HVAC systems to prevent costly breakdowns.",
      icon: <Wrench className="w-12 h-12 text-primary-red" />
    }
  ];

  const whyChooseUsPoints = [
    "Over 20 years of local experience",
    "Friendly, certified technicians", 
    "Emergency availability",
    "Clean, professional service",
    "Fair and transparent pricing"
  ];

  const reviews: Review[] = [
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
  ];

  const navigationLinks: NavigationLink[] = [
    { text: "Home", url: "#home" },
    { text: "Services", url: "#services" },
    { text: "About", url: "#about" },
    { text: "Reviews", url: "#reviews" },
    { text: "Contact", url: "#contact" }
  ];

  const contactPhone = "519-768-2800";
  const contactAddress = "10182 Graham Road (RR 2), West Lorne, ON N0L 2P0";

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'about', 'reviews', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.\n\nNote: This is a demo form. In production, this would submit to your backend.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo className="w-10 h-10 mr-3" />
              <span className="text-xl font-bold text-gray-900">Pollard Heating & Cooling</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationLinks.map((link) => (
                  <button
                    key={link.text}
                    onClick={() => scrollToSection(link.url.substring(1))}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      activeSection === link.url.substring(1)
                        ? 'text-primary-red border-b-2 border-primary-red'
                        : 'text-gray-700 hover:text-primary-red'
                    }`}
                  >
                    {link.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-primary-red"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationLinks.map((link) => (
                <button
                  key={link.text}
                  onClick={() => scrollToSection(link.url.substring(1))}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                    activeSection === link.url.substring(1)
                      ? 'text-primary-red bg-red-50'
                      : 'text-gray-700 hover:text-primary-red hover:bg-gray-50'
                  }`}
                >
                  {link.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-gradient text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional HVAC Services
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Trusted heating and cooling solutions for West Lorne and surrounding communities
          </p>
          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-white text-primary-red hover:bg-gray-100 btn-custom px-8 py-3 text-lg font-semibold"
          >
            Get Free Quote
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreServices.map((service, index) => (
              <Card key={index} className="service-card border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="mb-6">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-primary-blue">
                    {service.name}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                About Pollard Heating & Cooling
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {aboutUsText}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                {whyChooseUsPoints.map((point, index) => (
                  <div key={index} className="why-choose-item">
                    <CheckCircle className="w-6 h-6 text-primary-red mr-4 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="testimonial-card border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4 stars">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg">
                    {review.quote}
                  </p>
                  <div className="text-right">
                    <strong className="text-gray-900">
                      - {review.customer_name}
                    </strong>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-12 h-12 text-primary-red mx-auto mb-4" />
              <h5 className="text-xl font-semibold mb-2 text-primary-blue">Call Us</h5>
              <p className="text-gray-600">{contactPhone}</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary-red mx-auto mb-4" />
              <h5 className="text-xl font-semibold mb-2 text-primary-blue">Visit Us</h5>
              <p className="text-gray-600">{contactAddress}</p>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary-red mx-auto mb-4" />
              <h5 className="text-xl font-semibold mb-2 text-primary-blue">Emergency Service</h5>
              <p className="text-gray-600">24/7 Available<br />Call for urgent repairs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Get Your Free Quote
          </h2>
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 focus:ring-primary-blue focus:border-primary-blue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 focus:ring-primary-blue focus:border-primary-blue"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 focus:ring-primary-blue focus:border-primary-blue"
                  />
                </div>
                
                <div>
                  <Label htmlFor="service" className="text-sm font-medium text-gray-700">
                    Service Needed
                  </Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue"
                  >
                    <option value="">Select a service...</option>
                    <option value="furnace">Furnace Installation/Repair</option>
                    <option value="ac">Air Conditioning Installation/Repair</option>
                    <option value="oil-tank">Oil Tank Servicing</option>
                    <option value="maintenance">HVAC Maintenance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    required
                    placeholder="Please describe your HVAC needs..."
                    className="mt-1 focus:ring-primary-blue focus:border-primary-blue"
                  />
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-primary-red hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold"
                  >
                    Send Message
                  </Button>
                  <p className="mt-4 text-sm text-gray-500">
                    * Required fields. We'll respond within 24 hours.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4 text-primary-red">
                Pollard Heating & Cooling
              </h5>
              <p className="text-gray-300 leading-relaxed">
                Professional HVAC services for West Lorne and surrounding communities. 
                Family-owned and locally trusted for over 20 years.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 text-primary-red">
                Quick Links
              </h5>
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.text}>
                    <button
                      onClick={() => scrollToSection(link.url.substring(1))}
                      className="text-gray-300 hover:text-primary-red transition-colors"
                    >
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 text-primary-red">
                Contact Info
              </h5>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {contactPhone}
                </p>
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  West Lorne, ON
                </p>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-600" />
          <div className="text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Pollard Heating & Cooling. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
