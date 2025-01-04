'use client'

import 'react-datepicker/dist/react-datepicker.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Input from './Input'
import Button from './Button'
import BookingCalendar from './BookingCalendar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { addMinutes, roundToNearestMinutes } from 'date-fns'
import { useEffect, useState } from 'react'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export default function BookingForm() {
  const schema = yup.object({
    name: yup.string().trim().min(5).max(100).required(),
    email: yup.string().trim().email().required(),
    mobile: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Enter a valid mobile number')
      .min(10, 'Too short')
      .max(10, 'Too long'),
    guests: yup
      .number()
      .positive()
      .required('Number of guests is required')
      .typeError('Value must be a number'),
    startTime: yup.date().required('Start time is required'),
    endTime: yup
      .date()
      .required('End time is required')
      .min(
        yup.ref('startTime'),
        'End time must be at least 30 minutes after start time'
      ),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const router = useRouter()
  const startTime = watch('startTime')

  // State to store the initial rounded time
  const [initialTime] = useState(() =>
    roundToNearestMinutes(new Date(), { nearestTo: 30 })
  )

  useEffect(() => {
    // Set initial values for startTime and endTime
    setValue('startTime', initialTime)
    setValue('endTime', addMinutes(initialTime, 30))
  }, [initialTime, setValue])

  // Automatically update endTime to be 30 minutes ahead of startTime whenever startTime changes
  useEffect(() => {
    if (startTime) {
      setValue('endTime', addMinutes(startTime, 30))
    }
  }, [startTime, setValue])

  async function onSubmit(data: {
    message: string
    startTime: Date | number
    endTime: Date | number
  }) {
    try {
      data.startTime = data.startTime.getTime()
      data.endTime = data.endTime.getTime()

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking`,
        data
      )
      if (res) {
        toast.success(res.data.message)
        router.push(`/booking/${res.data.id}`)
      }
    } catch (error: { message: string }) {
      toast.error(error.message || 'Some error occurred')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid md:grid-cols-2 gap-10 p-10'
    >
      <section className='flex flex-col gap-6'>
        <Input
          name='name'
          type='text'
          placeholder='Enter your name'
          register={register}
          errors={errors.name}
          autoComplete='name'
          id='name'
        />
        <Input
          name='email'
          type='email'
          placeholder='Enter your email'
          register={register}
          errors={errors.email}
          autoComplete='email'
          id='email'
        />
        <Input
          name='mobile'
          type='tel'
          placeholder='Enter your mobile number'
          register={register}
          errors={errors.mobile}
          autoComplete='tel'
          id='mobile'
        />
        <Input
          name='guests'
          type='number'
          placeholder='Enter number of guests'
          register={register}
          errors={errors.guests}
          autoComplete='off'
          id='guests'
        />
      </section>
      <section className='flex flex-col gap-6'>
        {startTime && (
          <>
            <BookingCalendar
              dateAndTime={startTime}
              setDateAndTime={(date) => setValue('startTime', date)}
            />
            {errors.startTime && (
              <p className='text-red-500'>{errors.startTime.message}</p>
            )}
            <BookingCalendar
              dateAndTime={addMinutes(startTime, 30)}
              setDateAndTime={(date) => setValue('endTime', date)}
            />
            {errors.endTime && (
              <p className='text-red-500'>{errors.endTime.message}</p>
            )}
          </>
        )}
      </section>
      <section className='w-full text-center mt-6'>
        <Button type='submit'>Submit</Button>
      </section>
    </form>
  )
}
