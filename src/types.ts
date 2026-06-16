export type Role = 'customer' | 'barber';

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface Salon {
  id: string;
  name: string;
  rating: number;
  distance: string;
  image: string;
  services: Service[];
  workingHours: string;
}

export interface Booking {
  id: string;
  salonId: string;
  salonName: string;
  serviceId: string;
  serviceName: string;
  price: number;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'cancelled';
  customerName: string;
  customerEmail: string;
}

export type Screen =
  | 'splash'
  | 'role-selection'
  | 'login'
  | 'customer-home'
  | 'salon-details'
  | 'booking'
  | 'booking-confirmation'
  | 'customer-profile'
  | 'barber-home'
  | 'barber-bookings'
  | 'barber-profile';
