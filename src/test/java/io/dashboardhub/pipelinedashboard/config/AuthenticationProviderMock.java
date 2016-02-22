package io.dashboardhub.pipelinedashboard.config;

import io.dashboardhub.pipelinedashboard.domain.User;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Profile("test")
@Primary
@Service
public final class AuthenticationProviderMock implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken("TestUser", "", mockGrantedAuthorities());
        usernamePasswordAuthenticationToken.setDetails(new User("TestUser"));
        return usernamePasswordAuthenticationToken;
    }


    @Override
    public boolean supports(final Class<?> authentication) {
        return true;
    }

    private List<GrantedAuthority> mockGrantedAuthorities() {
        List authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        return authorities;
    }
}
