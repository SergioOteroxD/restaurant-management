import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ExceptionManager } from './adapter/lib/exceptions-manager.filter';
import rTracer = require('cls-rtracer');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  //Configuración libreria para validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );

  //Configuración libreria para generación de indentificador de solicitud
  app.use(rTracer.expressMiddleware());
  //Configuración de filter para el manejo de excepciones
  app.useGlobalFilters(new ExceptionManager());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const module = configService.get('MODULE');
  app.setGlobalPrefix(module);

  const PORT = configService.get<number>('PORT');
  await app.listen(PORT, async () =>
    Logger.log(
      'INFO',
      `Application is running on: port: ${await app.getUrl()})`,
      'main',
    ),
  );
}
bootstrap();
