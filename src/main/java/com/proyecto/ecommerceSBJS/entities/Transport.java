package com.proyecto.ecommerceSBJS.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data //Getters and setters
@NoArgsConstructor //Constructor sin argumentos
@AllArgsConstructor //Constructor con todos los argumentos

@Table("transporte")
public class Transport{
    @Id
    @Column("cif")
    private String cif;

    @Column("transporte")
    private String nameTransport;

    @Column("telefono")
    private Integer telephone;

    @Column("correo")
    private String mail;

    @Column("dias_entrega")
    private Integer deliveryDays;
}

/*PARA JPA

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Transport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String cif;

    private String nameTransport;
    private Integer telephone;
    private String mail;
    private int deliveryDays;

    @OneToMany(mappedBy = "transport", cascade = CascadeType.ALL)
    private List<Order> ordersList = new ArrayList<>();
}*/
