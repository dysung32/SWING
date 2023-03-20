package com.swing.sentency.controller;

import com.swing.sentency.model.service.SentencyService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/sentency")
@Api(tags = {"회원 관리 API"})
public class SentencyController {
	
	@Autowired
	private SentencyService sentencyService;
	
}
