import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv"
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; 
dotenv.config()

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT}`)
  });
}
bootstrap();
