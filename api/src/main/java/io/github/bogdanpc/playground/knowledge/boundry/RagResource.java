package io.github.bogdanpc.playground.knowledge.boundry;

import io.github.bogdanpc.playground.Pagination;
import io.github.bogdanpc.playground.knowledge.control.*;
import io.quarkus.panache.common.Page;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Path("/rag")
public class RagResource {

    @Inject
    IngestDocument ingestDocument;

    @Inject
    DocumentService documentService;

    @Inject
    KnowledgeService knowledgeService;


    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/import/file")
    public Response importFile(@Valid RagResource.ImportFileDto importFileDto, @Context SecurityContext securityContext) {

        var doc = DocumentFromFile.create(importFileDto.file.filePath());

        doc.metadata().put("year", LocalDate.now().getYear());
        doc.metadata().put("reference", doc.metadata().getString("absolute_directory_path"));
        doc.metadata().put("userId", LocalDate.now().getYear());

        var fileSplit = importFileDto.file.fileName().split("\\.");

        var kdbEntry = knowledgeService.saveKdb(doc, new KdbInfo(importFileDto.title, fileSplit[fileSplit.length - 1].toUpperCase(), importFileDto.file.fileName(), null));

        ingestDocument.ingest(SplitType.RECURSIVE, List.of(doc), securityContext.getUserPrincipal().getName(), kdbEntry.id);

        return Response.ok(Map.of("fileName", importFileDto.file.fileName())).build();
    }


    /**
     * List of ingested documents embedding.
     */
    @GET
    @Path("/embeddings")
    public Response documents(@QueryParam("page") @DefaultValue("0") int page,
                              @QueryParam("limit") @DefaultValue("50") int limit) {
        var docs = documentService.embeddingDocuments(Page.of(page, limit));
        return Response.ok(new Pagination<>(docs.isEmpty() ? 0 : docs.getFirst().size().intValue(), docs)).build();
    }

    /**
     * Documents embedding by id
     */
    @GET
    @Path("/embeddings/{id}")
    public Response document(@PathParam("id") String id) {
        return documentService.embeddingDocument(id)
                .map(r -> Response.ok(r).build()).orElse(Response.status(404).build());
    }

    public static class ImportFileDto {

        @FormParam("title")
        String title;

        @FormParam("file")
        @NotNull
        FileUpload file;
    }

}
