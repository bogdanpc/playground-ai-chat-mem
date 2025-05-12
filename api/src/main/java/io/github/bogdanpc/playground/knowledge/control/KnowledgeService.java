package io.github.bogdanpc.playground.knowledge.control;

import dev.langchain4j.data.document.Document;
import io.github.bogdanpc.playground.knowledge.boundry.KdbInfo;
import io.github.bogdanpc.playground.knowledge.entity.Knowledge;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class KnowledgeService {

    @Inject
    KnowledgeRepo repo;

    @Transactional
    public Knowledge saveKdb(Document document, KdbInfo info) {

        var metadata = document.metadata();

        var kdbEntry = new Knowledge();
        kdbEntry.name = info.title();
        kdbEntry.metadata = metadata.toMap();

        repo.persist(kdbEntry);
        return kdbEntry;
    }
}
