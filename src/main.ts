import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started. PORT: ${PORT}`));
}
bootstrap();
