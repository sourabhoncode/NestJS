/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../schemas/booking.schema';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Booking.name, schema: BookingSchema },
        ]),
    ],
    providers: [BookingService],
    controllers: [BookingController],
    exports: [BookingService],
})
export class BookingModule { }
