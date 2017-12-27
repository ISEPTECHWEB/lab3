package isep.web.sakila.webapi.model;

import isep.web.sakila.jpa.entities.Store;
import isep.web.sakila.jpa.entities.Address;
import isep.web.sakila.jpa.entities.Staff;

public class StoreWO extends WebObject{
	private static final long serialVersionUID = -1377067679473844279L;
	
	protected byte storeId;
	protected Address address;
	protected Staff staff;
	
	public StoreWO() {
		super();
	}

	public StoreWO(byte storeId, Address address, Staff staff) {
		super();
		this.storeId = storeId;
		this.address = address;
		this.staff = staff;
	}

	public StoreWO(final Store Store) {
		super();
		this.storeId = Store.getStoreId();
		this.address = Store.getAddress();
		this.staff = Store.getStaff();
	}

	public byte getStoreId() {
		return storeId;
	}

	public void setStoreId(byte storeId) {
		this.storeId = storeId;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Staff getStaff() {
		return staff;
	}

	public void setStaff(Staff staff) {
		this.staff = staff;
	}
	
	@Override
	public String toString() {
		return "Store [id=" + this.storeId + ", Address=" + this.address + ", Staff=" + this.staff + "] ";
	}
	
}
