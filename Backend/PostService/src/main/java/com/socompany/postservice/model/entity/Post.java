package com.socompany.postservice.model.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.UUID;

@Document
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    @Id
    private String id;

    private String title;

    private String body;

    private String image;

    private String category;

    @CreatedDate
    private Instant createdDate;
    @LastModifiedDate
    private Instant modifiedDate;

    private String authorId;
}
