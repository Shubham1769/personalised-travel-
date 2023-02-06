import { JwtAuthGuard } from '@/auth/guards/jwt.auth.guard';
import { Request, Response } from '@/boat';
import { Dto, Validate } from '@/boat/validator';
import { UserLocation } from '@/domain/user-location';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserLocationDto } from './dto/user-location.dto';
import { LocationService } from './location.service';
@Controller('location')
@UseGuards(JwtAuthGuard)
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post('/track-user-location')
  @Validate(UserLocationDto)
  async createLocation(
    @Req() req: Request,
    @Res() res: Response,
    @Dto() inputs: UserLocationDto,
  ) {
    const result = await this.locationService.create(inputs, req.user.uuid);
    res.success(result);
  }

  @Get('/nearby-users')
  async getNearbyUsers(@Req() req: Request, @Res() res: Response) {
    const result = await this.locationService.getNearbyUsers(req.user);
    res.success(result);
  }
}
