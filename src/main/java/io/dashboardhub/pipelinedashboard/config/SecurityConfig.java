package io.dashboardhub.pipelinedashboard.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.CompositeFilter;

import javax.servlet.Filter;
import java.util.ArrayList;
import java.util.List;

@Profile("!test")
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    OAuth2ClientContext oauth2ClientContext;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**")
                .authorizeRequests()
                .antMatchers("/", "/login**", "/webjars/**", "/fonts/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login").failureUrl("/login")
                .permitAll()
                .and().logout().logoutSuccessUrl("/").permitAll()
                .and().addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class)
        ;
    }

    @Bean
    @ConfigurationProperties("security.oauth2")
    ClientResourcesConfig github() {
        return new ClientResourcesConfig();
    }

    private Filter ssoFilter() {
        CompositeFilter filter = new CompositeFilter();
        List<Filter> filters = new ArrayList<>();
        filters.add(ssoFilter(this.github(), "/login/github"));
        filter.setFilters(filters);

        return filter;
    }

    private Filter ssoFilter(ClientResourcesConfig client, String path) {
        OAuth2ClientAuthenticationProcessingFilter githubFilter = new OAuth2ClientAuthenticationProcessingFilter(path);
        OAuth2RestTemplate githubTemplate = new OAuth2RestTemplate(client.getClient(), oauth2ClientContext);
        githubFilter.setApplicationEventPublisher(applicationEventPublisher);
        githubFilter.setRestTemplate(githubTemplate);
        githubFilter.setTokenServices(
                new UserInfoTokenServices(
                        client.getResource().getUserInfoUri(), client.getClient().getClientId()
                )
        );

        return githubFilter;
    }
}
