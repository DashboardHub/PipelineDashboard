package io.dashboardhub.pipelinedashboard.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Profile("test")
@Configuration
public class SecurityConfigMock extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationProviderMock authenticationProviderMock;

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
                .antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/webjars/**").permitAll()
                .and()
                .authenticationProvider(authenticationProviderMock)
                .formLogin()
                .and()
                .authorizeRequests().antMatchers("/", "/login**", "/webjars/**").permitAll()
                .anyRequest()
                .hasAnyAuthority("ROLE_USER")
                .and()
                .sessionManagement()
                .invalidSessionUrl("/")
                .sessionFixation()
                .newSession()
        ;
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProviderMock);
    }
}
