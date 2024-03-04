package com.proyecto.ecommerceSBJS.repository;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.proyecto.ecommerceSBJS.entities.Person;

@Repository
public interface PersonRepository extends CrudRepository<Person, String>{

    //Los find identifican las columnas a las que nos referimos por sus nombres separados por And
    //Buscar por dni
    public Optional<Person> findByDni(String dni);

    //Buscar por nombre de usuario y password
    public Optional<Person> findByUsernameAndPassword(String username, String password);

    //Guardar usuario
    @Modifying //Para indicar que hará cambios en la BD (insert, delete y update)
    @Query("INSERT INTO USUARIO values (:dni, :type, :name, :lastName, :username, :password, :telephone, :email, :birthdate)")
    public void savePerson(
        @Param("dni") String dni,
        @Param("type") Integer type,
        @Param("name") String name,
        @Param("lastName") String lastName,
        @Param("username") String username,
        @Param("password") String password,
        @Param("telephone") Integer telephone,
        @Param("email") String email,
        @Param("birthdate") Date birthdate
    );
    
    
    
    
    
    /*EJEMPLOS CONSULTAS DERIVADAS Y PROPIAS
    //@Query para consultas propias
    //Optional para que no genere error si la consulta devuelte un valor NULL 
    //@Param asigna un valor al parámetro y se utilizará en la consulta (where dni = :?), sino (where dni = ?1)
    //Aquí se utiliza en la consulta los nombres reales de los campos de las tablas
    @Query("SELECT * FROM usuario WHERE dni=:dni AND correo=:mail")
    Optional<Person> findByDniAndCorreo(@Param("dni") String dni, @Param("mail") String email);

    //Consulta derivada (Identifica los campos separados por AND y pasamos parámetros)
    //Aquí se utilizan los nombres de las variables que referencian a los campos de la tabla
    public Person findByDniAndName(String dni, String name);*/

    /*
    JPA
    public Interface PersonRepository extends JPARepository<Person,Integer>{

    }*/
}