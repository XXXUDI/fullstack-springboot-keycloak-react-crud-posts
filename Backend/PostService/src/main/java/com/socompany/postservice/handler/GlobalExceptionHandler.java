package com.socompany.postservice.handler;

import com.socompany.postservice.exceptions.PostNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(PostNotFoundException.class)
    public PostNotFoundException handlePostNotFoundException(PostNotFoundException ex) {
        return new PostNotFoundException(ex.getMessage());
    }
}
