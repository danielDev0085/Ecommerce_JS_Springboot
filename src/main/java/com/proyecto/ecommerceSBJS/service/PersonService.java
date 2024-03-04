package com.proyecto.ecommerceSBJS.service;

import java.util.Optional;

import com.proyecto.ecommerceSBJS.entities.Person;

public interface PersonService {
    //Métodos 
    void savePerson(Person person);

    void deletePerson(Person person);

    Person updatePerson(Person person);

    Optional<Person> findByDni(String dni);

    Iterable<Person> findAllPerson();

    Optional<Person> findByUsernameAndPassword(String username, String password);
}
