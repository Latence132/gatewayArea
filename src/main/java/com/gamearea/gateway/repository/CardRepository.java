package com.gamearea.gateway.repository;

import java.util.List;
import java.util.Optional;

import com.gamearea.gateway.domain.Card;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Card entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    @Override
    List<Card> findAll();
}
