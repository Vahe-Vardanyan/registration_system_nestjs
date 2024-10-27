import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ApiKeyGuard } from './apkey.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new ApiKeyGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
    .setTitle('Rest API')
    .addApiKey(
      { type: 'apiKey', in: 'header', name: 'api-key' },
      'issuer-api-key',
    )
    .setDescription('Application User Interface')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST, DELETE, PATCH',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
