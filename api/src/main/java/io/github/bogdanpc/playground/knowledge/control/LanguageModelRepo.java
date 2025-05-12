package io.github.bogdanpc.playground.knowledge.control;

import io.github.bogdanpc.playground.knowledge.entity.LanguageModel;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class LanguageModelRepo implements PanacheRepository<LanguageModel> {
}
