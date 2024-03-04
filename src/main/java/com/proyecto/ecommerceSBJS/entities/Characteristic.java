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
@Table("caracteristica")
public class Characteristic {
    @Id
    @Column("id_caracteristica")
    private Integer idCharacteristic;

    @Column("caracteristica")
    private String nameCharacteristic;
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
import jakarta.persistence.OneToMany;

@Entity
public class Characteristic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCharacteristic;

    private String nameCharacteristic;

    @OneToMany(mappedBy = "characteristic", cascade = CascadeType.ALL)
    private List<SubCharacteristic> subCharacteristics = new ArrayList<>();

    //Relación muchos a muchos. Si se recupera la entidad principal también se hará la asociada. LAZY es lo contrario
    @ManyToMany (fetch = FetchType.EAGER) 
    @JoinTable(
        name = "",
        joinColumns = @JoinColumn(name = "idCharacteristic"),
        inverseJoinColumns = @JoinColumn(name = "idProduct")
    )
    private List<Product> ProductsList = new ArrayList<>();
}*/
