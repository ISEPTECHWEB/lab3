package isep.web.sakila.webapi.model;

import isep.web.sakila.jpa.entities.Country;

public class CountryWO extends WebObject{
	private static final long serialVersionUID = -1377067679479173279L;
	
	protected int countryId;
	protected String country;
	
	public CountryWO() {
		super();
	}
	
	public CountryWO(int countryId, String country) {
		super();
		this.countryId = countryId;
		this.country = country;
	}
	
	public CountryWO(final Country country) {
		super();
		this.countryId = country.getCountryId();
		this.country = country.getCountry();
	}

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	
	@Override
	public String toString() {
		return "Country [id=" + this.countryId + ", Country=" + this.country +"] ";
	}
}
