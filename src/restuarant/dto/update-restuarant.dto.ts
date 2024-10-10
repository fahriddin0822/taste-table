import { PartialType } from '@nestjs/swagger';
import { CreateRestuarantDto } from './create-restuarant.dto';

export class UpdateRestuarantDto extends PartialType(CreateRestuarantDto) {}
