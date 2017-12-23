package isep.web.sakila;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import isep.web.sakila.jpa.config.PersistenceConfig;
import isep.web.sakila.webapi.model.ActorWO;
import isep.web.sakila.webapi.service.ActorService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SakilaBusinessWebapiApplication.class)
@Import(PersistenceConfig.class)
public class SakilaBusinessWebapiApplicationTests {
	
	@Autowired
	private ActorService actorService;
	
	@Test
	public void testFindAllActors() {
		List<ActorWO> actors = actorService.findAllActors();
		for (ActorWO actor : actors) {
			System.out.printf("%s %s\n", actor.getFirstName(), actor.getLastName());
		}
	}
	
	

}
