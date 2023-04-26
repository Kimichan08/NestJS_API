import {ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    async register(account: AuthDTO): Promise<User>{
        const hashedPassword = await argon.hash(account.password)

        account.password = hashedPassword.toString();
        
        return await this.userRepository.save(account);
    }

    async login(account:AuthDTO){
        const user = await this.userRepository.findOne({
            where:{username:account.username}
        })

        if (!user) {
            throw new ForbiddenException('User not found')
        } 

        const passwordMatched = await argon.verify(
            user.password,// ma hoa truoc
            account.password // nhap mat khau sau
        )

        if (!passwordMatched) {
            throw new ForbiddenException('Incorrect password')
        }
        delete user.password;
        return await this.signJwtToken(user.id, user.username)
    }

    async signJwtToken(userId: number, username: string): Promise<{accessToken: string}>{
        const payload = {
            sub: userId,
            username
        }

        const jwtString = await this.jwtService.signAsync(payload,{
            expiresIn: '10m',
            secret: this.configService.get('JWT_SECRET')
        })

        return{
            accessToken: jwtString,
        }
    }
}
