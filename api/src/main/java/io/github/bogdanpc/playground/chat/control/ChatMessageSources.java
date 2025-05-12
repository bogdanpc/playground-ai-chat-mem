package io.github.bogdanpc.playground.chat.control;

import java.time.Instant;
import java.util.List;
import java.util.Map;

public record ChatMessageSources(String id, String type, List<Map<String, Object>> content, Instant timestamp) {
}
