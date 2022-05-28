import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media, MediaDocument } from './media.schema';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
    private cloudinary: CloudinaryService,
  ) {}

  async create(createMediaDto: CreateMediaDto, file: Express.Multer.File) {
    try {
      const uploadedFile = await this.cloudinary.uploadImage(file);
      console.log(uploadedFile);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('invalid file type', error);
    }
    //const createdMedia = new this.mediaModel(createMediaDto);
    //return createdMedia.save();
  }

  findAll() {
    return this.mediaModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} media`;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
