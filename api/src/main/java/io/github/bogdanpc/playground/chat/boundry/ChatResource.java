package io.github.bogdanpc.playground.chat.boundry;

import io.github.bogdanpc.playground.chat.control.Bot;
import io.smallrye.mutiny.Multi;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.RestStreamElementType;

@Path("/chat")
@RolesAllowed("admin")
public class ChatResource {
    record Chat(String id, String assistant, String query ){}

    @Inject
    Bot bot;

    @POST
    @RestStreamElementType(MediaType.APPLICATION_JSON)
    public Multi<String> chat(Chat chat) {
        return bot.chat(chat.query());
    }
}
