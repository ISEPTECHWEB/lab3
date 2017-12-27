package isep.web.sakila.webapi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable();
		
		// Authorize access only after login
//		http.authorizeRequests().antMatchers("/", "/home").permitAll().anyRequest().authenticated().and().formLogin()
//				.loginPage("/login").permitAll().and().logout().permitAll();
//		http.csrf().disable();
		
		http.authorizeRequests()
		.antMatchers("/auth/**").permitAll()
		.antMatchers(HttpMethod.POST, "/auth/refresh_token").permitAll()
		.antMatchers(HttpMethod.GET, "/auth/**").permitAll()
		.antMatchers("/resources/**").permitAll();
		
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.inMemoryAuthentication().withUser("admin").password("adminPwd").roles("USER");
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration cors = new CorsConfiguration();
		cors.setAllowCredentials(true);
		cors.addAllowedOrigin("*");
		cors.addAllowedHeader("*");
		cors.addAllowedMethod("OPTIONS");
		cors.addAllowedMethod("GET");
		cors.addAllowedMethod("POST");
		cors.addAllowedMethod("PUT");
		cors.addAllowedMethod("DELETE");
		source.registerCorsConfiguration("/**", cors);
		return source;
	}
}