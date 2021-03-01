package com.gamearea.gateway.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A CardGroup.
 */
@Entity
@Table(name = "card_group")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CardGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "card_group_card",
               joinColumns = @JoinColumn(name = "card_group_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "card_id", referencedColumnName = "id"))
    private Set<Card> cards = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public CardGroup name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Card> getCards() {
        return cards;
    }

    public CardGroup cards(Set<Card> cards) {
        this.cards = cards;
        return this;
    }

    public CardGroup addCard(Card card) {
        this.cards.add(card);
        card.getGroups().add(this);
        return this;
    }

    public CardGroup removeCard(Card card) {
        this.cards.remove(card);
        card.getGroups().remove(this);
        return this;
    }

    public void setCards(Set<Card> cards) {
        this.cards = cards;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CardGroup)) {
            return false;
        }
        return id != null && id.equals(((CardGroup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CardGroup{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
