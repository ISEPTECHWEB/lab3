package isep.web.sakila;

import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import isep.web.sakila.dao.business.IBusiness;
import isep.web.sakila.jpa.config.PersistenceConfig;
import isep.web.sakila.jpa.entities.Actor;
import isep.web.sakila.jpa.entities.Customer;

@RunWith(SpringRunner.class)
@SpringBootTest
@Import(PersistenceConfig.class)
public class SakilaBusinessDaoApplicationTests {

	@Autowired
	private IBusiness business;

	@Test
	public void testActorList() {
		List<Actor> actorList = business.getAllActors();
		System.out.print("List of actors:\n");
		for (Actor actor : actorList) {
			System.out.printf("%s %s\n", actor.getFirstName(), actor.getLastName());
		}
	}
	
	@Test
	public void testGetAllActors()
	{
		Assert.assertEquals(201, business.getAllActors().size());
	}
	
	@Test
	public void testGetActorByID()
	{
		Assert.assertEquals("GUINESS", business.getByID(1).getLastName());
	}
	
	@Test
	public void testCustomerList() {
		List<Customer> customerList = business.getAllCustomers();
		System.out.print("List of customers:\n");
		for (Customer customer : customerList) {
			System.out.printf("%s %s\n", customer.getFirstName(), customer.getLastName());
		}
	}
	
	@Test
	public void testGetCustomerByID()
	{
		Assert.assertEquals("SMITH", business.getCustomerByID(1).getLastName());
	}
	


}
