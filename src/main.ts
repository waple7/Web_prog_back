import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as hbs from 'express-handlebars';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('World Nasanmi')
    .setDescription('Boost game accounts')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partials'),
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 2000);
  await app.listen(port);
}
bootstrap();
