package com.swing.five.controller;

import com.swing.five.model.service.FiveService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/five")
@Api(tags = {"Hi-five 관리 API"})
public class FiveController {
	
	@Autowired
	private FiveService fiveService;
	
	
}
