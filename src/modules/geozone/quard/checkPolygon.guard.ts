import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
import { GeozoneService } from '../geozone.service';
  
  @Injectable()
  export class CheckPolygonGuard implements CanActivate {
    constructor(private geozoneService:  GeozoneService ) {}
    async canActivate(
      context: ExecutionContext,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
      const { title } = req.body;
      const polygon = await this.geozoneService.checkPolygon(title);
      if (polygon.length !== 0) {
        throw new BadRequestException(`Полигон с названием '${title}' уже существует`);
      }
      return true;
    }
  }