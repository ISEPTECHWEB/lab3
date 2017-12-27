package isep.web.sakila.webapi.service;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import isep.web.sakila.dao.repositories.AddressRepository;
import isep.web.sakila.jpa.entities.Address;
import isep.web.sakila.webapi.model.AddressWO;

@Service("addressService")
@Transactional
public class AddressServiceImpl implements AddressService{

	@Autowired
	private AddressRepository addressRepository;
	
	private static final Log log = LogFactory.getLog(AddressServiceImpl.class);
	
	public List<AddressWO> findAllAddresses() {
		List<AddressWO> addresses = new LinkedList<AddressWO>();

		for (Address address : addressRepository.findAll()) {
			addresses.add(new AddressWO(address));
			log.debug("Adding " + address);
		}

		return addresses;
	}

	public AddressWO findById(int id) {
		log.debug(String.format("Looking for address by Id %s", id));
		Address address = addressRepository.findOne(id);

		if (address != null) {
			return new AddressWO(address);
		}
		return null;
	}
	
	public void saveAddress(AddressWO addressWO) {
		Address address = new Address();
		address.setAddress(addressWO.getAddress());
		address.setAddress2(addressWO.getAddress2());
		address.setDistrict(addressWO.getDistrict());
		address.setPhone(addressWO.getPhone());
		address.setPostalCode(addressWO.getPostalCode());
		address.setCity(addressWO.getCity());
		address.setLastUpdate(new Timestamp(System.currentTimeMillis()));
		addressRepository.save(address);
	}

	public void updateAddress(AddressWO addressWO) {
		Address address2update = addressRepository.findOne(addressWO.getAddressId());
		address2update.setAddress(addressWO.getAddress());
		address2update.setAddress2(addressWO.getAddress2());
		address2update.setDistrict(addressWO.getDistrict());
		address2update.setPhone(addressWO.getPhone());
		address2update.setPostalCode(addressWO.getPostalCode());
		address2update.setCity(addressWO.getCity());
		address2update.setLastUpdate(new Timestamp(System.currentTimeMillis()));
		addressRepository.save(address2update);
	}
	
	@Override
	public void deleteAddressById(int id) {
		addressRepository.delete(id);
		
	}
}
