import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function ensureDatabase() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
  });

  const sql = readFileSync('src/sql/create-database.sql').toString();
  await connection.query(sql);
}

async function bootstrap() {
  await ensureDatabase();

  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
