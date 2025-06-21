package com.socompany.postservice.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostDto {
    private String id;
    private String title;
    private String body;
    private String image;
    private String category;
    private Instant createdDate;
    private Instant modifiedDate;
    List<CommentDto> comments;
    private String authorId;


}
