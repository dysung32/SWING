package com.swing.doodle.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetGameHistoryDto {
	private int rank;
	private String roomName;
	private LocalDateTime playTime;
}
