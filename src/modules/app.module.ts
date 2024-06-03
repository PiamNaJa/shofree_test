import { Module } from '@nestjs/common';
import { AppController } from 'src/controllers/app.controller';
import { AppService } from 'src/services/app.service';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product.module';
import { JwtModule } from '@nestjs/jwt';
import { CartModule } from './cart.module';
import { Product } from 'src/entities/product.entity';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { UserModule } from './user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'shofree',
      entities: [Product, Cart, CartItem],
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'JRPw81y4hzBzpmaKythcKw==',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    ProductModule,
    CartModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
