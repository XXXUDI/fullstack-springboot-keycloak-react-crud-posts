package com.socompany.postservice.service;

import com.socompany.postservice.mapper.CommentMapper;
import com.socompany.postservice.model.dto.CommentDto;
import com.socompany.postservice.model.entity.Comment;
import com.socompany.postservice.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    public void saveComment(CommentDto commentDto) {
        Comment comment = commentMapper.toEntity(commentDto);
        commentRepository.save(comment);
    }


    public List<CommentDto> getCommentTree(String postId) {
        List<Comment> allComments = commentRepository.findAllCommentsByPostId(postId);

        Map<String, List<Comment>> replies = allComments.stream()
                .filter(child -> child.getParentCommentId() != null)
                .collect(Collectors.groupingBy(Comment::getParentCommentId));

        List<CommentDto> rootComments = allComments.stream()
                .filter(child -> child.getParentCommentId() == null)
                .map(child -> mapWithReplies(child, replies))
                .collect(Collectors.toList());

        return rootComments;
    }

    public CommentDto mapWithReplies(Comment rootComment, Map<String, List<Comment>> replies) {

        CommentDto commentDto = commentMapper.toDto(rootComment);
        List<Comment> childrenComments = replies.getOrDefault(rootComment.getId(), List.of());

        List<CommentDto> repliesDto = childrenComments.stream()
                .map(child -> mapWithReplies(child, replies))
                .toList();

        commentDto.setReplies(repliesDto);

        return commentDto;
    }
}
