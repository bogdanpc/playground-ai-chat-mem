package io.github.bogdanpc.playground.knowledge.control;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.IngestionResult;
import io.quarkiverse.langchain4j.pgvector.PgVectorEmbeddingStore;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

@ApplicationScoped
public class IngestDocument {

    @Inject
    PgVectorEmbeddingStore store;

    @Inject
    EmbeddingModel embeddingModel;

    public IngestionResult ingest(SplitType splitType, List<Document> documents, String userId, Long kdbId) {

        var ingestor = EmbeddingStoreIngestor.builder()
                .embeddingStore(store)
                .embeddingModel(embeddingModel)
                .documentTransformer(document -> {
                    document.metadata().put("userId", userId);
                    document.metadata().put("kdbId", kdbId);
                    return document;
                })
                .documentSplitter(SplitterService.factory(splitType, 600, 20))
                .build();


        return ingestor.ingest(documents);

    }
}
