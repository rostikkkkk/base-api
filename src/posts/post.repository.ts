import { DataSource, Repository } from 'typeorm';
import { Post } from './post.entity';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private datasource: DataSource) {
    super(Post, datasource.createEntityManager());
  }
}
