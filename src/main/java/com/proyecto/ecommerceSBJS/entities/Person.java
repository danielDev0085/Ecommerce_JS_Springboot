package com.proyecto.ecommerceSBJS.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data //Getters and setters
@NoArgsConstructor //Constructor sin argumentos
@AllArgsConstructor //Constructor con todos los argumentos
@Table("USUARIO")
public class Person {
    @Id
    @Column("dni")
    private String dni;

    @Column("tipo")
    private Integer type;

    @Column("nombre")
    private String name;

    @Column("apellidos")
    private String lastName;

    @Column("usuario")
    private String username;

    @Column("pass")
    private String password;

    @Column("telefono")
    private Integer telephone;

    @Column("correo")
    private String email;

    @Column("fecha_nacimiento")
    private Date birthdate;
}

/*PARA JPA
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String dni;

    private boolean type;
    private String name;
    private String lastName;
    private String username;
    private String password;
    private int telephone;
    private String mail;
    private Date birthdate;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Order> orderList = new ArrayList<>();

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Address> addressesList = new ArrayList<>();
}*/
