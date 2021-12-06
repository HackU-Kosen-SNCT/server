import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  // swagger
  const options = new DocumentBuilder()
    .setTitle('api document')
    .setDescription('API仕様書だよ~')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('document', app, document);

  // config
  const configService = new ConfigService();
  const sync = configService.get('DB_SYNC');
  console.log(`TypeORM synchronize is [ ${sync} ]`);

  await app.listen(3001);
}
bootstrap();
