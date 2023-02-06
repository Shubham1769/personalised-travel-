import { Request, Response, RestController } from '@/boat';
import { Dto, Validate } from '@/boat/validator';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { MapquestService } from './mapquest.service';
import { GetPredictionsDto, GetRoutesDto } from './validators/googleMaps';

@Controller('locations')
export class MapquestController extends RestController {
  constructor(private service: MapquestService) {
    super();
  }

  @Get('predictions')
  @Validate(GetPredictionsDto)
  async getPredictions(
    @Req() req: Request,
    @Res() res: Response,
    @Dto() inputs: GetPredictionsDto,
  ) {
    const predictions = await this.service.getPlacesPredictions(inputs);
    return res.success(predictions);
  }

  @Get('routes')
  @Validate(GetRoutesDto)
  async getRoutes(
    @Req() req: Request,
    @Res() res: Response,
    @Dto() inputs: GetRoutesDto,
  ) {
    const predictions = await this.service.getRoutes(inputs);
    return res.success(predictions);
  }
}
