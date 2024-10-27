
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  migrationsRun: true,
  legacySpatialSupport: false,
  name: 'default',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
