package com.gamearea.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.gamearea.gateway.domain.enumeration.gameState;

/**
 * A Game.
 */
@Entity
@Table(name = "game")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Game implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private gameState state;

    @ManyToOne
    @JsonIgnoreProperties(value = "games", allowSetters = true)
    private CardGroup cardGroup;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "game_player",
               joinColumns = @JoinColumn(name = "game_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "player_id", referencedColumnName = "id"))
    private Set<Player> players = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public gameState getState() {
        return state;
    }

    public Game state(gameState state) {
        this.state = state;
        return this;
    }

    public void setState(gameState state) {
        this.state = state;
    }

    public CardGroup getCardGroup() {
        return cardGroup;
    }

    public Game cardGroup(CardGroup cardGroup) {
        this.cardGroup = cardGroup;
        return this;
    }

    public void setCardGroup(CardGroup cardGroup) {
        this.cardGroup = cardGroup;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public Game players(Set<Player> players) {
        this.players = players;
        return this;
    }

    public Game addPlayer(Player player) {
        this.players.add(player);
        player.getGames().add(this);
        return this;
    }

    public Game removePlayer(Player player) {
        this.players.remove(player);
        player.getGames().remove(this);
        return this;
    }

    public void setPlayers(Set<Player> players) {
        this.players = players;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Game)) {
            return false;
        }
        return id != null && id.equals(((Game) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Game{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            "}";
    }
}
