import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
  .setTitle('Shofree API')
  .setVersion('3.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3001);
}
bootstrap();
