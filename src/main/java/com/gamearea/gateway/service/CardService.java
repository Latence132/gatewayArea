package com.gamearea.gateway.service;

import java.util.List;
import java.util.Optional;

import com.gamearea.gateway.domain.Card;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Card}.
 */
public interface CardService {

    /**
     * Save a card.
     *
     * @param card the entity to save.
     * @return the persisted entity.
     */
    Card save(Card card);

    /**
     * Get all the cards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Card> findAll(Pageable pageable);

    /**
     * Get all the cards.
     *
     * @return the list of cards.
     */
    List<Card> findAll();

    /**
     * Get the "id" card.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Card> findOne(Long id);

    /**
     * Delete the "id" card.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
