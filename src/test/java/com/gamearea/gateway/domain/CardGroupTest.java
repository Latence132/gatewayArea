package com.gamearea.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.gamearea.gateway.web.rest.TestUtil;

public class CardGroupTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CardGroup.class);
        CardGroup cardGroup1 = new CardGroup();
        cardGroup1.setId(1L);
        CardGroup cardGroup2 = new CardGroup();
        cardGroup2.setId(cardGroup1.getId());
        assertThat(cardGroup1).isEqualTo(cardGroup2);
        cardGroup2.setId(2L);
        assertThat(cardGroup1).isNotEqualTo(cardGroup2);
        cardGroup1.setId(null);
        assertThat(cardGroup1).isNotEqualTo(cardGroup2);
    }
}
