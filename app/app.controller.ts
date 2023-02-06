import { Request, Response, RestController } from '@/boat';
import { Dto, Validate } from '@/boat/validator';
import { UserTransformer } from '@/users/transformers/userTransformer';
import { CreateUserDto } from '@/users/vaidators/createUserrDto';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController extends RestController {
  constructor(private readonly appService: AppService) {
    super();
  }

  @Get('health-check')
  async healthCheck(@Req() req: Request, @Res() res: Response) {
    return res.success('Server is Running!');
  }
}
