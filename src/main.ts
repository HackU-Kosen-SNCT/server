import { NestApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const options: NestApplicationOptions = {
    bodyParser: false,
  };
  const app = await NestFactory.create(AppModule, options);

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  // config
  const configService = new ConfigService();
  const sync = configService.get('DB_SYNC');
  console.log(`TypeORM synchronize is [ ${sync} ]`);

  if (sync !== 'false') {
    // swagger
    const swaggerOptions = new DocumentBuilder()
      .setTitle('api document')
      .setDescription('API仕様書')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('document', app, document);
  }

  await app.listen(3001);
}
bootstrap();
