package isep.web.sakila.webapi.service;

import java.util.List;

import isep.web.sakila.webapi.model.CityWO;

public interface CityService {
	CityWO findById(int id);

	void saveCity(CityWO userWO);

	void updateCity(CityWO userWO);

	void deleteCityById(int id);

	List<CityWO> findAllCitys();
}
