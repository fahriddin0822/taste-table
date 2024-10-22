import { Module } from '@nestjs/common';
import { AdminsModule } from './admins/admins.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './restaurant/restaurant.module';
import { TablesModule } from './tables/tables.module';
import { Restaurant } from './restaurant/schemas/restaurant.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AdminsModule,
    RestaurantModule,
    TablesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
