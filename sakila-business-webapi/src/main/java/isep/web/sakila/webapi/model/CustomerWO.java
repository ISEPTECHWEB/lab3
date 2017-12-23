package isep.web.sakila.webapi.model;

import java.util.Date;

import isep.web.sakila.jpa.entities.Address;
import isep.web.sakila.jpa.entities.Customer;
import isep.web.sakila.jpa.entities.Store;

public class CustomerWO extends WebObject {

	private static final long serialVersionUID = -1377067679479173279L;

	protected int customerId;
	protected String lastName;
	protected String firstName;
	protected String email;
	protected Address address;
	protected Store store;
	protected byte active;
	protected Date createDate;

	public CustomerWO() {
		super();
	}

	public CustomerWO(int customerId, String lastName, String firstName, String email, Address address, Store store,
			byte active, Date createDate) {
		super();
		this.customerId = customerId;
		this.lastName = lastName;
		this.firstName = firstName;
		this.email = email;
		this.address = address;
		this.store = store;
		this.active = active;
		this.createDate = createDate;
	}

	public CustomerWO(final Customer customer) {
		super();
		this.customerId = customer.getCustomerId();
		this.lastName = customer.getLastName();
		this.firstName = customer.getFirstName();
		this.email = customer.getEmail();
		this.address = customer.getAddress();
		//this.store = customer.getStore();
		this.active = customer.getActive();
		this.createDate = customer.getCreateDate();
	}

	public String getFirstName() {
		return firstName;
	}

	public int getCustomerId() {
		return customerId;
	}

	public String getLastName() {
		return lastName;
	}

	public String getEmail() {
		return email;
	}

	public Address getAddress() {
		return address;
	}

	public Store getStore() {
		return store;
	}

	public byte getActive() {
		return active;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public void setStore(Store store) {
		this.store = store;
	}

	public void setActive(byte active) {
		this.active = active;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	@Override
	public String toString() {
		return "Customer [id=" + this.customerId + ", LastName=" + this.lastName + ", First=" + this.firstName
				+ ", Email= " + this.email + ", Address= " + this.address + ", Store= " + this.store + ", Active= " + this.active
				+ ", CreateDate= " + this.createDate + "]";
	}
}
