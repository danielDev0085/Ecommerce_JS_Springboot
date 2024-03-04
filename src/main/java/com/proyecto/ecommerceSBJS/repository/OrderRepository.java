package com.proyecto.ecommerceSBJS.repository;

import org.springframework.data.repository.CrudRepository;

import com.proyecto.ecommerceSBJS.entities.Order;

public interface OrderRepository extends CrudRepository<Order,Integer>{
    
}
