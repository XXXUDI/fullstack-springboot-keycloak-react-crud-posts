package com.socompany.postservice.controller;

import com.socompany.postservice.model.dto.CommentDto;
import com.socompany.postservice.model.dto.PostDto;
import com.socompany.postservice.service.CommentService;
import com.socompany.postservice.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final CommentService commentService;
    public PostController(PostService postService, CommentService commentService) {
        this.postService = postService;
        this.commentService = commentService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable String id) {
        log.info("Received request to get post by id {}", id);

        var postDto = postService.getPostById(id).orElseThrow(
                () -> new IllegalArgumentException("Post with id " + id + " not found")
        );

        log.info("Post with id {} found: {}", id, postDto);

        return ResponseEntity.ok(postDto);
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        log.info("Received request to get all posts");
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @PostMapping("/create")
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto) {
        log.info("Received request to create post {}", postDto);
        return ResponseEntity.ok(postService.createPost(postDto));
    }

    @PostMapping("/comment/{id}")
    public ResponseEntity<PostDto> addComment(@PathVariable String id, @RequestBody CommentDto commentDto) {
        log.info("Received request to add comment {}", commentDto);

        commentDto.setPostId(id);
        commentService.saveComment(commentDto);

        var updatedPost = postService.getPostById(id)
                .orElseThrow(() -> new IllegalStateException("Unexpected error"));

        log.info("Post with id {} updated: {}", id, updatedPost);
        return ResponseEntity.ok(updatedPost);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable String id, @RequestBody PostDto postDto) {
        log.info("Received request to update post with id: {}", id);
        return ResponseEntity.ok(postService.updatePost(id, postDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePost(@PathVariable String id) {
        log.info("Received request to delete post with id: {}", id);
        if(postService.deletePostById(id)) {
            return ResponseEntity.ok("Post with id " + id + " deleted");
        } else  {
            return ResponseEntity.badRequest().body("Post with id " + id + " not found");
        }
    }

}
