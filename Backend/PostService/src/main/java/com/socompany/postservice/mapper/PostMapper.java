package com.socompany.postservice.mapper;

import com.socompany.postservice.model.dto.PostDto;
import com.socompany.postservice.model.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.time.Instant;

@Mapper(componentModel = "spring", imports = {Instant.class})
public interface PostMapper {

    PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

    PostDto toDto(Post post);

    Post toEntity(PostDto postDto);

}
