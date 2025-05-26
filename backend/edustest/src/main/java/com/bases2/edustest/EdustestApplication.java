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
		SpringApplication.run(EdustestApplication.class, args);
	}

}
