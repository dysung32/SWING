package com.swing.doodle.controller;

import com.swing.doodle.model.service.DoodleService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/doodle")
@Api(tags = {"Speedoodle 관리 API"})
public class DoodleController {
	
	@Autowired
	private DoodleService doodleService;
	
}
