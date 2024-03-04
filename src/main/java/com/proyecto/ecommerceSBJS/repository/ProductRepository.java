package com.proyecto.ecommerceSBJS.repository;

import org.springframework.data.repository.CrudRepository;

import com.proyecto.ecommerceSBJS.entities.Product;

public interface ProductRepository extends CrudRepository<Product,Integer>{
    
}
