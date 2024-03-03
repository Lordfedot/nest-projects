import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Password must contain only letters and numbers' })
  @MinLength(4, { message: 'Password is too short.' })
  @MaxLength(32, { message: 'Password is too long.' })
  password: string;
}

