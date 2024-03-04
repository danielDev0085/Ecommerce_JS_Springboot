package com.proyecto.ecommerceSBJS.service.Implement;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.ecommerceSBJS.entities.Person;
import com.proyecto.ecommerceSBJS.repository.PersonRepository;
import com.proyecto.ecommerceSBJS.service.PersonService;

@Service
public class PersonServiceImplement implements PersonService{
    //Inyectar repository
    @Autowired
    private PersonRepository personRepository;

    @Override
    public void deletePerson(Person person) {
        personRepository.delete(person);
    }

    @Override
    public Iterable<Person> findAllPerson() {
        return personRepository.findAll();
    }

    @Override
    public Optional<Person> findByDni(String dni) {
        return personRepository.findByDni(dni);
    }

    @Override
    public Optional<Person> findByUsernameAndPassword(String username, String password) {
        return personRepository.findByUsernameAndPassword(username, password);
    }

    @Override
    public void savePerson(Person person) {
        personRepository.savePerson(
            person.getDni(),
            person.getType(),
            person.getName(),
            person.getLastName(),
            person.getUsername(),
            person.getPassword(),
            person.getTelephone(),
            person.getEmail(),
            person.getBirthdate()
        );
    }

    @Override
    public Person updatePerson(Person person) {
        return personRepository.save(person);
    }
    
}
