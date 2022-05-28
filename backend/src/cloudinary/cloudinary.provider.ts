import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigOptions, v2 } from 'cloudinary';
import configuration from 'src/config/configuration';

export const CloudinaryProvider = {
  import: ConfigModule.forRoot({ load: [configuration] }),
  provide: 'Cloudinary',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): ConfigOptions => {
    return v2.config({
      cloud_name: configService.get('storage.cloudinary.name'),
      api_key: configService.get('storage.cloudinary.key'),
      api_secret: configService.get('storage.cloudinary.secret'),
    });
  },
};
