package com.socompany.mockservice.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mock/self")
@Slf4j
public class SelfDataController {
    @GetMapping("/preferred_username")
    public String getPreferredUsername(@AuthenticationPrincipal Jwt jwt) {
        log.info("Received request to get preferred username: {}", jwt);
        return jwt.getClaimAsString("preferred_username");
    }

    @GetMapping("/roles")
    public String[] getRoles(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            List<String> roles = (List<String>) realmAccess.get("roles");
            return roles.toArray(new String[0]);
        }
        return new String[0];
    }

    @PostMapping("/checkAdmin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public boolean checkAdmin() {
        return true;
    }

    @GetMapping("/debug")
    public String debug(Authentication auth) {
        return auth.getAuthorities().toString();
    }

    @GetMapping("/email")
    public String getEmail(@AuthenticationPrincipal Jwt jwt) {
        log.info("Received request to check email: {}", jwt);
        return jwt.getClaimAsString("email");
    }

    @GetMapping("/sub")
    public String getUs(@AuthenticationPrincipal Jwt jwt) {
        log.info("Received request to check sub (UUID): {}", jwt);
        return jwt.getClaimAsString("sub");
    }

    @GetMapping("/logs")
    public String getLogs(@AuthenticationPrincipal Jwt jwt, Authentication auth) {
        log.info("Received request to initialize logs");

        log.info("- - - Authentication Object - - -");
        log.info("Authentication Authorities {}", auth.getAuthorities().toString());
        log.info("Authentication Principal: {}", auth.getPrincipal());
        log.info("Authentication Credentials: {}", auth.getCredentials().toString());
        log.info("Authentication Details: {}", auth.getDetails());

        log.info("- - - JWT - - -");
        log.info("Jwt Claims {}", jwt.getClaims());
        log.info("Jwt Headers {}", jwt.getHeaders());

        log.info("- - - - - - - - - - - - - - - - - - - - - - - - - -");

        return "Successfully Initialized Logs";

    }

}
