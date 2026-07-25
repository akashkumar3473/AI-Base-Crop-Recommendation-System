const AppFooter = () => (
 <footer className="bg-[#283618] text-[#FEFAE0] font-sans">
  <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
    {/* About Section */}
    <div className="md:col-span-2 lg:col-span-1">
      <h3 className="text-2xl font-bold text-white mb-4">Bhoomi Sense</h3>
      <p className="opacity-80">Empowering Indian farmers by connecting them with modern technology. We work towards better yields, accurate information, and a prosperous future.</p>
    </div>

    {/* Quick Links */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-5 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-[3px] after:bg-[#BC6C25] after:rounded">Quick Links</h4>
      <ul className="space-y-3">
        {['Dashboard', 'Notifications'].map(link => (
         <li key={link}><a href="#" className="flex items-center opacity-80 hover:opacity-100 hover:text-white hover:translate-x-1 transition-all duration-300">{link}</a></li>
        ))}
      </ul>
    </div>

    {/* Contact Us */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-5 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-[3px] after:bg-[#BC6C25] after:rounded">Contact Us</h4>
      <div className="space-y-4">
        <p className="flex items-center opacity-80">Krishi Bhavan, New Delhi, India</p>
        <p className="flex items-center opacity-80">+91 98765 43210</p>
        <p className="flex items-center opacity-80">contact@bhoomisense.in</p>
      </div>
    </div>

    {/* Newsletter */}
    <div>
      <h4 className="text-lg font-semibold text-white mb-5 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-[3px] after:bg-[#BC6C25] after:rounded">
        Join Our Newsletter
      </h4>
      <p className="opacity-80 mb-4">Get the latest insights on agriculture.</p>
      <form className="flex w-full">
        <input
          type="email"
          placeholder="Your email"
          className="flex-grow py-2 px-3 bg-[#606C38] text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#BC6C25] min-w-0"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-[#BC6C25] text-white font-semibold rounded-r-md hover:bg-[#a55d21] transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>
  <div className="mt-8 py-4 bg-black/20 text-center">
    <p className="opacity-60 text-sm">&copy; {new Date().getFullYear()} Bhoomi Sense. All rights reserved.</p>
  </div>
 </footer>
);

export default AppFooter;