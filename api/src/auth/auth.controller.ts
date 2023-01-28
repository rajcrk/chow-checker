import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/models/create-user.dto';
import { ExistingUserDto } from 'src/user/models/existing-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/register')
    @ApiOperation({ summary: 'register a user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully registered.',
    })
    register(@Body() user: CreateUserDto): Promise<UserDetails | null> {
        return this.authService.register(user);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'login as user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully logged in.',
    })
    login(@Body() user: ExistingUserDto): Promise<{ token: string } | null> {
        return this.authService.login(user);
    }

    @Post('/verify-jwt')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'login as user' })
    @ApiResponse({
        status: 201,
        description: 'The user has been successfully logged in.',
    })
    verifyJwt(@Body() payload: { jwt: string }) {
        return this.authService.verifyJwt(payload.jwt);
    }
}
