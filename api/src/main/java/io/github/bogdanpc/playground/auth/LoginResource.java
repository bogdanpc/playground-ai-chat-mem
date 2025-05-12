package io.github.bogdanpc.playground.auth;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

@Path("/login")
@RolesAllowed({"admin", "user"})
public class LoginResource {

    public record UserInfo(String username, String role) {
    }

    @POST
    public Response login(@Context SecurityContext context) {
        return Response.ok(new UserInfo(context.getUserPrincipal().getName() , context.isUserInRole("admin") ? "admin" : "user")).build();
    }
}
