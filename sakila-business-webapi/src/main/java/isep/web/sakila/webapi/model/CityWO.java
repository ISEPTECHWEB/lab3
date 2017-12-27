package isep.web.sakila.webapi.model;

import isep.web.sakila.jpa.entities.City;

public class CityWO extends WebObject{
	
	private static final long serialVersionUID = -1377067679479173279L;
	
	protected int cityId;
	protected String city;
	protected CountryWO country;
	
	public CityWO() {
		super();
	}
	
	public CityWO(int cityId, String city,  CountryWO country) {
		super();
		this.cityId = cityId;
		this.city = city;
		this.country = country;
	}
	
	public CityWO(final City city) {
		super();
		this.cityId = city.getCityId();
		this.city = city.getCity();
		this.country= new CountryWO(city.getCountry());
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

	public CountryWO getCountry() {
		return country;
	}

	public void setCountry(CountryWO country) {
		this.country = country;
	}
	
	@Override
	public String toString() {
		return "City [id=" + this.cityId + ", City=" + this.city + ", Country=" + this.getCountry()+"]";
	}
	
}
