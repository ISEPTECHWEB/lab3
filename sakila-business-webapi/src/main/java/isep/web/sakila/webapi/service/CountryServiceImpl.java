package isep.web.sakila.webapi.service;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import isep.web.sakila.dao.repositories.CountryRepository;
import isep.web.sakila.jpa.entities.Country;
import isep.web.sakila.webapi.model.CountryWO;

@Service("countryService")
@Transactional
public class CountryServiceImpl implements CountryService {
	@Autowired
	private CountryRepository countryRepository;

	private static final Log log = LogFactory.getLog(CountryServiceImpl.class);

	public List<CountryWO> findAllCountrys() {
		List<CountryWO> countrys = new LinkedList<CountryWO>();

		for (Country country :countryRepository.findAll()) {
			countrys.add(new CountryWO(country));
			log.debug("Adding " + country);
		}

		return countrys;
	}

	public CountryWO findById(int id) {
		log.debug(String.format("Looking for user by Id %s", id));
		Country country = countryRepository.findOne(id);

		if (country != null) {
			return new CountryWO(country);
		}
		return null;
	}

	public void saveCountry(CountryWO CountryWO) {
		Country country = new Country();
		country.setCountry(CountryWO.getCountry());
		country.setLastUpdate(new Timestamp(System.currentTimeMillis()));
		countryRepository.save(country);
	}

	public void updateCountry(CountryWO CountryWO) {
		Country country2update = countryRepository.findOne(CountryWO.getCountryId());
		country2update.setCountry(CountryWO.getCountry());
		country2update.setLastUpdate(new Timestamp(System.currentTimeMillis()));
		countryRepository.save(country2update);
	}

	@Override
	public void deleteCountryById(int id) {
		countryRepository.delete(id);
		
	}

}
