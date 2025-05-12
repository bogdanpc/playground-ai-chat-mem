package io.github.bogdanpc.playground.chat.control;

import java.time.Instant;

public record ChatMessage(String id, String type, Object content, Instant timestamp) {
}
