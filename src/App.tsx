import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Salon, Booking, Role, Screen, Service } from './types';

// Importing views modularly
import SplashView from './components/SplashView';
import RoleSelectionView from './components/RoleSelectionView';
import LoginView from './components/LoginView';
import CustomerHomeView from './components/CustomerHomeView';
import SalonDetailsView from './components/SalonDetailsView';
import BookingView from './components/BookingView';
import BookingConfirmationView from './components/BookingConfirmationView';
import CustomerProfileView from './components/CustomerProfileView';
import CustomerBookingsView from './components/CustomerBookingsView';
import BarberHomeView from './components/BarberHomeView';
import BarberBookingsView from './components/BarberBookingsView';
import BarberProfileView from './components/BarberProfileView';
import BottomNav from './components/BottomNav';

// Static assets definition
const GENERATED_SALON_IMAGE = '/src/assets/images/salon_interior_1781506699402.jpg';

const SAMPLE_SALONS: Salon[] = [
  {
    id: 'salon-1',
    name: 'Gilded Shears Barber',
    rating: 4.8,
    distance: '0.5KM',
    image: GENERATED_SALON_IMAGE,
    services: [
      { id: 'srv-1', name: 'Haircut', price: 150 },
      { id: 'srv-2', name: 'Beard Trim', price: 80 },
      { id: 'srv-3', name: 'Hair Wash', price: 100 },
    ],
    workingHours: 'Mon - Sat : 9AM - 9PM',
  },
  {
    id: 'salon-2',
    name: 'Royale Crown Salon',
    rating: 4.9,
    distance: '1.2KM',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200',
    services: [
      { id: 'srv-4', name: 'Premium Haircut & Wash', price: 250 },
      { id: 'srv-5', name: 'Hot Towel Deluxe Shave', price: 150 },
      { id: 'srv-6', name: 'Royal Gold Hair Massage', price: 180 },
    ],
    workingHours: 'Daily : 8AM - 10PM',
  }
];

const DEFAULT_BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    salonId: 'salon-1',
    salonName: 'Gilded Shears Barber',
    serviceId: 'srv-1',
    serviceName: 'Haircut',
    price: 150,
    date: '13 Sat',
    time: '9:00AM',
    status: 'pending',
    customerName: 'Tharun',
    customerEmail: 'tharun@gmail.com',
  },
  {
    id: 'booking-2',
    salonId: 'salon-1',
    salonName: 'Gilded Shears Barber',
    serviceId: 'srv-2',
    serviceName: 'Beard Trim',
    price: 80,
    date: '13 Sat',
    time: '11:00AM',
    status: 'pending',
    customerName: 'Karan',
    customerEmail: 'karan@gmail.com',
  },
  {
    id: 'booking-3',
    salonId: 'salon-1',
    salonName: 'Gilded Shears Barber',
    serviceId: 'srv-3',
    serviceName: 'Hair Wash',
    price: 100,
    date: '14 Sun',
    time: '2:00PM',
    status: 'accepted',
    customerName: 'Suresh',
    customerEmail: 'suresh@hotmail.com',
  }
];

