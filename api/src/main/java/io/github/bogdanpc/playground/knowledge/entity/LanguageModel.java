package io.github.bogdanpc.playground.knowledge.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "language_model")
public class LanguageModel {

    @Id
    public Long id;

    @Column(name = "name")
    public String name;

    public String description;

    public String version;

    public String provider;


}
