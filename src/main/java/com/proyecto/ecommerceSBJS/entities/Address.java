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
@Table("direccion")
public class Address {
    
    @Id //PK
    @Column("id_direccion") //Nombre de columna asociada
    private Integer idAddress; //Damos el nombre que queramos a la variable asociada

    @Column("calle")
    private String street;

    @Column("numero")
    private Integer num;

    @Column("piso")
    private Integer floor;

    @Column("letra")
    private String door;

    @Column("codigo_postal")
    private Integer postalCode;

    @Column("municipio")
    private String municipality;

    @Column("provincia")
    private String province;

    @Column("otros")
    private String others;

    @Column("facturacion")
    private boolean billing;

    @Column("dni")
    private Integer dni;

}
/*PARA JPA
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Address {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idAddress;

    private String street;
    private Integer num;
    private Integer floor;
    private String door;
    private Integer postalCode;
    private String municipality;
    private String province;
    private String others;
    private boolean billing;

    @ManyToOne
    @JoinColumn(name = "dni")
    private Person person;
}*/
