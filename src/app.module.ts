import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { RestuarantModule } from './restuarant/restuarant.module';
import { TablesModule } from './tables/tables.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MenuModule } from './menu/menu.module';
import { FoodsModule } from './foods/foods.module';
import { OrdersModule } from './orders/orders.module';
import { CategoryModule } from './category/category.module';
import { TranslationModule } from './translation/translation.module';
import { LanguagesModule } from './languages/languages.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    RestuarantModule,
    TablesModule,
    MenuModule,
    FoodsModule,
    FoodsModule,
    OrdersModule,
    CategoryModule,
    TranslationModule,
    LanguagesModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
