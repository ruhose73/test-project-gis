import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({ credentials: true, origin: true });
  app.setGlobalPrefix('api/gis');
  app.useGlobalPipes(new ValidationPipe());
  if (configService.get('config.nodeEnv') !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(`Сервис геофенсинга`)
      .setDescription(`Документация API`)
      .setVersion(`1.0.0`)
      .addServer(`${configService.get('config.server.api')}`)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);
  }
  await app.listen(configService.get('config.server.port'), () => {
    console.log(`BASE URL: ${configService.get('config.server.api')}`);
    console.log(`PORT: ${configService.get('config.server.port')}`);
  });
}
bootstrap();