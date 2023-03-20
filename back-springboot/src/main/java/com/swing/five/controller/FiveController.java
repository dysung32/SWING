package com.swing.five.controller;

import com.swing.user.model.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/user")
@Api(tags = {"회원 관리 API"})
public class FiveController {
	
	@Autowired
	private UserService userService;
	
	@ApiOperation(value = "Swagger Test", notes = "뭐요!", response = Map.class)
	@GetMapping("")
	public ResponseEntity<?> test() {
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status = HttpStatus.OK;
		resultMap.put("message", userService.test());
		
		return new ResponseEntity<>(resultMap, status);
	}
	
}
