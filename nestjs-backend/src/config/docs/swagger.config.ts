import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { COOKIES_ACCESS_TOKEN } from "src/common/constant/cookies.key.constant";

export class SwaggerConfig {

    static config(app) {
        if (process.env.NODE_ENV === 'production') {
            return;
        }

        const config = new DocumentBuilder()
            .setTitle('GrabMatch API')
            .setDescription('GrabMatch API for managing GrabMatch data')
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup('docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
            }
        });
    }
}