package com.socompany.postservice.repository;

import com.socompany.postservice.model.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {

    List<Comment> findAllCommentsByPostId(String id);

}
