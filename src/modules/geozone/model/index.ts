import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Polygon,
} from 'typeorm';
import { GEOZONE_TABLE_NAME } from '../constants';

@Entity(GEOZONE_TABLE_NAME)
export class Geozone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  title: string;

  @Column('geometry', {
    spatialFeatureType: 'Polygon',
    srid: 4326,
  })
  polygon: Polygon;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
