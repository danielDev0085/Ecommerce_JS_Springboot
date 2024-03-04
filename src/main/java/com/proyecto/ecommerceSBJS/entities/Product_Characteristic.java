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
@Table("articulo_caracteristica")
public class Product_Characteristic {
    @Id
    @Column("id_art_caracteristica")
    private Integer idArtCharacteristic;

    @Column("sub_caracteristica")
    private String subCharacteristic;

    @Column("id_articulo")
    private Integer idProduct;

    @Column("id_caracteristica")
    private Integer idCharacteristic;
}

/*PARA JPA (ESTE MÉTODO HABRÍA QUE CAMBIARLO)

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class SubCharacteristic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSubCharacteristic;

    private String nameCharacteristic;

    @ManyToOne
    @JoinColumn(name = "idCharacteristic")
    private Characteristic characteristic;
}*/
