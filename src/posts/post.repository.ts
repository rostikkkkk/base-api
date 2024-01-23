import { DataSource, Repository } from 'typeorm';
import { Post } from './post.entity';
import { Injectable } from '@nestjs/common';
import { GetPostsDto } from './dto/get-posts.dto';
@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private datasource: DataSource) {
    super(Post, datasource.createEntityManager());
  }

  getPosts(getPostsDto: GetPostsDto): Promise<Post[]> {
    const { status, title } = getPostsDto;

    const query = this.createQueryBuilder('post');

    if (status) {
      query.andWhere('post.status = :status', { status });
    }

    if (title) {
      query.andWhere('post.title = :title', { title });
    }

    return query.getMany();
  }
}
