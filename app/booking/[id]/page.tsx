'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EmptyFillButton from '../../_components/EmptyFillButton';
import axios from 'axios';
import {useRouter} from 'next/navigation'
import toast from 'react-hot-toast'

interface Booking {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  guests: number;
  startTime: number;
  endTime:number;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export default function BookingConfirmationPage() {
  const params = useParams();
  const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  useEffect(() => {
    async function getBookingDetails() {
      try {
        const { id } = params;
        const res = await axios.get(`${BACKEND_URL}/booking/${id}`);
        setBookingDetails(res.data.booking);
      } catch (err) {
        setError('Unable to load booking details. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    getBookingDetails();
  }, [params]);

  async function handleCancel() {
    try {
      const { id } = params;
      const res = await axios.delete(`${BACKEND_URL}/booking/${id}`);
      if (res) {
        toast.success(res.data.message);
        router.replace('/')
      }
    } catch (err) {
      console.log(err)
      alert('Failed to cancel the booking. Please try again later.');
    }
  }

  if (loading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading booking details...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex justify-center items-center h-screen text-red-500">
        <div className="text-xl font-semibold">{error}</div>
      </main>
    );
  }

  if (!bookingDetails) return null;

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">
          Booking Confirmed!
        </h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Booking Id:</span> {bookingDetails._id}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Name:</span> {bookingDetails.name}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Email:</span> {bookingDetails.email}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Mobile:</span> {bookingDetails.mobile}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Guests:</span> {bookingDetails.guests}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Date:</span>{' '}
          {new Date(bookingDetails.startTime).toDateString()}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Time:</span>{' '}
          {`${new Date(bookingDetails.startTime).toLocaleTimeString()}-${new Date(bookingDetails.endTime).toLocaleTimeString()}`}
        </p>
        <div className="mt-6 text-center">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Print Confirmation
          </button>
        </div>
        <div className="mt-6 text-center">
          <EmptyFillButton onClick={handleCancel}>Cancel Booking</EmptyFillButton>
        </div>
      </div>
    </main>
  );
}
