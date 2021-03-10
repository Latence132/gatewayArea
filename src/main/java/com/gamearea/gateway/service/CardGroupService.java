package com.gamearea.gateway.service;

import java.util.List;
import java.util.Optional;

import com.gamearea.gateway.domain.CardGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link CardGroup}.
 */
public interface CardGroupService {

    /**
     * Save a cardGroup.
     *
     * @param cardGroup the entity to save.
     * @return the persisted entity.
     */
    CardGroup save(CardGroup cardGroup);

    /**
     * Get all the cardGroups.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CardGroup> findAll(Pageable pageable);

    /**
     * Get all the cardGroups.
     *
     * @return the list of entities.
     */
    List<CardGroup> findAll2();

    /**
     * Get all the cardGroups with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<CardGroup> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" cardGroup.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CardGroup> findOne(Long id);

    /**
     * Delete the "id" cardGroup.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
