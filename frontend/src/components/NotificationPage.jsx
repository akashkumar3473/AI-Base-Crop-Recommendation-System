import React, { useState } from 'react';

// Main Notification Page Component
const BhoomiSenseNotificationPage = () => {
  // Notifications state
  const initialNotifications = [
    {
      id: 1,
      type: "Pest Alert",
      summary: "Aphids detected in Sector B. Immediate action required.",
      time: "5 mins ago",
      icon: <PestAlertIcon />,
      iconBg: 'bg-red-100',
      isRead: false,
      title: "Pest Alert in Sector B",
      details: "High concentration of Aphids detected near the northern edge of Sector B. Weather conditions are favorable for rapid multiplication. <br/><br/><b>Recommended Action:</b> Deploy organic neem oil spray within the next 24 hours to prevent crop damage. Avoid using chemical pesticides at this stage."
    },
    {
      id: 2,
      type: "Market Update",
      summary: "Tomato prices have increased by 8%. Good time to sell.",
      time: "30 mins ago",
      icon: <MarketUpdateIcon />,
      iconBg: 'bg-indigo-100',
      isRead: false,
      title: "Market Price Update",
      details: "The regional market has seen a sudden spike in tomato prices due to supply chain disruptions. Current average price is ₹45/kg, up 8% from yesterday.<br/><br/><b>Recommendation:</b> This is an opportune moment to sell your current stock for maximum profit. Prices are expected to stabilize in 3-4 days."
    },
    {
      id: 3,
      type: "Irrigation Complete",
      summary: "Irrigation cycle for Wheat field has been completed.",
      time: "1 hour ago",
      icon: <IrrigationIcon />,
      iconBg: 'bg-green-100',
      isRead: false,
      title: "Irrigation Cycle: Wheat Field",
      details: "The automated irrigation cycle for the wheat field (Sector A) has been successfully completed. A total of 25,000 liters of water was used. Soil moisture levels are now optimal at 65%. The next cycle is scheduled in 3 days."
    },
    {
      id: 4,
      type: "Rain Alert",
      summary: "Heavy rain expected in your area for the next 48 hours.",
      time: "2 hours ago",
      icon: <RainAlertIcon />,
      iconBg: 'bg-yellow-100',
      isRead: false,
      title: "Weather Alert: Heavy Rainfall",
      details: "The local weather station predicts heavy rainfall (40-60mm) starting tonight and continuing for the next 48 hours. <br/><br/><b>Recommendation:</b> Please ensure all equipment is covered and check drainage systems to prevent waterlogging. Postpone any planned pesticide spraying."
    },
    {
        id: 5,
        type: "Low Battery",
        summary: "Soil moisture sensor in Sector C has low battery.",
        time: "4 hours ago",
        icon: <LowBatteryIcon />,
        iconBg: 'bg-orange-100',
        isRead: false,
        title: "Low Battery Warning: Sector C Sensor",
        details: "The battery on the soil moisture sensor (ID: SMS-C-04) in Sector C is critically low (12%). Please replace the battery within the next 24 hours to ensure continuous data collection and avoid data gaps."
    },
    {
        id: 6,
        type: "System Update",
        summary: "Sensors firmware updated to v2.1.5 successfully.",
        time: "1 day ago",
        icon: <SystemUpdateIcon />,
        iconBg: 'bg-blue-100',
        isRead: false,
        title: "System Update: Firmware v2.1.5",
        details: "All IoT sensors on the farm have been successfully updated to firmware version 2.1.5. <br/><br/><b>Update Highlights:</b><br/>- Improved battery efficiency by 15%.<br/>- Enhanced data accuracy for soil moisture readings.<br/>- Better network connectivity in low-signal areas. <br/><br/>No action is required from your side."
    },
    {
        id: 7,
        type: "Tank Alert",
        summary: "Water tank level has reached the critical threshold.",
        time: "3 days ago",
        icon: <TankAlertIcon />,
        iconBg: 'bg-red-100',
        isRead: false,
        title: "Critical Alert: Water Tank Level",
        details: "The main water storage tank level has dropped to 15%, which is below the critical threshold of 20%. <br/><br/><b>Action Required:</b> Please initiate the water pump to refill the tank immediately to ensure the next irrigation cycle is not disrupted."
    }
  ];
  const [notifications, setNotifications] = useState(initialNotifications);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', details: '' });

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead).sort((a,b) => b.id - a.id);
  const unreadCount = unreadNotifications.length;
  const readCount = readNotifications.length;
  const totalCount = notifications.length;

  const handleOpenModal = (title, details) => {
    setModalContent({ title, details });
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);
  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <>
      <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F4F3EE;
        }
        .hero-section-font {
            font-family: 'Poppins', sans-serif;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
        }
        @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .modal-scale-in {
            animation: scaleIn 0.3s ease-out forwards;
        }
        .notification-card.unread {
            background-color: #F0FFF4;
            border-left: 4px solid #38A169;
        }
        .toggle-checkbox:checked {
            right: 0;
            border-color: #38A169;
        }
        .toggle-checkbox:checked + .toggle-label {
            background-color: #38A169;
        }
        :root {
            --dark-green: #283618;
            --light-cream: #FEFAE0;
            --olive-green: #606C38;
            --earth-brown: #BC6C25;
            --primary-text: #4A403A;
        }
        .site-footer {
            background-color: var(--dark-green);
            color: var(--light-cream);
            padding: 60px 0 0 0;
            font-size: 15px;
            line-height: 24px;
            font-family: 'Poppins', sans-serif;
        }
        .footer-container {
            max-width: 1200px; margin: 0 auto; padding: 0 20px;
            display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px;
        }
        .footer-about h3 { font-size: 24px; font-weight: 700; margin-bottom: 20px; letter-spacing: 1px; color: #fff; }
        .footer-about p { margin: 0; opacity: 0.8; }
        .footer-links h4, .footer-contact h4, .footer-subscribe h4 { font-size: 18px; font-weight: 600; margin-bottom: 25px; position: relative; color: #fff; }
        .footer-links h4::after, .footer-contact h4::after, .footer-subscribe h4::after { content: ''; position: absolute; left: 0; bottom: -8px; width: 50px; height: 3px; background-color: var(--earth-brown); border-radius: 2px; }
        .footer-links ul { list-style: none; padding: 0; margin: 0; }
        .footer-links li a { color: var(--light-cream); text-decoration: none; opacity: 0.8; display: block; margin-bottom: 12px; transition: all 0.3s ease; }
        .footer-links li a:hover { opacity: 1; color: #fff; transform: translateX(5px); }
        .footer-links li a::before { content: '\\f105'; font-family: 'Font Awesome 6 Free'; font-weight: 900; margin-right: 10px; color: var(--earth-brown); }
        .footer-contact p { margin-bottom: 15px; opacity: 0.8; display: flex; align-items: center; }
        .footer-contact i { margin-right: 15px; color: var(--earth-brown); font-size: 18px; width: 20px; text-align: center; }
        .newsletter-form { display: flex; margin-top: 10px; }
        .newsletter-form input { flex-grow: 1; padding: 12px; border: none; border-radius: 5px 0 0 5px; font-family: 'Poppins', sans-serif; background-color: var(--olive-green); color: #fff; }
        .newsletter-form input::placeholder { color: rgba(255, 255, 255, 0.6); }
        .newsletter-form input:focus { outline: none; box-shadow: 0 0 0 2px var(--earth-brown); }
        .newsletter-form button { padding: 12px 20px; border: none; background-color: var(--earth-brown); color: #fff; font-weight: 600; cursor: pointer; border-radius: 0 5px 5px 0; transition: background-color 0.3s ease; }
        .newsletter-form button:hover { background-color: #d9802c; }
        .social-icons { margin-top: 25px; display: flex; gap: 15px; }
        .social-icons a { color: var(--dark-green); background-color: var(--light-cream); width: 40px; height: 40px; border-radius: 50%; display: flex; justify-content: center; align-items: center; text-decoration: none; font-size: 18px; transition: all 0.3s ease; }
        .social-icons a:hover { transform: translateY(-5px); background-color: var(--earth-brown); color: #fff; }
        .footer-bottom-bar { margin-top: 60px; padding: 20px 0; text-align: center; background-color: rgba(0, 0, 0, 0.2); }
        .copyright-text { margin: 0; opacity: 0.7; }
        @media (max-width: 768px) {
            .site-footer { text-align: center; }
            .footer-links h4::after, .footer-contact h4::after, .footer-subscribe h4::after { left: 50%; transform: translateX(-50%); }
            .footer-contact p { justify-content: center; }
            .social-icons { justify-content: center; }
        }
      `}</style>

      {/* Main Content */}
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          {/* Notifications Column */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 sm:p-8">
            <header className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Recent Notifications</h1>
              <button onClick={handleMarkAllAsRead} disabled={unreadCount === 0} className="mt-4 sm:mt-0 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                Mark All as Read
              </button>
            </header>
            <section id="recent-section">
              <div id="recent-container" className="space-y-4">
                {unreadNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} onMarkAsRead={handleMarkAsRead} onViewDetails={handleOpenModal} />
                ))}
              </div>
              {unreadCount === 0 && <div className="text-center text-gray-500 py-10">You're all caught up!</div>}
            </section>
            <hr className={(unreadCount === 0 || readCount === 0) ? 'hidden' : 'my-8 border-gray-200'} />
            <section id="read-section" className={readCount === 0 ? 'hidden' : ''}>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Previously Read</h2>
              <div id="read-container" className="space-y-4">
                {readNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} onViewDetails={handleOpenModal} />
                ))}
              </div>
            </section>
          </div>

          {/* Settings & Summary Column */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">Notification Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <label htmlFor="tank-notifications" className="text-gray-600">Rainwater Tank Notifications</label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="tank-notifications" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                    <label htmlFor="tank-notifications" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
                <div>
                  <label htmlFor="danger-threshold" className="block text-sm font-medium text-gray-600">Custom Danger Threshold (%)</label>
                  <input type="number" id="danger-threshold" defaultValue="85" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                  <p className="mt-2 text-xs text-gray-500">Set the tank level percentage that triggers danger alerts.</p>
                </div>
                <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">Save Settings</button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">Notification Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-600">
                  <p>Total Notifications:</p>
                  <p className="font-bold text-gray-800">{totalCount}</p>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <p>Unread:</p>
                  <p className={`font-bold ${unreadCount > 0 ? 'text-red-500' : 'text-gray-800'}`}>{unreadCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modal */}
      {isModalOpen && <NotificationModal title={modalContent.title} details={modalContent.details} onClose={handleCloseModal} />}
    </>
  );
};


// --- SUB-COMPONENTS ---
const NotificationCard = ({ notification, onMarkAsRead, onViewDetails }) => {
  const isUnread = !notification.isRead;
  const cardClasses = `notification-card p-4 rounded-lg flex items-center justify-between cursor-pointer transition-all duration-300 ${isUnread ? 'unread' : ''}`;
  return (
    <div className={cardClasses} onClick={() => isUnread && onMarkAsRead(notification.id)}>
      <div className="flex items-center space-x-4">
        <div className={`${notification.iconBg} p-2 rounded-full`}>{notification.icon}</div>
        <div>
          <p className="font-semibold text-gray-800">
            {notification.type}
            <span className="text-sm font-normal text-gray-500 ml-2">{notification.time}</span>
          </p>
          <p className="text-gray-600">{notification.summary}</p>
        </div>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onViewDetails(notification.title, notification.details); }} className="view-details-btn bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
        View Details
      </button>
    </div>
  );
};

const NotificationModal = ({ title, details, onClose }) => {
  return (
    <div id="notification-modal-overlay" className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div id="notification-modal" className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-auto modal-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-start border-b pb-3 mb-4">
            <h3 id="modal-title" className="text-2xl font-bold text-gray-800">{title}</h3>
            <button id="modal-close-btn" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          <div id="modal-body" className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: details }} />
        </div>
        <div className="bg-gray-50 px-6 py-4 rounded-b-xl text-right">
          <button id="modal-ok-btn" onClick={onClose} className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
    <footer className="site-footer">
        <div className="footer-container">
            <div className="footer-about">
                <h3>BHOOMI SENSE</h3>
                <p>Empowering Indian farmers by connecting them with modern technology. We work towards better yields, accurate information, and a prosperous future.</p>
            </div>
            <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div className="footer-contact">
                <h4>Contact Us</h4>
                <p><i className="fas fa-map-marker-alt"></i> Krishi Bhavan, New Delhi, India</p>
                <p><i className="fas fa-phone"></i> +91 98765 43210</p>
                <p><i className="fas fa-envelope"></i> contact@krishipragati.in</p>
            </div>
            <div className="footer-subscribe">
                <h4>Join Our Newsletter</h4>
                <p style={{opacity:0.8, marginBottom: '20px'}}>Get the latest insights on agriculture.</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Your email address" required />
                    <button type="submit">Subscribe</button>
                </form>
                <div className="social-icons">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                </div>
            </div>
        </div>
        <div className="footer-bottom-bar">
            <p className="copyright-text">&copy; 2025 Krishi-Pragati. All rights reserved.</p>
        </div>
    </footer>
);

// --- SVG ICON COMPONENTS ---
const PestAlertIcon = () => (
    <svg className="w-6 h-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
);
const MarketUpdateIcon = () => (
    <svg className="w-6 h-6 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
);
const IrrigationIcon = () => (
    <svg className="w-6 h-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
);
const RainAlertIcon = () => (
    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zM12 19l-2-2m0 0l2-2m-2 2h6m-3 3v-2"></path></svg>
);
const LowBatteryIcon = () => (
    <svg className="w-6 h-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6.375A2.25 2.25 0 0018.75 7.5h-15A2.25 2.25 0 001.5 9.375v6.375A2.25 2.25 0 003.75 18z" /></svg>
);
const SystemUpdateIcon = () => (
    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);
const TankAlertIcon = () => (
    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
);

export default BhoomiSenseNotificationPage;