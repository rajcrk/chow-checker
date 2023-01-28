import { Body, Controller, NotFoundException, Post, Req, UseGuards, Get, Param } from '@nestjs/common';
import { ApiOAuth2, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './models/create-user.dto';
import { LoginUserDto } from './models/login-user.model';
import { UserDetails } from './user-details.interface';

import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {

    /**
     * Parameterized constructor.
     * 
     * @memberof UserController
     * @param {UserService} userService
     */
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService) {
    }

    @Get(':id')
    getUser(@Param('id') id: string): Promise<UserDetails | null> {
        return this.userService.findById(id);
    }
}