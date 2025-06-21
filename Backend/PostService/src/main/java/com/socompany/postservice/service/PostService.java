package com.socompany.postservice.service;

import com.socompany.postservice.exceptions.PostNotFoundException;
import com.socompany.postservice.mapper.PostMapper;
import com.socompany.postservice.model.dto.CommentDto;
import com.socompany.postservice.model.dto.PostDto;
import com.socompany.postservice.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private final PostRepository postRepository;

    private final CommentService commentService;

    private final PostMapper postMapper;

    public PostService(PostRepository postRepository, CommentService commentService, PostMapper postDtoMapper) {
        this.postRepository = postRepository;
        this.commentService = commentService;
        this.postMapper = postDtoMapper;
    }
    public Optional<PostDto> getPostById(String postId) {
        return postRepository.findById(postId).map(post -> {

            List<CommentDto> comments = commentService.getCommentTree(post.getId());

            PostDto dto = postMapper.toDto(post);
            dto.setComments(comments);

            return dto;
        });
    }
    public List<PostDto> getAllPosts() {
        return postRepository.findAll().stream()
                .map(post -> {
                    PostDto dto = postMapper.toDto(post);
                    dto.setComments(commentService.getCommentTree(post.getId()));
                    return dto;
                }).toList();
    }
    @Transactional
    public PostDto createPost(PostDto postDto) {
        return postMapper.toDto(postRepository.save(postMapper.toEntity(postDto)));
    }
    @Transactional
    public PostDto updatePost(String id, PostDto postDto) {
        return postRepository.findById(id)
                .map(post -> {
                    postRepository.save(postMapper.toEntity(postDto));
                    return postMapper.toDto(post);
                })
                .orElseThrow(() -> new PostNotFoundException(String.format("Post with id %s not found", id)));
    }
    @Transactional
    public boolean deletePostById(String postId) {

        return postRepository.findById(postId)
                .map(post -> {
                    postRepository.delete(post);
                    return true;
                }).orElse(false);

    }
}
