import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { CategoriesModule } from '../categories/categories.module';
@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoriesModule],
  controllers: [PostsController],
  providers: [PostsService, PostRepository],
})
export class PostsModule {}
