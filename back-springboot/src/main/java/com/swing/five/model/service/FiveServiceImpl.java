package com.swing.five.model.service;

import com.swing.five.model.entity.Five;
import com.swing.five.model.repository.FiveRepository;
import com.swing.user.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FiveServiceImpl implements FiveService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private FiveRepository fiveRepository;
	
	@Override
	public Five saveResult (String userId, Integer score) {
		Five five = new Five();
		five.setUser(userRepository.findByUserId(userId));
		five.setScore(score);
		return fiveRepository.save(five);
	}
	
}
