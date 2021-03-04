package com.gamearea.gateway.service;

import com.gamearea.gateway.domain.Player;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Player}.
 */
public interface PlayerService {

    /**
     * Save a player.
     *
     * @param player the entity to save.
     * @return the persisted entity.
     */
    Player save(Player player);

    /**
     * Get all the players.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Player> findAll(Pageable pageable);


    /**
     * Get the "id" player.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Player> findOne(Long id);

    /**
     * Delete the "id" player.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Check the "name" player.
     *
     * @param name the name of the entity.
     * @return the player if exist or create ir before
     */
    Optional<Player> check(String name);
}
