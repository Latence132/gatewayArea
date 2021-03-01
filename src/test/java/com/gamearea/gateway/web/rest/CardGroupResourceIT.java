package com.gamearea.gateway.web.rest;

import com.gamearea.gateway.GatewayApp;
import com.gamearea.gateway.domain.CardGroup;
import com.gamearea.gateway.repository.CardGroupRepository;
import com.gamearea.gateway.service.CardGroupService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CardGroupResource} REST controller.
 */
@SpringBootTest(classes = GatewayApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CardGroupResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private CardGroupRepository cardGroupRepository;

    @Mock
    private CardGroupRepository cardGroupRepositoryMock;

    @Mock
    private CardGroupService cardGroupServiceMock;

    @Autowired
    private CardGroupService cardGroupService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCardGroupMockMvc;

    private CardGroup cardGroup;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CardGroup createEntity(EntityManager em) {
        CardGroup cardGroup = new CardGroup()
            .name(DEFAULT_NAME);
        return cardGroup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CardGroup createUpdatedEntity(EntityManager em) {
        CardGroup cardGroup = new CardGroup()
            .name(UPDATED_NAME);
        return cardGroup;
    }

    @BeforeEach
    public void initTest() {
        cardGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createCardGroup() throws Exception {
        int databaseSizeBeforeCreate = cardGroupRepository.findAll().size();
        // Create the CardGroup
        restCardGroupMockMvc.perform(post("/api/card-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cardGroup)))
            .andExpect(status().isCreated());

        // Validate the CardGroup in the database
        List<CardGroup> cardGroupList = cardGroupRepository.findAll();
        assertThat(cardGroupList).hasSize(databaseSizeBeforeCreate + 1);
        CardGroup testCardGroup = cardGroupList.get(cardGroupList.size() - 1);
        assertThat(testCardGroup.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createCardGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardGroupRepository.findAll().size();

        // Create the CardGroup with an existing ID
        cardGroup.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardGroupMockMvc.perform(post("/api/card-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cardGroup)))
            .andExpect(status().isBadRequest());

        // Validate the CardGroup in the database
        List<CardGroup> cardGroupList = cardGroupRepository.findAll();
        assertThat(cardGroupList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCardGroups() throws Exception {
        // Initialize the database
        cardGroupRepository.saveAndFlush(cardGroup);

        // Get all the cardGroupList
        restCardGroupMockMvc.perform(get("/api/card-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCardGroupsWithEagerRelationshipsIsEnabled() throws Exception {
        when(cardGroupServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCardGroupMockMvc.perform(get("/api/card-groups?eagerload=true"))
            .andExpect(status().isOk());

        verify(cardGroupServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCardGroupsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(cardGroupServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCardGroupMockMvc.perform(get("/api/card-groups?eagerload=true"))
            .andExpect(status().isOk());

        verify(cardGroupServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCardGroup() throws Exception {
        // Initialize the database
        cardGroupRepository.saveAndFlush(cardGroup);

        // Get the cardGroup
        restCardGroupMockMvc.perform(get("/api/card-groups/{id}", cardGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cardGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingCardGroup() throws Exception {
        // Get the cardGroup
        restCardGroupMockMvc.perform(get("/api/card-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCardGroup() throws Exception {
        // Initialize the database
        cardGroupService.save(cardGroup);

        int databaseSizeBeforeUpdate = cardGroupRepository.findAll().size();

        // Update the cardGroup
        CardGroup updatedCardGroup = cardGroupRepository.findById(cardGroup.getId()).get();
        // Disconnect from session so that the updates on updatedCardGroup are not directly saved in db
        em.detach(updatedCardGroup);
        updatedCardGroup
            .name(UPDATED_NAME);

        restCardGroupMockMvc.perform(put("/api/card-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCardGroup)))
            .andExpect(status().isOk());

        // Validate the CardGroup in the database
        List<CardGroup> cardGroupList = cardGroupRepository.findAll();
        assertThat(cardGroupList).hasSize(databaseSizeBeforeUpdate);
        CardGroup testCardGroup = cardGroupList.get(cardGroupList.size() - 1);
        assertThat(testCardGroup.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCardGroup() throws Exception {
        int databaseSizeBeforeUpdate = cardGroupRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCardGroupMockMvc.perform(put("/api/card-groups")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cardGroup)))
            .andExpect(status().isBadRequest());

        // Validate the CardGroup in the database
        List<CardGroup> cardGroupList = cardGroupRepository.findAll();
        assertThat(cardGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCardGroup() throws Exception {
        // Initialize the database
        cardGroupService.save(cardGroup);

        int databaseSizeBeforeDelete = cardGroupRepository.findAll().size();

        // Delete the cardGroup
        restCardGroupMockMvc.perform(delete("/api/card-groups/{id}", cardGroup.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CardGroup> cardGroupList = cardGroupRepository.findAll();
        assertThat(cardGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
