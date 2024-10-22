import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();

async function start() {
  try {
    const PORT = process.env.PORT || 3030;

    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api');

    const config = new DocumentBuilder()
      .setTitle('StadiumFinder project')
      .setDescription('StadiumFinder project ReS API')
      .setVersion('1.0')
      .addTag(
        'NestJs,validation,swagger,guard,sequelise,pg,mailer,bot,sms,cookei',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document);
    await app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
