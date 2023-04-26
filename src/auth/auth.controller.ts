import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { plainToClass } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() account: AuthDTO) {
    // const validatedAcc =  plainToClass(AuthDTO, account, {
    //   excludeExtraneousValues: true,
    // });

    return await this.authService.register(account);
  }

  @Post('login')
  async login(@Body() account: AuthDTO){
    return await this.authService.login(account);
  }
}
