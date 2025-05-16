import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres', // Please change this according to your pgAdmin4 password
  database: 'hldcase1_db',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  synchronize: false, // Set to false in production
  migrationsRun: true, // This will run migrations automatically
};

// For running migrations from CLI
export default new DataSource({
  ...typeOrmConfig as any,
  migrationsTableName: 'migrations_history',
}); 