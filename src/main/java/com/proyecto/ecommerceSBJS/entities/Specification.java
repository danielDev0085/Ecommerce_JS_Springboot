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

@Table("especificacion")
public class Specification {
    @Id
    @Column("id_especificacion")
    private Integer idSpecification;

    @Column("especificacion")
    private String nameSpecification;

    @Column("contenido")
    private String contentSpecification;

    @Column("id_articulo")
    private Integer idProduct;
}

/*PARA JPA
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Specification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSpecification;

    private String nameSpecification;
    private String contentSpecification;

    @ManyToOne
    @JoinColumn(name = "idProduct") //FK
    private Product product;
}*/
