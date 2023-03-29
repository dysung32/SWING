package com.swing.doodle.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoundResultSaveDto {
	private String userId;
	private int roundId;
	private double time;
	private MultipartFile image;
}
