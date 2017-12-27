package isep.web.sakila.webapi.model;

import isep.web.sakila.jpa.entities.City;
import isep.web.sakila.jpa.entities.Country;

public class CityWO extends WebObject{
	
	private static final long serialVersionUID = -1377067679479173279L;
	
	protected int cityId;
	protected String city;
	protected Country country;
	
	public CityWO() {
		super();
	}
	
	public CityWO(int cityId, String city,  Country country) {
		super();
		this.cityId = cityId;
		this.city = city;
		this.country = country;
	}
	
	public CityWO(final City city) {
		super();
		this.cityId = city.getCityId();
		this.city = city.getCity();
		this.country = city.getCountry();
	}

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Country getCountry() {
		return country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}
	
	@Override
	public String toString() {
		return "City [id=" + this.cityId + ", City=" + this.city + ", Country=" + this.getCountry()+"]";
	}
	
}