export default function App() {
  // Navigation & Role states
  const [screen, setScreen] = useState<Screen>('splash');
  const [role, setRole] = useState<Role>('customer');
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'profile'>('home');

  // Active authenticated user details
  const [customerUser, setCustomerUser] = useState({
    name: 'Tharun',
    email: 'tharun@gmail.com',
  });
  const [barberUser, setBarberUser] = useState({
    name: 'Raja',
    email: 'raja@gmail.com',
  });

  // Database persistent states
  const [salons, setSalons] = useState<Salon[]>(SAMPLE_SALONS);
  const [bookings, setBookings] = useState<Booking[]>(DEFAULT_BOOKINGS);

  // Active selection slots
  const [selectedSalon, setSelectedSalon] = useState<Salon>(SAMPLE_SALONS[0]);
  const [selectedService, setSelectedService] = useState<Service>(SAMPLE_SALONS[0].services[0]);
  const [latestBookingDetails, setLatestBookingDetails] = useState<{
    date: string;
    time: string;
  } | null>(null);

  // Load from LocalStorage for state persistence across compiles/reloads
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('salonmate_bookings');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
      const savedCustomer = localStorage.getItem('salonmate_customer');
      if (savedCustomer) {
        setCustomerUser(JSON.parse(savedCustomer));
      }
      const savedBarber = localStorage.getItem('salonmate_barber');
      if (savedBarber) {
        setBarberUser(JSON.parse(savedBarber));
      }
      const savedSalons = localStorage.getItem('salonmate_salons');
      if (savedSalons) {
        setSalons(JSON.parse(savedSalons));
      }
    } catch (e) {
      console.error('Failed to parse storage elements', e);
    }
  }, []);

  // Synchronizers to localStorage
  const saveBookingsToStorage = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('salonmate_bookings', JSON.stringify(newBookings));
  };

  const saveSalonsToStorage = (newSalons: Salon[]) => {
    setSalons(newSalons);
    localStorage.setItem('salonmate_salons', JSON.stringify(newSalons));
  };

  // Customer actions
  const handleSelectRole = (selectedRole: Role) => {
    setRole(selectedRole);
    setScreen('login');
  };

  const handleLoginSuccess = (email: string, name: string) => {
    if (role === 'customer') {
      const profile = { name, email };
      setCustomerUser(profile);
      localStorage.setItem('salonmate_customer', JSON.stringify(profile));
      setScreen('customer-home');
      setActiveTab('home');
    } else {
      const profile = { name, email };
      setBarberUser(profile);
      localStorage.setItem('salonmate_barber', JSON.stringify(profile));
      setScreen('barber-home');
      setActiveTab('home');
    }
  };

  const handleSelectSalon = (salon: Salon) => {
    setSelectedSalon(salon);
    setScreen('salon-details');
  };

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setScreen('booking');
  };

  const handleConfirmBookingSlot = (date: string, time: string) => {
    setLatestBookingDetails({ date, time });

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      salonId: selectedSalon.id,
      salonName: selectedSalon.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      date,
      time,
      status: 'pending',
      customerName: customerUser.name,
      customerEmail: customerUser.email,
    };

    const newBookings = [newBooking, ...bookings];
    saveBookingsToStorage(newBookings);
    setScreen('booking-confirmation');
  };

  const handleCancelBookingByCustomer = (id: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: 'cancelled' as const } : b
    );
    saveBookingsToStorage(updated);
  };

  // Barber actions
  const handleAcceptBookingByBarber = (id: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: 'accepted' as const } : b
    );
    saveBookingsToStorage(updated);
  };

  const handleCancelBookingByBarber = (id: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: 'cancelled' as const } : b
    );
    saveBookingsToStorage(updated);
  };

  const handleAddSalonService = (name: string, price: number) => {
    // Modify first salon services List (Gilded Shears Barber owned by Barber Raja)
    const updatedSalons = salons.map((salon) => {
      if (salon.id === 'salon-1') {
        const newService: Service = {
          id: `srv-${Date.now()}`,
          name,
          price,
        };
        return {
          ...salon,
          services: [...salon.services, newService],
        };
      }
      return salon;
    });
    saveSalonsToStorage(updatedSalons);
  };

  const handleRemoveSalonService = (serviceId: string) => {
    const updatedSalons = salons.map((salon) => {
      if (salon.id === 'salon-1') {
        return {
          ...salon,
          services: salon.services.filter((s) => s.id !== serviceId),
        };
      }
      return salon;
    });
    saveSalonsToStorage(updatedSalons);
  };

  const handleLogout = () => {
    setScreen('role-selection');
  };

  // Shared Bottom Navigation change tab trigger
  const handleNavigateTab = (tab: 'home' | 'bookings' | 'profile') => {
    setActiveTab(tab);
    if (role === 'customer') {
      if (tab === 'home') setScreen('customer-home');
      else if (tab === 'bookings') setScreen('customer-home'); 
      else if (tab === 'profile') setScreen('customer-profile');
    } else {
      if (tab === 'home') setScreen('barber-home');
      else if (tab === 'bookings') setScreen('barber-bookings');
      else if (tab === 'profile') setScreen('barber-profile');
    }
  };

  // Quick helper to override tab selection manually for Bookings lists
  const handleJumpToBookingsTabSpecially = () => {
    setActiveTab('bookings');
    if (role === 'customer') {
      // Just load profile/navigation and trigger list
      setScreen('customer-home'); // Jump back or show booking view directly
    }
  };

  // Notification counter for client based on recently accepted appointments
  const activeCustomerPendingCount = bookings.filter(
    (b) => b.customerEmail === customerUser.email && b.status === 'accepted'
  ).length;

  return (
    <div className="bg-[#000000] min-h-screen text-white select-none selection:bg-gold/30 selection:text-white font-sans overflow-x-hidden antialiased">
      <AnimatePresence mode="wait">
        
        {/* Screen 1: Splash Display */}
        {screen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <SplashView onNext={() => setScreen('role-selection')} />
          </motion.div>
        )}

        {/* Screen 2: Role Options Selection */}
        {screen === 'role-selection' && (
          <motion.div
            key="role-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <RoleSelectionView onSelectRole={handleSelectRole} />
          </motion.div>
        )}

        {/* Screen 3: Credentials Login */}
        {screen === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <LoginView
              role={role}
              onBack={() => setScreen('role-selection')}
              onLoginSuccess={handleLoginSuccess}
            />
          </motion.div>
        )}

        {/* Screen 4: Customer Feed (Home Tab) */}
        {screen === 'customer-home' && activeTab === 'home' && (
          <motion.div
            key="customer-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CustomerHomeView
              salons={salons}
              onSelectSalon={handleSelectSalon}
              onNavigateTab={handleNavigateTab}
              activeTab={activeTab}
              userName={customerUser.name}
            />
          </motion.div>
        )}

        {/* Screen 5: Barber Shop Details */}
        {screen === 'salon-details' && (
          <motion.div
            key="salon-details"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <SalonDetailsView
              salon={selectedSalon}
              onBack={() => setScreen('customer-home')}
              onBookNow={handleBookNow}
            />
          </motion.div>
        )}

        {/* Screen 6: Time & Date slots Picker */}
        {screen === 'booking' && (
          <motion.div
            key="booking"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BookingView
              salon={selectedSalon}
              service={selectedService}
              onBack={() => setScreen('salon-details')}
              onConfirmBooking={handleConfirmBookingSlot}
            />
          </motion.div>
        )}

        {/* Screen 7: Booking Confirmed landing */}
        {screen === 'booking-confirmation' && (
          <motion.div
            key="booking-confirmation"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BookingConfirmationView
              salon={selectedSalon}
              service={selectedService}
              date={latestBookingDetails?.date || '13 Sat'}
              time={latestBookingDetails?.time || '9:00AM'}
              onGoHome={() => {
                setScreen('customer-home');
                setActiveTab('home');
              }}
              onViewBookings={() => {
                setScreen('customer-home');
                setActiveTab('bookings'); // Go to bookings
              }}
            />
          </motion.div>
        )}

        {/* Bottom Nav Middle Tab: Customer Bookings List */}
        {role === 'customer' && activeTab === 'bookings' && (
          <motion.div
            key="customer-bookings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CustomerBookingsView
              bookings={bookings.filter((b) => b.customerEmail === customerUser.email)}
              onCancelBooking={handleCancelBookingByCustomer}
            />
          </motion.div>
        )}

        {/* Screen 8 / Tab 3: Customer profile options */}
        {role === 'customer' && activeTab === 'profile' && (
          <motion.div
            key="customer-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CustomerProfileView
              userName={customerUser.name}
              userEmail={customerUser.email}
              onNavigateTab={handleNavigateTab}
              onUpdateName={(name) => {
                const updated = { ...customerUser, name };
                setCustomerUser(updated);
                localStorage.setItem('salonmate_customer', JSON.stringify(updated));
              }}
              onLogout={handleLogout}
              notificationCount={activeCustomerPendingCount}
            />
          </motion.div>
        )}

        {/* Screen 9: Barber Feed "My Schedule" */}
        {screen === 'barber-home' && activeTab === 'home' && (
          <motion.div
            key="barber-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <BarberHomeView
              bookings={bookings}
              onAcceptBooking={handleAcceptBookingByBarber}
              onCancelBooking={handleCancelBookingByBarber}
              barberName={barberUser.name}
            />
          </motion.div>
        )}

        {/* Screen 9.5: Barber Bookings Archive list */}
        {role === 'barber' && activeTab === 'bookings' && (
          <motion.div
            key="barber-bookings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <BarberBookingsView
              bookings={bookings}
              onAcceptBooking={handleAcceptBookingByBarber}
              onCancelBooking={handleCancelBookingByBarber}
            />
          </motion.div>
        )}

        {/* Screen 10 / Tab 3: Barber Profile */}
        {role === 'barber' && activeTab === 'profile' && (
          <motion.div
            key="barber-profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <BarberProfileView
              barberName={barberUser.name}
              barberEmail={barberUser.email}
              onUpdateName={(name) => {
                const updated = { ...barberUser, name };
                setBarberUser(updated);
                localStorage.setItem('salonmate_barber', JSON.stringify(updated));
              }}
              onLogout={handleLogout}
              onNavigateTab={handleNavigateTab}
              services={salons.find((s) => s.id === 'salon-1')?.services || []}
              onAddService={handleAddSalonService}
              onRemoveService={handleRemoveSalonService}
            />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Global persistent Bottom tab rail for log-in users */}
      {screen !== 'splash' && screen !== 'role-selection' && screen !== 'login' && screen !== 'booking' && screen !== 'booking-confirmation' && screen !== 'salon-details' && (
        <BottomNav
          activeTab={activeTab}
          onChangeTab={handleNavigateTab}
        />
      )}
    </div>
  );
}
