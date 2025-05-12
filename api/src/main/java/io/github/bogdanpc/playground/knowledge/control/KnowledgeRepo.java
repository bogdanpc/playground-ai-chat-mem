package io.github.bogdanpc.playground.knowledge.control;

import io.github.bogdanpc.playground.knowledge.entity.Knowledge;
import io.github.bogdanpc.playground.knowledge.entity.KnowledgeWithSize;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Page;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class KnowledgeRepo implements PanacheRepository<Knowledge> {
    public List<KnowledgeWithSize> withPage(Page page) {
        return getEntityManager().createQuery("""
                        SELECT
                        count(*) OVER() AS size,
                        k.id, k.name, k.description, k.metadata, k.createdAt
                        FROM knowledge k
                        order by createdAt
                        offset :offset rows
                        fetch first :size rows only
                        """, KnowledgeWithSize.class)
                .setParameter("offset", page.index * page.size)
                .setParameter("size", page.size)
                .getResultList();
    }
}
