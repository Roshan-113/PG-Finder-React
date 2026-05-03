// Redirect to tenant payment page with booking state
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BookingPayment() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Forward to tenant payment page
    navigate('/tenant/payment', { state: location.state, replace: true });
  }, []);

  return null;
}
