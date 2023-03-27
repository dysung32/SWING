package com.swing.doodle.model.repository;

import com.swing.doodle.model.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
	
	Room findByLeader_UserId (String leaderId);
	
	List<Room> findAllByRoomIdLike (int keyword);
	
	List<Room> findAllByNameContaining (String keyword);
	
	Room findByRoomId (int roomId);
}
