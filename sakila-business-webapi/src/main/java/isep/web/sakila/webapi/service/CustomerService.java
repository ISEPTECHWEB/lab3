package isep.web.sakila.webapi.service;

import java.util.List;

import isep.web.sakila.webapi.model.CustomerWO;

public interface CustomerService
{
	CustomerWO findById(int id);

	void saveCustomer(CustomerWO userWO);

	void updateCustomer(CustomerWO userWO);

	void deleteCustomerById(int id);

	List<CustomerWO> findAllCustomers();

}
