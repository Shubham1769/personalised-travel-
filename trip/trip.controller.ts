import { RestServer } from '@/boat';
import { Dto, Validate } from '@/boat/validator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request, Response, RestController } from '@/boat';
import { CreateTripDto } from './dto/createTrip.dto';
import { TripService } from './trip.service';
import { JwtAuthGuard } from '@/auth/guards/jwt.auth.guard';

@Controller('trips')
@UseGuards(JwtAuthGuard)
export class TripController extends RestServer {
  constructor(private readonly tripService: TripService) {
    super();
  }

  @Post('')
  @Validate(CreateTripDto)
  async createTrip(
    @Req() req: Request,
    @Res() res: Response,
    @Dto() inputs: CreateTripDto,
  ) {
    const result = await this.tripService.createTrip(inputs, req.user);
    return res.success(result);
  }

  @Get('')
  async getTrips(@Req() req: Request, @Res() res: Response) {
    const result = await this.tripService.getTrips(req.user);
    return res.success(result);
  }
}
