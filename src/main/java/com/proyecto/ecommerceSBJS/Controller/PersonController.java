package com.proyecto.ecommerceSBJS.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.ecommerceSBJS.entities.Person;
import com.proyecto.ecommerceSBJS.service.PersonService;

//RestController porque no vamos a trabajar con vistas desde SB
//Controller en el caso contrario
@RestController
@RequestMapping("/person") //Ruta para acceder a este controlador
public class PersonController {

    @Autowired
    private PersonService personService;

    Person person = new Person();

    
    /*Método para login de usuario*/
    @PostMapping("/login")
    //public int login(@RequestBody LoginForm loginform){
    public int login(@RequestParam("usuario") String username, @RequestParam("pass") String password){

        Optional<Person> optionalPerson = personService.findByUsernameAndPassword(username, password);
        if (optionalPerson.isPresent()) {
            person = optionalPerson.get();
            return person.getType();
        }else{
            return 2;
        }
    }

    /*Método para registrar un usuario*/
    @PostMapping("/save")
    public ResponseEntity<String> savePerson(@RequestBody Person person){
        try {
            personService.savePerson(person);
            return ResponseEntity.ok("Persona insertada con éxito");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al insertar persona: " + e.getMessage());
        }
    }
}