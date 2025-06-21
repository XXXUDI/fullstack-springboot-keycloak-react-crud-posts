package com.socompany.postservice.mapper;

import com.socompany.postservice.model.dto.CommentDto;
import com.socompany.postservice.model.entity.Comment;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {


    @Mapping(target = "replies", ignore = true)
    CommentDto toDto(Comment comment);

    @InheritInverseConfiguration
    Comment toEntity(CommentDto dto);

    List<CommentDto> toDtoList(List<Comment> comments);

    List<Comment> toEntityList(List<CommentDto> comments);
}
