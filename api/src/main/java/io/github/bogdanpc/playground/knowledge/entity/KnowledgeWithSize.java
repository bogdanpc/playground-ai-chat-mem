package io.github.bogdanpc.playground.knowledge.entity;

import java.time.Instant;
import java.util.Map;

public record KnowledgeWithSize(Long size, Long id, String name, String description, Map<String, Object> metadata, Instant createdAt){}
