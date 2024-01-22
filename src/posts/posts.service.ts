import {
  Body,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GetPostsDto } from './dto/get-posts.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as Posts } from './post.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(private postsRepository: PostRepository) {}
  @Get()
  getAllPosts(@Query() getPostsDto: GetPostsDto) {
    return this.postsRepository.find();
  }
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return `Post by id:${id} `;
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return 'CReate post';
  }
  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return 'Update';
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return 'Delete post';
  }
}
