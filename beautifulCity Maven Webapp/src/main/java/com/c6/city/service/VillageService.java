package com.c6.city.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.c6.city.model.Village;
@Service
public interface VillageService {
	public List<Village> findAllVillage();
}
