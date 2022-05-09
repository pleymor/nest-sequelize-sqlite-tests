import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FindHeroDto {
  @IsNotEmpty()
  universe: string;
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  withCape?: string;
}
