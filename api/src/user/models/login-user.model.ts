import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Model class for user login data.
 */
export class LoginUserDto {

    @IsString()
    @ApiProperty()
    readonly username: string;

    @IsString()
    @ApiProperty()
    readonly password: string;
}