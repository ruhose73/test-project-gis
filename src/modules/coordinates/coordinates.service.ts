import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoordinatesService {
  constructor(
    private readonly geozoneService: CoordinatesService,
  ) {}


}
