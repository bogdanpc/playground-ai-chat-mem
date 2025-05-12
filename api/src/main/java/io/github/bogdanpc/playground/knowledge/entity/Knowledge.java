package io.github.bogdanpc.playground.knowledge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;

@Entity(name= "knowledge")
public class Knowledge {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "knowledge_seq")
    @SequenceGenerator(name = "knowledge_seq", sequenceName = "knowledge_seq", allocationSize = 1)
    public Long id;
    @Column(name = "user_id")
    public int userId;
    public String name;
    public String description;

    @JdbcTypeCode(SqlTypes.JSON)
    public Map<String, Object> metadata;

    @Column(name = "created_at")
    @CreationTimestamp
    public Instant createdAt;
}
