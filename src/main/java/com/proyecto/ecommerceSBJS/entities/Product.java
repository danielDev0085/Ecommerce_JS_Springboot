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
@Table("articulo")
public class Product {

    @Id
    @Column("id_articulo")
    private long idProducto;

    @Column("modelo")
    private String modelProduct;

    @Column("precio")
    private float price;

    @Column("stock")
    private long stock;

    @Column("num_ventas")
    private long sales;

    @Column("imagen")
    private String routeImg;

    @Column("id_categoria")
    private Integer idCategory;

    @Column("id_marca")
    private Integer idTrademark;
}

/*PARA JPA 
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idProducto;

    private String modelProduct;
    private float price;
    private long stock;
    private long sales;
    private String routeImg;

    @ManyToOne //Relación muchos a uno
    @JoinColumn(name = "idCategory") //FK que apunta a tabla categoría
    private Category category;

    @ManyToOne
    @JoinColumn(name = "idTrademark") //FK
    private Trademark trademark;

    //Characteristic: mappedBy hace referencia a la lista creada en la relación de la tabla
    @ManyToMany(mappedBy = "ProductsList") 
    private List<Characteristic> characteristicsList = new ArrayList<>(); 

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<Specification> specificationsList = new ArrayList<>();

    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<Order> ordersList = new ArrayList<>();
}*/
