package com.bases2.edustest;

import com.bases2.edustest.entity.Role;
import com.bases2.edustest.entity.Users;
import com.bases2.edustest.repository.UsersImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class EdustestApplication {

    public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(EdustestApplication.class, args);
		UsersImpl user = context.getBean(UsersImpl.class);
		Users usuario = user.login("mgonzalez@uniquindio.edu.co", "a1b2c3d4");
		System.out.println(user.getRecordById("ROLE", usuario.getRoleId()));
	}

}
