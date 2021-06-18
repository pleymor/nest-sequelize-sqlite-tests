import { IsNotEmpty } from 'class-validator';

export class FindHeroDto {
  @IsNotEmpty()
  universe: string;
}
