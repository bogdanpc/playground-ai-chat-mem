package io.github.bogdanpc.playground.knowledge.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record DocumentEmbedding(Long size, UUID id, String text, String metadata) {
}
