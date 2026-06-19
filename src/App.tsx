import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Salon, Booking, Role, Screen, Service } from './types';
import { supabase } from './lib/supabase';

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

const GENERATED_SALON_IMAGE = 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200';

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

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [role, setRole] = useState<Role>('customer');
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'profile'>('home');
  const [loading, setLoading] = useState(true);

  const [customerUser, setCustomerUser] = useState({ name: 'Guest', email: '' });
  const [barberUser, setBarberUser] = useState({ name: 'Barber', email: '' });

  const [salons, setSalons] = useState<Salon[]>(SAMPLE_SALONS);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [selectedSalon, setSelectedSalon] = useState<Salon>(SAMPLE_SALONS[0]);
  const [selectedService, setSelectedService] = useState<Service>(SAMPLE_SALONS[0].services[0]);
  const [latestBookingDetails, setLatestBookingDetails] = useState<{ date: string; time: string; } | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await supabase.from('bookings').select('*');
      if (data && data.length > 0) {
        const mapped = data.map((b: any) => ({
          id: b.id,
          salonId: b.salon_id || 'salon-1',
          salonName: b.salon_name,
          serviceId: b.service_id || 'srv-1',
          serviceName: b.service_name,
          price: b.price,
          date: b.date,
          time: b.time,
          status: b.status,
          customerName: b.customer_name,
          customerEmail: b.customer_email,
        }));
        setBookings(mapped);
      }
      setLoading(false);
    };

    fetchBookings();

    try {
      const savedCustomer = localStorage.getItem('salonmate_customer');
      if (savedCustomer) setCustomerUser(JSON.parse(savedCustomer));
      const savedBarber = localStorage.getItem('salonmate_barber');
      if (savedBarber) setBarberUser(JSON.parse(savedBarber));
    } catch (e) {
      console.error('Storage error', e);
    }
  }, []);

  const saveBookingsToStorage = async (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('salonmate_bookings', JSON.stringify(newBookings));
    const latest = newBookings[0];
    if (latest) {
      await supabase.from('bookings').upsert({
        id: latest.id,
        customer_name: latest.customerName,
        customer_email: latest.customerEmail,
        salon_name: latest.salonName,
        service_name: latest.serviceName,
        price: latest.price,
        date: latest.date,
        time: latest.time,
        status: latest.status,
      });
    }
  };

  const saveSalonsToStorage = (newSalons: Salon[]) => {
    setSalons(newSalons);
    localStorage.setItem('salonmate_salons', JSON.stringify(newSalons));
  };

  const handleSelectRole = (selectedRole: Role) => {
    setRole(selectedRole);
    setScreen('login');
  };

  const handleLoginSuccess = async (email: string, name: string) => {
    const { data: existingUser } = await supabase
      .from('users')
      .select('name')
      .eq('email', email)
      .single();

    if (!existingUser) {
      await supabase.from('users').insert({ id: crypto.randomUUID(), name, email, role });
    }

    if (role === 'customer') {
      const savedName = existingUser?.name || name;
      const profile = { name: savedName, email };
      setCustomerUser(profile);
      localStorage.setItem('salonmate_customer', JSON.stringify(profile));
      setScreen('customer-home');
      setActiveTab('home');
    } else {
      const savedName = existingUser?.name || name;
      const profile = { name: savedName, email };
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
      id: crypto.randomUUID(),
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

  const handleCancelBookingByCustomer = async (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: 'cancelled' as const } : b);
    setBookings(updated);
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
  };

  const handleAcceptBookingByBarber = async (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: 'accepted' as const } : b);
    setBookings(updated);
    await supabase.from('bookings').update({ status: 'accepted' }).eq('id', id);
  };

  const handleCancelBookingByBarber = async (id: string) => {
    const updated = bookings.map((b) => b.id === id ? { ...b, status: 'cancelled' as const } : b);
    setBookings(updated);
    await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', id);
  };

  const handleAddSalonService = (name: string, price: number) => {
    const updatedSalons = salons.map((salon) => {
      if (salon.id === 'salon-1') {
        const newService: Service = { id: `srv-${Date.now()}`, name, price };
        return { ...salon, services: [...salon.services, newService] };
      }
      return salon;
    });
    saveSalonsToStorage(updatedSalons);
  };

  const handleRemoveSalonService = (serviceId: string) => {
    const updatedSalons = salons.map((salon) => {
      if (salon.id === 'salon-1') {
        return { ...salon, services: salon.services.filter((s) => s.id !== serviceId) };
      }
      return salon;
    });
    saveSalonsToStorage(updatedSalons);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    setScreen('role-selection');
  };

  const handleNavigateTab = (tab: 'home' | 'bookings' | 'profile') => {
    setActiveTab(tab);
    if (role === 'customer') {
      if (tab === 'home') setScreen('customer-home');
      else if (tab === 'bookings') setScreen('customer-bookings');
      else if (tab === 'profile') setScreen('customer-profile');
    } else {
      if (tab === 'home') setScreen('barber-home');
      else if (tab === 'bookings') setScreen('barber-bookings');
      else if (tab === 'profile') setScreen('barber-profile');
    }
  };

  const activeCustomerPendingCount = bookings.filter(
    (b) => b.customerEmail === customerUser.email && b.status === 'accepted'
  ).length;

  if (loading) return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-[#000000] min-h-screen text-white select-none selection:bg-gold/30 selection:text-white font-sans overflow-x-hidden antialiased">
      <AnimatePresence mode="wait">

        {screen === 'splash' && (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <SplashView onNext={() => setScreen('role-selection')} />
          </motion.div>
        )}

        {screen === 'role-selection' && (
          <motion.div key="role-selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <RoleSelectionView onSelectRole={handleSelectRole} />
          </motion.div>
        )}

        {screen === 'login' && (
          <motion.div key="login" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.4 }}>
            <LoginView role={role} onBack={() => setScreen('role-selection')} onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        )}

        {screen === 'customer-home' && activeTab === 'home' && (
          <motion.div key="customer-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <CustomerHomeView salons={salons} onSelectSalon={handleSelectSalon} onNavigateTab={handleNavigateTab} activeTab={activeTab} userName={customerUser.name} />
          </motion.div>
        )}

        {screen === 'salon-details' && (
          <motion.div key="salon-details" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <SalonDetailsView salon={selectedSalon} onBack={() => setScreen('customer-home')} onBookNow={handleBookNow} />
          </motion.div>
        )}

        {screen === 'booking' && (
          <motion.div key="booking" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <BookingView salon={selectedSalon} service={selectedService} onBack={() => setScreen('salon-details')} onConfirmBooking={handleConfirmBookingSlot} />
          </motion.div>
        )}

        {screen === 'booking-confirmation' && (
          <motion.div key="booking-confirmation" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <BookingConfirmationView salon={selectedSalon} service={selectedService} date={latestBookingDetails?.date || '13 Sat'} time={latestBookingDetails?.time || '9:00AM'} onGoHome={() => { setScreen('customer-home'); setActiveTab('home'); }} onViewBookings={() => { setActiveTab('bookings'); }} />
          </motion.div>
        )}

        {role === 'customer' && activeTab === 'bookings' && (
          <motion.div key="customer-bookings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <CustomerBookingsView bookings={bookings.filter((b) => b.customerEmail === customerUser.email)} onCancelBooking={handleCancelBookingByCustomer} />
          </motion.div>
        )}

        {role === 'customer' && activeTab === 'profile' && (
          <motion.div key="customer-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <CustomerProfileView userName={customerUser.name} userEmail={customerUser.email} onNavigateTab={handleNavigateTab} onUpdateName={async (name) => { const updated = { ...customerUser, name }; setCustomerUser(updated); localStorage.setItem('salonmate_customer', JSON.stringify(updated)); await supabase.from('users').update({ name }).eq('email', customerUser.email); }} onLogout={handleLogout} notificationCount={activeCustomerPendingCount} />
          </motion.div>
        )}

        {screen === 'barber-home' && activeTab === 'home' && (
          <motion.div key="barber-home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <BarberHomeView bookings={bookings} onAcceptBooking={handleAcceptBookingByBarber} onCancelBooking={handleCancelBookingByBarber} barberName={barberUser.name} />
          </motion.div>
        )}

        {role === 'barber' && activeTab === 'bookings' && (
          <motion.div key="barber-bookings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <BarberBookingsView bookings={bookings} onAcceptBooking={handleAcceptBookingByBarber} onCancelBooking={handleCancelBookingByBarber} />
          </motion.div>
        )}

        {role === 'barber' && activeTab === 'profile' && (
          <motion.div key="barber-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <BarberProfileView barberName={barberUser.name} barberEmail={barberUser.email} onUpdateName={async (name) => { const updated = { ...barberUser, name }; setBarberUser(updated); localStorage.setItem('salonmate_barber', JSON.stringify(updated)); await supabase.from('users').update({ name }).eq('email', barberUser.email); }} onLogout={handleLogout} onNavigateTab={handleNavigateTab} services={salons.find((s) => s.id === 'salon-1')?.services || []} onAddService={handleAddSalonService} onRemoveService={handleRemoveSalonService} />
          </motion.div>
        )}

      </AnimatePresence>

      {screen !== 'splash' && screen !== 'role-selection' && screen !== 'login' && screen !== 'booking' && screen !== 'booking-confirmation' && screen !== 'salon-details' && (
        <BottomNav activeTab={activeTab} onChangeTab={handleNavigateTab} />
      )}
    </div>
  );
}