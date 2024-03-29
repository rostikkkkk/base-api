import {
  Body,
  Injectable,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { GetPostsDto } from './dto/get-posts.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly categoriesService: CategoriesService,
  ) {}
  getAllPosts(@Query() getPostsDto: GetPostsDto): Promise<PostEntity[]> {
    return this.postRepository.getPosts(getPostsDto);
  }
  async getPostById(@Param('id') id: string): Promise<PostEntity[]> {
    const post = await this.postRepository.find({
      where: { id },
      relations: ['category'],
    });
    if (!post.length) {
      throw new NotFoundException(`Post not found!`);
    }
    return post;
  }

  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    const newPost = this.postRepository.create(createPostDto);
    const category = await this.categoriesService.getCategoryById(
      createPostDto.categoryId,
    );
    newPost.category = category[0];
    return this.postRepository.save(newPost);
  }
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    const oldPost = await this.getPostById(id);

    if (!oldPost.length) {
      throw new NotFoundException(`Post with id:${id} not found!`);
    }

    const editedPost = { ...oldPost[0], ...updatePostDto };
    return await this.postRepository.save(editedPost);
  }

  async deletePost(@Param('id') id: string): Promise<void> {
    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Post with id: ${id} not exist!`);
    }
  }
}
