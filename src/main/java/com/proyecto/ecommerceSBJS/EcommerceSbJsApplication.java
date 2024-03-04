package com.proyecto.ecommerceSBJS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan(basePackages = "com.proyecto.ecommerceSBJS")
public class EcommerceSbJsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceSbJsApplication.class, args);
	}

		
	
	
	
	
	
	
	
	
	
	
	
	/*Método que se ejecuta al iniciar la aplicación
		@EventListener({ApplicationReadyEvent.class})
		public void loadApp(){
			//Persona 1
			Person person1 = personRepository.findByDniAndName("11222333x", "administrador");
			System.out.println(person1.getName());
			System.out.println(person1.getLastName());
			System.out.println(person1.getPassword());
			System.out.println(person1.getDni());
			System.out.println(person1.getEmail());
			System.out.println(person1.getUsername());
			System.out.println(person1.getBirthdate());
			System.out.println(person1.getType());
			System.out.println(person1.getTelephone());
			
			//Persona 2
			Optional<Person> optionalPerson2 = personRepository.findByDniAndCorreo("98765432A", "anaMaria@gmail.com");

			if(optionalPerson2.isPresent()){
				Person person2 = optionalPerson2.get();
				System.out.println(person2.getName());
				System.out.println(person2.getLastName());
			}

			//Persona 3
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	
			try {
				Person persona3 = new Person();
				Date birthdate = dateFormat.parse("1955-01-08");
				persona3.setDni("12121212F");
				persona3.setType(1);
				persona3.setName("Juana");
				persona3.setLastName("García");
				persona3.setUsername("Juana");
				persona3.setPassword("1234");
				persona3.setTelephone(654743321);
				persona3.setEmail("juana@gmail.com");
				persona3.setBirthdate(birthdate);

				personRepository.save(persona3);
				
			} catch (Exception e) {
				e.printStackTrace(); //Imprime método o lugar donde ocurrió la excepción.
				System.out.println("Catch: " + e.getMessage()); //Imprime motivo de la excepción
			}
		}*/
}