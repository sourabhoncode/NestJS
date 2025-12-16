/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { RateBookingDto } from './dto/rate-booking.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    ) { }

    /**
     * Create a new booking by user (Initial status: pending)
     */
    async createBooking(userId: string, createBookingDto: CreateBookingDto) {
        try {
            const booking = new this.bookingModel({
                ...createBookingDto,
                userId,
                status: 'pending',
                timestamp: new Date(),
                passenger: {
                    id: userId,
                    details: {
                        name: createBookingDto.userInfo.name,
                        phone: createBookingDto.userInfo.phone,
                    },
                },
            });

            return await booking.save();
        } catch (error) {
            throw new BadRequestException('Failed to create booking: ' + error.message);
        }
    }

    /**
     * Get all pending bookings for drivers to view
     */
    async getPendingBookings() {
        try {
            return await this.bookingModel
                .find({ status: 'pending' })
                .sort({ timestamp: -1 })
                .exec();
        } catch (error) {
            throw new BadRequestException('Failed to fetch pending bookings: ' + error.message);
        }
    }

    /**
     * Get user's bookings with status
     */
    async getUserBookings(userId: string) {
        try {
            return await this.bookingModel
                .find({ userId })
                .sort({ timestamp: -1 })
                .exec();
        } catch (error) {
            throw new BadRequestException('Failed to fetch user bookings: ' + error.message);
        }
    }

    /**
     * Get user's pending bookings only
     */
    async getUserPendingBookings(userId: string) {
        try {
            return await this.bookingModel
                .find({ userId, status: 'pending' })
                .exec();
        } catch (error) {
            throw new BadRequestException('Failed to fetch pending bookings: ' + error.message);
        }
    }

    /**
     * Get booking by ID
     */
    async getBookingById(bookingId: string) {
        try {
            const booking = await this.bookingModel.findById(bookingId).exec();
            if (!booking) {
                throw new NotFoundException('Booking not found');
            }
            return booking;
        } catch (error) {
            throw new BadRequestException('Failed to fetch booking: ' + error.message);
        }
    }

    /**
     * Driver accepts booking - changes status from pending to accepted
     */
    async acceptBooking(bookingId: string, driverId: string, vehicleId: string) {
        try {
            const booking = await this.bookingModel.findById(bookingId).exec();
            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            if (booking.status !== 'PENDING') {
                throw new BadRequestException('Booking is not in PENDING status');
            }

            booking.status = 'ACCEPTED';
            booking.driverId = driverId as any;
            booking.vehicleId = vehicleId as any;

            return await booking.save();
        } catch (error) {
            throw new BadRequestException('Failed to accept booking: ' + error.message);
        }
    }

    /**
     * Start ride - changes status to in-progress
     */
    async startRide(bookingId: string) {
        try {
            const booking = await this.bookingModel.findById(bookingId).exec();
            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            if (booking.status !== 'ACCEPTED') {
                throw new BadRequestException('Booking must be ACCEPTED before starting ride');
            }

            booking.status = 'IN_PROGRESS';
            booking.startTime = new Date();
            return await booking.save();
        } catch (error) {
            throw new BadRequestException('Failed to start ride: ' + error.message);
        }
    }

    /**
     * Complete ride - changes status to completed
     */
    async completeRide(bookingId: string) {
        try {
            const booking = await this.bookingModel.findById(bookingId).exec();
            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            if (booking.status !== 'IN_PROGRESS') {
                throw new BadRequestException('Ride must be IN_PROGRESS to complete');
            }

            booking.status = 'COMPLETED';
            booking.endTime = new Date();
            booking.isCompleted = true;
            return await booking.save();
        } catch (error) {
            throw new BadRequestException('Failed to complete ride: ' + error.message);
        }
    }

    /**
     * Cancel booking
     */
    async cancelBooking(bookingId: string) {
        try {
            const booking = await this.bookingModel.findById(bookingId).exec();
            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            if (booking.status === 'COMPLETED' || booking.status === 'CANCELLED') {
                throw new BadRequestException('Cannot cancel COMPLETED or already CANCELLED booking');
            }

            booking.status = 'CANCELLED';
            return await booking.save();
        } catch (error) {
            throw new BadRequestException('Failed to cancel booking: ' + error.message);
        }
    }

    /**
     * Rate booking and provide feedback
     */
    async rateBooking(bookingId: string, rateBookingDto: RateBookingDto) {
        try {
            const booking = await this.bookingModel.findById(bookingId).exec();
            if (!booking) {
                throw new NotFoundException('Booking not found');
            }

            if (booking.status !== 'COMPLETED') {
                throw new BadRequestException('Can only rate COMPLETED bookings');
            }

            booking.userRating = rateBookingDto.rating;
            booking.userReview = rateBookingDto.comment;

            return await booking.save();
        } catch (error) {
            throw new BadRequestException('Failed to rate booking: ' + error.message);
        }
    }

    /**
     * Get bookings by driver
     */
    async getBookingsByDriver(driverId: string) {
        try {
            return await this.bookingModel
                .find({ 'driver.id': driverId })
                .sort({ timestamp: -1 })
                .exec();
        } catch (error) {
            throw new BadRequestException('Failed to fetch driver bookings: ' + error.message);
        }
    }
}
