package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Countries {
    @Id
    private int countryId;
    private String countryName;
}
