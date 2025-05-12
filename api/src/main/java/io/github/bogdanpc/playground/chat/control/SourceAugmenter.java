package io.github.bogdanpc.playground.chat.control;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.CosineSimilarity;
import io.quarkiverse.langchain4j.response.AiResponseAugmenter;
import io.quarkiverse.langchain4j.response.ResponseAugmenterParams;
import io.quarkus.logging.Log;
import io.smallrye.mutiny.Multi;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class SourceAugmenter implements AiResponseAugmenter<String> {

    @Inject
    EmbeddingModel embeddingModel;

    @Inject
    ObjectMapper objectMapper;


    record SourceEmbedding(TextSegment textSegment, String file, Embedding embedding) {
    }

    @Override
    public String augment(String response, ResponseAugmenterParams params) {
        // Only add sources that are similar to the computed response

        var embeddingOfTheResponse = embeddingModel.embed(response).content();

        List<SourceEmbedding> sources = params.augmentationResult()
                .contents().stream().map(c -> {
                    var embedding = embeddingModel.embed(c.textSegment().text()).content();
                    // Extract the "source" of the content from the metadata:
                    return new SourceEmbedding(c.textSegment(),
                            c.textSegment().metadata().getString("file"), embedding);
                }).toList();

        // Ignore segments not similar enough
        Set<SourceEmbedding> filtered = filter(embeddingOfTheResponse, sources);

        // Remove duplicates
        Set<String> names = new LinkedHashSet<>();
        for (var source : filtered) {
            names.add(source.file());
        }

        return response + (names.isEmpty() ? "" : " (Sources: " + String.join(", ", names) + ")");
    }

    @Override
    public Multi<String> augment(Multi<String> stream, ResponseAugmenterParams params) {

        var sources = params.augmentationResult()
                .contents().stream().map(c -> {
                    var embedding = embeddingModel.embed(c.textSegment().text()).content();

                    // Extract the "source" of the content from the metadata:
                    return new SourceEmbedding(c.textSegment(),
                            c.textSegment().metadata().getString("file"), embedding);
                }).toList();

        return stream
                .onItem().transform(t -> {
                    var cm = new ChatMessage("delta_" + System.currentTimeMillis(), "delta", t, Instant.now());
                    try {
                        return objectMapper.writeValueAsString(cm);
                    } catch (JsonProcessingException e) {
                        Log.error(e);
                        return "";
                    }
                })
                .onCompletion()
                .continueWith(sourcesMessage(sources));
    }

    private String sourcesMessage(List<SourceEmbedding> sources) {

        var x = sources.stream().map(s -> s.textSegment().metadata().toMap()).toList();
        Log.info(x);
        try {
            var cm = new ChatMessageSources("sources_" + System.currentTimeMillis(), "sources", x, Instant.now());
            return objectMapper.writeValueAsString(cm);
        } catch (JsonProcessingException e) {
            Log.error(e);
            return "";
        }
    }

    private Set<SourceEmbedding> filter(Embedding embeddingOfTheResponse, List<SourceEmbedding> contents) {
        Set<SourceEmbedding> filtered = new LinkedHashSet<>();
        for (SourceEmbedding content : contents) {
            double similarity = CosineSimilarity.between(embeddingOfTheResponse, content.embedding());
            if (similarity > 0.85) {
                filtered.add(content);
            }
        }

        return filtered;
    }

}
