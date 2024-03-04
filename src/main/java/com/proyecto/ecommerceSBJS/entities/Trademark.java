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

@Table("marca")
public class Trademark {
    @Id //PK
    @Column("id_marca")
    private Integer idTrademark;

    @Column("nombre")
    private String nameTrademarkt;
}

/*PARA JPA
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;

@Entity
public class Trademark {
    @Id //PK
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Autoincrement.
    private Integer idTrademark;

    private String nameTrademarkt;

    @OneToMany(mappedBy = "trademark", cascade = CascadeType.ALL)
    private List<Product> listProduct = new ArrayList<>();
}*/
