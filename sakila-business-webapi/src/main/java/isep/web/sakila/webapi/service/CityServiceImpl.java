package isep.web.sakila.webapi.service;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import isep.web.sakila.dao.repositories.CityRepository;
import isep.web.sakila.jpa.entities.City;
import isep.web.sakila.webapi.model.CityWO;

@Service("cityService")
@Transactional
public class CityServiceImpl implements CityService {
	@Autowired
	private CityRepository cityRepository;

	private static final Log log = LogFactory.getLog(CityServiceImpl.class);

	public List<CityWO> findAllCitys() {
		List<CityWO> Citys = new LinkedList<CityWO>();

		for (City City : cityRepository.findAll()) {
			Citys.add(new CityWO(City));
			log.debug("Adding " + City);
		}

		return Citys;
	}

	public CityWO findById(int id) {
		log.debug(String.format("Looking for user by Id %s", id));
		City City = cityRepository.findOne(id);

		if (City != null) {
			return new CityWO(City);
		}
		return null;
	}

	public void saveCity(CityWO CityWO) {
		City City = new City();
		City.setCity(CityWO.getCity());
		//City.setCountry(CityWO.getCountry());
		City.setLastUpdate(new Timestamp(System.currentTimeMillis()));
		cityRepository.save(City);
	}

	public void updateCity(CityWO CityWO) {
		City city2update = cityRepository.findOne(CityWO.getCityId());
		city2update.setCity(CityWO.getCity());
		//city2update.setCountry(CityWO.getCountry());
		cityRepository.save(city2update);
	}

	@Override
	public void deleteCityById(int id) {
		cityRepository.delete(id);
	}

}
