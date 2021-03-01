package com.gamearea.gateway.service;

import com.gamearea.gateway.domain.Game;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Game}.
 */
public interface GameService {

    /**
     * Save a game.
     *
     * @param game the entity to save.
     * @return the persisted entity.
     */
    Game save(Game game);

    /**
     * Get all the games.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Game> findAll(Pageable pageable);

    /**
     * Get all the games with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<Game> findAllWithEagerRelationships(Pageable pageable);


    /**
     * Get the "id" game.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Game> findOne(Long id);

    /**
     * Delete the "id" game.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
