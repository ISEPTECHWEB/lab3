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
import isep.web.sakila.webapi.model.AddressWO;
import isep.web.sakila.webapi.model.CityWO;
import isep.web.sakila.webapi.model.CountryWO;
import isep.web.sakila.webapi.model.CustomerWO;
import isep.web.sakila.webapi.model.StoreWO;
import isep.web.sakila.webapi.service.ActorService;
import isep.web.sakila.webapi.service.AddressService;
import isep.web.sakila.webapi.service.CityService;
import isep.web.sakila.webapi.service.CountryService;
import isep.web.sakila.webapi.service.CustomerService;
import isep.web.sakila.webapi.service.StoreService;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = SakilaBusinessWebapiApplication.class)
@Import(PersistenceConfig.class)
public class SakilaBusinessWebapiApplicationTests {
	
	@Autowired
	private ActorService actorService;
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private AddressService addressService;
	
	@Autowired
	private CityService cityService;
	
	@Autowired
	private CountryService countryService;
	
	@Autowired
	private StoreService storeService;
	
	@Test
	public void testAddActor() {
		ActorWO actorFound = actorService.findById(237);
		actorFound.setLastName("SMET");
		actorService.saveActor(actorFound);
	}
	
	@Test
	public void testFindAllActors() {
		List<ActorWO> actors = actorService.findAllActors();
		System.out.printf("----------------------------------------\n");
		System.out.printf("Actors List:\n");
		for (ActorWO actor : actors) {
			System.out.printf("%s %s\n", actor.getFirstName(), actor.getLastName());
		}
	}
	
	@Test
	public void testFindAllCustomers() {
		List<CustomerWO> customers = customerService.findAllCustomers();
		System.out.printf("----------------------------------------\n");
		System.out.printf("Customers List:\n");
		for (CustomerWO customer : customers) {
			System.out.printf("%s %s\n", customer.getFirstName(), customer.getLastName());
		}
	}
	
	@Test
	public void testFindAllAddresses() {
		List<AddressWO> addresses = addressService.findAllAddresses();
		System.out.printf("----------------------------------------\n");
		System.out.printf("Adresses List:\n");
		for (AddressWO address : addresses) {
			System.out.printf(address.toString());
		}
	}
	
	//@Test
	public void testAddAddress() {
		AddressWO address = addressService.findById(1);
		address.setAddress("666");
		addressService.saveAddress(address);
	}
	
	@Test
	public void testFindAllCitys() {
		List<CityWO> citys = cityService.findAllCitys();
		System.out.printf("----------------------------------------\n");
		System.out.printf("Citys List:\n");
		for (CityWO city : citys) {
			System.out.printf(city.toString());
		}
	}
	
	@Test
	public void testFindAllCountrys() {
		List<CountryWO> countrys = countryService.findAllCountrys();
		System.out.printf("----------------------------------------\n");
		System.out.printf("Countrys List:\n");
		for (CountryWO country : countrys) {
			System.out.printf(country.toString());
		}
	}
	
	@Test
	public void testFindAllStores() {
		List<StoreWO> stores = storeService.findAllStores();
		System.out.printf("----------------------------------------\n");
		System.out.printf("Stores List:\n");
		for (StoreWO store : stores) {
			System.out.printf(store.toString());
		}
	}
	
	@Test
	public void testUpdateCustomer() {
		CustomerWO customerFound = customerService.findById(237);
		customerFound.setLastName("ED");
		customerService.updateCustomer(customerFound);
	}

}
