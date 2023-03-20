package com.swing.five.controller;

import com.swing.five.model.service.FiveService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/five")
@Api(tags = {"Hi-five 관리 API"})
public class FiveController {
	
	@Autowired
	private FiveService fiveService;
	
	public static final Logger logger = LoggerFactory.getLogger(FiveController.class);
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";
	private static final String ALREADY_EXIST = "already exists";
	
	@ApiOperation(value = "결과 저장", notes = "게임 결과 저장 API", response = Map.class)
	@PostMapping("")
	public ResponseEntity<?> registerUser(
			@RequestBody @ApiParam(value = "유저 ID", required = true) String userId,
			@RequestBody @ApiParam(value = "점수", required = true) Integer score) {
		
		Map<String, Object> resultMap = new HashMap<>();
		HttpStatus status;
		
		try {
			fiveService.saveResult(userId, score);
			resultMap.put("message", SUCCESS);
			status = HttpStatus.OK;
			// 회원가입 성공한 경우, 성공 메시지 반환, 200 응답 코드
		} catch (Exception e) {
			logger.error("게임 결과 저장 실패 : {}", e);
			resultMap.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			// 회원가입 중 에러 발생한 경우 실패 메시지 반환, 500 응답 코드
		}
		
		return new ResponseEntity<>(resultMap, status);
	}
	
}
