package isep.web.sakila.webapi.service;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import isep.web.sakila.dao.repositories.StoreRepository;
import isep.web.sakila.jpa.entities.Store;
import isep.web.sakila.webapi.model.StoreWO;

@Service("StoreService")
@Transactional
public class StoreServiceImpl implements StoreService {
	@Autowired
	private StoreRepository storeRepository;

	private static final Log log = LogFactory.getLog(StoreServiceImpl.class);

	public List<StoreWO> findAllStores() {
		List<StoreWO> stores = new LinkedList<StoreWO>();

		for (Store store : storeRepository.findAll()) {
			stores.add(new StoreWO(store));
			log.debug("Adding " + store);
		}

		return stores;
	}

	public StoreWO findById(byte id) {
		log.debug(String.format("Looking for store by Id %s", id));
		Store store = storeRepository.findOne(id);

		if (store != null) {
			return new StoreWO(store);
		}
		return null;
	}

	public void saveStore(StoreWO storeWO) {
		Store store = new Store();
		store.setAddress(storeWO.getAddress());
		store.setStaff(storeWO.getStaff());
		store.setLastUpdate(new Timestamp(System.currentTimeMillis()));
		storeRepository.save(store);
	}

	public void updateStore(StoreWO storeWO) {
		Store store2update = storeRepository.findOne(storeWO.getStoreId());
		store2update.setAddress(storeWO.getAddress());
		store2update.setStaff(storeWO.getStaff());
		store2update.setLastUpdate(new Timestamp(System.currentTimeMillis()));
		storeRepository.save(store2update);
	}

	@Override
	public void deleteStoreById(byte id) {
		storeRepository.delete(id);
		
	}

}
