package io.github.bogdanpc.playground.tools.boundry;

import dev.langchain4j.agent.tool.Tool;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@ApplicationScoped
public class UserTool {

    @Tool("Get today's date")
    public String getTodaysDate() {
        String date = DateTimeFormatter.ISO_DATE.format(LocalDate.now());
        Log.debugf("The model is asking for today's date, returning %s", date);
        return date;
    }
}
