import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1');

    const config = new DocumentBuilder()
        .setTitle('Blog Welbex')
        .setDescription('Api Doc')
        .setVersion('1.0.0')
        .addTag('Magomed')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started. PORT: ${PORT}`));
}
bootstrap();
