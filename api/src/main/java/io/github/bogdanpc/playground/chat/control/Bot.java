package io.github.bogdanpc.playground.chat.control;

import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import io.github.bogdanpc.playground.tools.boundry.UserTool;
import io.quarkiverse.langchain4j.RegisterAiService;
import io.quarkiverse.langchain4j.response.ResponseAugmenter;
import io.smallrye.mutiny.Multi;

@RegisterAiService(retrievalAugmentor = ChatRetrievalAugmentor.class, tools = {UserTool.class})
public interface Bot {

    @SystemMessage("""
            You are an AI named Chatty.
            Your response must be polite, use the same language as the question, and be relevant to the question.
            
            When you don't know, respond that you don't know the answer.
            """)
    @ResponseAugmenter(SourceAugmenter.class)
    Multi<String> chat(@UserMessage String chat);
}
