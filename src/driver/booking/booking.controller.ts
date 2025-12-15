import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { RateBookingDto } from './dto/rate-booking.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { RoleRequired } from '../../common/decorators/role.decorator';
import { Role } from '../../common/role.enum';

@Controller('drivers/bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
    constructor(private bookingService: BookingService) { }

    @Post()
    @RoleRequired(Role.DRIVER)
    createBooking(
        @Request() req,
        @Body() createBookingDto: CreateBookingDto,
    ) {
        return this.bookingService.createBooking(req.user.id, createBookingDto);
    }

    @Get()
    @RoleRequired(Role.DRIVER)
    getDriverBookings(@Request() req) {
        return this.bookingService.getDriverBookings(req.user.id);
    }

    @Get(':bookingId')
    @RoleRequired(Role.DRIVER)
    getBookingById(@Param('bookingId') bookingId: string) {
        return this.bookingService.getBookingById(bookingId);
    }

    @Patch(':bookingId')
    @RoleRequired(Role.DRIVER)
    updateBooking(
        @Param('bookingId') bookingId: string,
        @Body() updateBookingDto: UpdateBookingDto,
    ) {
        return this.bookingService.updateBooking(bookingId, updateBookingDto);
    }

    @Post(':bookingId/accept')
    @RoleRequired(Role.DRIVER)
    acceptBooking(@Param('bookingId') bookingId: string) {
        return this.bookingService.acceptBooking(bookingId);
    }

    @Post(':bookingId/cancel')
    @RoleRequired(Role.DRIVER)
    cancelBooking(
        @Param('bookingId') bookingId: string,
        @Body() body: { reason?: string },
    ) {
        return this.bookingService.cancelBooking(bookingId, body.reason);
    }

    @Post(':bookingId/start')
    @RoleRequired(Role.DRIVER)
    startRide(@Param('bookingId') bookingId: string) {
        return this.bookingService.startRide(bookingId);
    }

    @Post(':bookingId/complete')
    @RoleRequired(Role.DRIVER)
    completeRide(
        @Param('bookingId') bookingId: string,
        @Body() body: { actualDistance: number; actualFare: number },
    ) {
        return this.bookingService.completeRide(
            bookingId,
            body.actualDistance,
            body.actualFare,
        );
    }

    @Post(':bookingId/rate-user')
    @RoleRequired(Role.DRIVER)
    rateUser(
        @Param('bookingId') bookingId: string,
        @Body() rateBookingDto: RateBookingDto,
    ) {
        return this.bookingService.rateUser(bookingId, rateBookingDto);
    }

    @Get('vehicles/:vehicleId/bookings')
    @RoleRequired(Role.DRIVER)
    getBookingsByVehicle(@Param('vehicleId') vehicleId: string) {
        return this.bookingService.getBookingsByVehicle(vehicleId);
    }

    @Get('completed-bookings')
    @RoleRequired(Role.DRIVER)
    getCompletedBookings(@Request() req) {
        return this.bookingService.getCompletedBookings(req.user.id);
    }
}
