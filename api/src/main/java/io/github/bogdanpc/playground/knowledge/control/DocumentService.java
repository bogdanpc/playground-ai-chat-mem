package io.github.bogdanpc.playground.knowledge.control;

import io.github.bogdanpc.playground.knowledge.entity.DocumentEmbedding;
import io.quarkus.panache.common.Page;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class DocumentService {

    @Inject
    EntityManager em;

    @SuppressWarnings("unchecked")
    public List<DocumentEmbedding> embeddingDocuments(Page page) {

        return em.createNativeQuery("""
                        SELECT
                        count(*) OVER() AS size,
                        e.embedding_id as id, e.text, e.metadata
                        from embeddings e
                        offset :offset rows
                        fetch first :size rows only
                        """, DocumentEmbedding.class)
                .setParameter("offset", page.index * page.size)
                .setParameter("size", page.size)
                .getResultList();
    }

    public Optional<DocumentEmbedding> embeddingDocument(String id) {
        @SuppressWarnings("unchecked")
        List<DocumentEmbedding> result = em.createNativeQuery("""
                        SELECT NULL as size, e.embedding_id as id, e.text, e.metadata
                        FROM embeddings e
                        WHERE e.embedding_id = UUID(:id)\
                        """, DocumentEmbedding.class)
                .setParameter("id", id)
                .getResultList();

        return result == null || result.isEmpty() ? Optional.empty() : Optional.of(result.getFirst());
    }


}
