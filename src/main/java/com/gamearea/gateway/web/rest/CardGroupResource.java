package com.gamearea.gateway.web.rest;

import com.gamearea.gateway.domain.CardGroup;
import com.gamearea.gateway.service.CardGroupService;
import com.gamearea.gateway.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.gamearea.gateway.domain.CardGroup}.
 */
@RestController
@RequestMapping("/api")
public class CardGroupResource {

    private final Logger log = LoggerFactory.getLogger(CardGroupResource.class);

    private static final String ENTITY_NAME = "cardGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CardGroupService cardGroupService;

    public CardGroupResource(CardGroupService cardGroupService) {
        this.cardGroupService = cardGroupService;
    }

    /**
     * {@code POST  /card-groups} : Create a new cardGroup.
     *
     * @param cardGroup the cardGroup to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cardGroup, or with status {@code 400 (Bad Request)} if the cardGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/card-groups")
    public ResponseEntity<CardGroup> createCardGroup(@RequestBody CardGroup cardGroup) throws URISyntaxException {
        log.debug("REST request to save CardGroup : {}", cardGroup);
        if (cardGroup.getId() != null) {
            throw new BadRequestAlertException("A new cardGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CardGroup result = cardGroupService.save(cardGroup);
        return ResponseEntity.created(new URI("/api/card-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /card-groups} : Updates an existing cardGroup.
     *
     * @param cardGroup the cardGroup to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cardGroup,
     * or with status {@code 400 (Bad Request)} if the cardGroup is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cardGroup couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/card-groups")
    public ResponseEntity<CardGroup> updateCardGroup(@RequestBody CardGroup cardGroup) throws URISyntaxException {
        log.debug("REST request to update CardGroup : {}", cardGroup);
        if (cardGroup.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CardGroup result = cardGroupService.save(cardGroup);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cardGroup.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /card-groups} : get all the cardGroups.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cardGroups in body.
     */
    @GetMapping("/card-groups")
    public ResponseEntity<List<CardGroup>> getAllCardGroups(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of CardGroups");
        Page<CardGroup> page;
        if (eagerload) {
            page = cardGroupService.findAllWithEagerRelationships(pageable);
        } else {
            page = cardGroupService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /card-groups/:id} : get the "id" cardGroup.
     *
     * @param id the id of the cardGroup to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cardGroup, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/card-groups/{id}")
    public ResponseEntity<CardGroup> getCardGroup(@PathVariable Long id) {
        log.debug("REST request to get CardGroup : {}", id);
        Optional<CardGroup> cardGroup = cardGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cardGroup);
    }

    /**
     * {@code DELETE  /card-groups/:id} : delete the "id" cardGroup.
     *
     * @param id the id of the cardGroup to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/card-groups/{id}")
    public ResponseEntity<Void> deleteCardGroup(@PathVariable Long id) {
        log.debug("REST request to delete CardGroup : {}", id);
        cardGroupService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
