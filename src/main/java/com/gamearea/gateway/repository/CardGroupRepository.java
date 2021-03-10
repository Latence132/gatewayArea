package com.gamearea.gateway.repository;

import com.gamearea.gateway.domain.CardGroup;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data repository for the CardGroup entity.
 */
@Repository
public interface CardGroupRepository extends JpaRepository<CardGroup, Long> {

    @Query(value = "select distinct cardGroup from CardGroup cardGroup left join fetch cardGroup.cards", countQuery = "select count(distinct cardGroup) from CardGroup cardGroup")
    Page<CardGroup> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct cardGroup from CardGroup cardGroup left join fetch cardGroup.cards")
    List<CardGroup> findAllWithEagerRelationships();

    @Query("select cardGroup from CardGroup cardGroup left join fetch cardGroup.cards where cardGroup.id =:id")
    Optional<CardGroup> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct cardGroup from CardGroup cardGroup left join fetch cardGroup.cards")
    List<CardGroup> findAll2();
}
