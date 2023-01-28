import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ExistingUserDto {

    @IsString()
    @ApiProperty()
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly password: string;
}