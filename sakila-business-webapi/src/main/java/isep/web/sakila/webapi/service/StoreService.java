package isep.web.sakila.webapi.service;

import java.util.List;

import isep.web.sakila.webapi.model.StoreWO;

public interface StoreService {
	StoreWO findById(byte id);

	void saveStore(StoreWO userWO);

	void updateStore(StoreWO userWO);

	void deleteStoreById(byte id);

	List<StoreWO> findAllStores();
}
