const Footer = () => {
    return (
      <footer className="relative bg-black text-white py-12 overflow-hidden pt-36">
        {/* New Background */}
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
  
        <div className="relative max-w-screen-2xl mx-auto px-6 md:px-8 z-10">
          <div className="flex flex-wrap justify-between items-start gap-8">
            {/* Company Info */}
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <h2 className="text-2xl font-bold">Sahayak</h2>
              <p className="text-white/80 mt-2">
                A platform dedicated to enhancing women's safety through technology. Join us in making the world a safer place.
              </p>
            </div>
  
            {/* Links */}
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-white/80">
                <li><a href="#home" className="hover:text-primary">Home</a></li>
                <li><a href="#about" className="hover:text-primary">About Us</a></li>
                <li><a href="#services" className="hover:text-primary">Services</a></li>
                <li><a href="#contact" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div className="w-full sm:w-1/2 lg:w-1/3">
              <h3 className="text-xl font-semibold">Contact Us</h3>
              <ul className="mt-4 space-y-2 text-white/80">
                <li>Email: <a href="mailto:info@sahayak.com" className="hover:text-primary">info@sahayak.com</a></li>
                <li>Phone: <a href="tel:+1234567890" className="hover:text-primary">+123 456 7890</a></li>
                <li>Address: 123 Safety Lane, Secure City, Country</li>
              </ul>
              {/* Social Media Links */}
              <div className="mt-4 flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                  <i className="fab fa-facebook-f"></i> {/* Font Awesome icon */}
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="mt-8 border-t border-gray-700 pt-4 text-center text-white/60">
            <p>&copy; 2024 Sahayak. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  