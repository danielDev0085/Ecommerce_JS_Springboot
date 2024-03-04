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
@Table("pedido")
public class Order {
    @Id
    @Column("id_pedido")
    private Integer idOrder;
    
    @Column("fecha")
    private Date dateOrder;

    @Column("precio")
    private float priceOrder;

    @Column("comprado")
    private boolean bought;

    @Column("cancelado")
    private boolean cancelled;

    @Column("id_articulo")
    private Integer idProduct;

    @Column("dni")
    private Integer dni;

    @Column("transporte")
    private String cifTransport;
}
/*PARA JPA

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOrder;
    
    private Date dateOrder;
    private float priceOrder;
    private boolean bought;
    private boolean cancelled;

    @ManyToOne
    @JoinColumn(name = "idProduct")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "dni")
    private Person person;

    @ManyToOne
    @JoinColumn(name = "cif")
    private Transport transport;
}*/
