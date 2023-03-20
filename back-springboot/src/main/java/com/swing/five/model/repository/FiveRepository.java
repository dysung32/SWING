package com.swing.five.model.repository;

import com.swing.five.model.entity.Five;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FiveRepository extends JpaRepository<Five, Integer> {

}
