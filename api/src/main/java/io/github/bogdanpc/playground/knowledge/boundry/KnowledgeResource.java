package io.github.bogdanpc.playground.knowledge.boundry;

import io.github.bogdanpc.playground.Pagination;
import io.github.bogdanpc.playground.knowledge.control.KnowledgeRepo;
import io.quarkus.panache.common.Page;
import jakarta.inject.Inject;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;

@Path("/knowledge")
public class KnowledgeResource {
    @Inject
    KnowledgeRepo repo;

    @GET
    public Response items(@QueryParam("page") @DefaultValue("0") int page,
                           @QueryParam("limit") @DefaultValue("50") int limit) {

        var kdbs = repo.withPage(Page.of(page, limit));

        return Response.ok( new Pagination<>(kdbs.isEmpty() ? 0: kdbs.getFirst().size().intValue(), kdbs)).build();
    }

    @GET
    @Path("/{id}")
    public  Response item(Long id) {

        var kdb = repo.findById(id);
        if(kdb == null) {
            return Response.status(404).build();
        }

        return Response.ok(kdb).build();
    }
}
