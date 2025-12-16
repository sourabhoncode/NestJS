/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Get,
    Patch,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { RateBookingDto } from './dto/rate-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { RoleRequired } from '../common/decorators/role.decorator';
import { Role } from '../common/role.enum';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
    constructor(private bookingService: BookingService) { }

    /**
     * USER: Create a new booking (Status: pending)
     * POST /bookings/create
     */
    @Post('create')
    @RoleRequired(Role.USER)
    async createBooking(
        @Request() req,
        @Body() createBookingDto: CreateBookingDto,
    ) {
        return await this.bookingService.createBooking(req.user.id, createBookingDto);
    }

    /**
     * USER: Get all their bookings with status
     * GET /bookings/my-bookings
     */
    @Get('my-bookings')
    @RoleRequired(Role.USER)
    async getUserBookings(@Request() req) {
        return await this.bookingService.getUserBookings(req.user.id);
    }

    /**
     * USER: Get their pending bookings
     * GET /bookings/my-bookings/pending
     */
    @Get('my-bookings/pending')
    @RoleRequired(Role.USER)
    async getUserPendingBookings(@Request() req) {
        return await this.bookingService.getUserPendingBookings(req.user.id);
    }

    /**
     * USER: Get specific booking details
     * GET /bookings/:bookingId
     */
    @Get(':bookingId')
    @RoleRequired(Role.USER)
    async getBookingById(@Param('bookingId') bookingId: string) {
        return await this.bookingService.getBookingById(bookingId);
    }

    /**
     * USER: Cancel their booking
     * PATCH /bookings/:bookingId/cancel
     */
    @Patch(':bookingId/cancel')
    @RoleRequired(Role.USER)
    async cancelBooking(@Param('bookingId') bookingId: string) {
        return await this.bookingService.cancelBooking(bookingId);
    }

    /**
     * USER: Rate completed booking
     * POST /bookings/:bookingId/rate
     */
    @Post(':bookingId/rate')
    @RoleRequired(Role.USER)
    async rateBooking(
        @Param('bookingId') bookingId: string,
        @Body() rateBookingDto: RateBookingDto,
    ) {
        return await this.bookingService.rateBooking(bookingId, rateBookingDto);
    }

    /**
     * DRIVER: Get all pending bookings (available for drivers)
     * GET /bookings/pending-list
     */
    @Get('pending/list')
    @RoleRequired(Role.DRIVER)
    async getPendingBookings() {
        return await this.bookingService.getPendingBookings();
    }

    /**
     * DRIVER: Accept a pending booking - changes status to "accepted"
     * POST /bookings/:bookingId/accept
     */
    @Post(':bookingId/accept')
    @RoleRequired(Role.DRIVER)
    async acceptBooking(
        @Param('bookingId') bookingId: string,
        @Request() req,
        @Body() body: { vehicleId: string },
    ) {
        return await this.bookingService.acceptBooking(bookingId, req.user.id, body.vehicleId);
    }

    /**
     * DRIVER: Start the ride
     * PATCH /bookings/:bookingId/start
     */
    @Patch(':bookingId/start')
    @RoleRequired(Role.DRIVER)
    async startRide(@Param('bookingId') bookingId: string) {
        return await this.bookingService.startRide(bookingId);
    }

    /**
     * DRIVER: Complete the ride
     * PATCH /bookings/:bookingId/complete
     */
    @Patch(':bookingId/complete')
    @RoleRequired(Role.DRIVER)
    async completeRide(@Param('bookingId') bookingId: string) {
        return await this.bookingService.completeRide(bookingId);
    }

    /**
     * DRIVER: Get their accepted/completed bookings
     * GET /bookings/driver/my-bookings
     */
    @Get('driver/my-bookings')
    @RoleRequired(Role.DRIVER)
    async getDriverBookings(@Request() req) {
        return await this.bookingService.getBookingsByDriver(req.user.id);
    }
}
