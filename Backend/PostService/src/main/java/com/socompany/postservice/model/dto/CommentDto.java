package com.socompany.postservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private String id;
    private String postId;
    private String parentCommentId;
    private String content;
    private String userId;
    private Instant createdDate;
    private Instant modifiedDate;
    private List<CommentDto> replies;

}
