package com.gamearea.gateway.service.impl;

import com.gamearea.gateway.service.CardGroupService;
import com.gamearea.gateway.domain.CardGroup;
import com.gamearea.gateway.repository.CardGroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CardGroup}.
 */
@Service
@Transactional
public class CardGroupServiceImpl implements CardGroupService {

    private final Logger log = LoggerFactory.getLogger(CardGroupServiceImpl.class);

    private final CardGroupRepository cardGroupRepository;

    public CardGroupServiceImpl(CardGroupRepository cardGroupRepository) {
        this.cardGroupRepository = cardGroupRepository;
    }

    @Override
    public CardGroup save(CardGroup cardGroup) {
        log.debug("Request to save CardGroup : {}", cardGroup);
        return cardGroupRepository.save(cardGroup);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CardGroup> findAll(Pageable pageable) {
        log.debug("Request to get all CardGroups");
        return cardGroupRepository.findAll(pageable);
    }


    public Page<CardGroup> findAllWithEagerRelationships(Pageable pageable) {
        return cardGroupRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CardGroup> findOne(Long id) {
        log.debug("Request to get CardGroup : {}", id);
        return cardGroupRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CardGroup : {}", id);
        cardGroupRepository.deleteById(id);
    }
}
