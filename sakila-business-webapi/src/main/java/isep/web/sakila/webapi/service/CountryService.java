package isep.web.sakila.webapi.service;

import java.util.List;

import isep.web.sakila.webapi.model.CountryWO;

public interface CountryService {
	CountryWO findById(int id);

	void saveCountry(CountryWO userWO);

	void updateCountry(CountryWO userWO);

	void deleteCountryById(int id);

	List<CountryWO> findAllCountrys();

}
