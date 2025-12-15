/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../../schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { RateBookingDto } from './dto/rate-booking.dto';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    ) { }

    async createBooking(driverId: string, createBookingDto: CreateBookingDto) {
        const booking = new this.bookingModel({
            ...createBookingDto,
            driverId,
        });
        return booking
            .save()
            .then((b) =>
                b.populate([
                    { path: 'driverId', select: '-password' },
                    { path: 'vehicleId' },
                    { path: 'userId', select: '-password' },
                ]),
            );
    }

    async getDriverBookings(driverId: string) {
        return this.bookingModel
            .find({ driverId })
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ])
            .sort({ bookingTime: -1 });
    }

    async getBookingById(bookingId: string) {
        return this.bookingModel.findById(bookingId).populate([
            { path: 'driverId', select: '-password' },
            { path: 'vehicleId' },
            { path: 'userId', select: '-password' },
        ]);
    }

    async updateBooking(bookingId: string, updateBookingDto: UpdateBookingDto) {
        return this.bookingModel
            .findByIdAndUpdate(bookingId, { $set: updateBookingDto }, { new: true })
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ]);
    }

    async acceptBooking(bookingId: string) {
        return this.bookingModel
            .findByIdAndUpdate(
                bookingId,
                { $set: { status: 'ACCEPTED' } },
                { new: true },
            )
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ]);
    }

    async cancelBooking(bookingId: string, reason?: string) {
        return this.bookingModel
            .findByIdAndUpdate(
                bookingId,
                {
                    $set: {
                        status: 'CANCELLED',
                        driverNotes: reason || 'Cancelled by driver',
                    },
                },
                { new: true },
            )
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ]);
    }

    async startRide(bookingId: string) {
        return this.bookingModel
            .findByIdAndUpdate(
                bookingId,
                {
                    $set: {
                        status: 'IN_PROGRESS',
                        startTime: new Date(),
                    },
                },
                { new: true },
            )
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ]);
    }

    async completeRide(
        bookingId: string,
        actualDistance: number,
        actualFare: number,
    ) {
        return this.bookingModel
            .findByIdAndUpdate(
                bookingId,
                {
                    $set: {
                        status: 'COMPLETED',
                        endTime: new Date(),
                        actualDistance,
                        actualFare,
                        isCompleted: true,
                    },
                },
                { new: true },
            )
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ]);
    }

    async rateUser(bookingId: string, rateBookingDto: RateBookingDto) {
        return this.bookingModel
            .findByIdAndUpdate(
                bookingId,
                {
                    $set: {
                        userRating: rateBookingDto.rating,
                        userReview: rateBookingDto.review || '',
                    },
                },
                { new: true },
            )
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ]);
    }

    async getBookingsByVehicle(vehicleId: string) {
        return this.bookingModel
            .find({ vehicleId })
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ])
            .sort({ bookingTime: -1 });
    }

    async getCompletedBookings(driverId: string) {
        return this.bookingModel
            .find({ driverId, status: 'COMPLETED' })
            .populate([
                { path: 'driverId', select: '-password' },
                { path: 'vehicleId' },
                { path: 'userId', select: '-password' },
            ])
            .sort({ bookingTime: -1 });
    }
}
