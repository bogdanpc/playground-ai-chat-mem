package io.github.bogdanpc.playground.knowledge.control;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.loader.FileSystemDocumentLoader;
import dev.langchain4j.data.document.parser.apache.tika.ApacheTikaDocumentParser;

import java.nio.file.Path;

public class DocumentFromFile {

    private DocumentFromFile() {

    }
    public static Document create(Path documentPath) {

        return FileSystemDocumentLoader.loadDocument(documentPath, new ApacheTikaDocumentParser());
    }
}
