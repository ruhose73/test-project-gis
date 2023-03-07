import { Controller, Get } from '@nestjs/common';
import { CoordinatesService } from './coordinates.service';

@Controller()
export class CoordinatesController {
  constructor(private readonly geozoneService: CoordinatesService) {}
}
