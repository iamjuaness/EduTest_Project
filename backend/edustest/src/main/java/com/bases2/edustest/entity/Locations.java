package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Locations {
    @Id
    private int locationId;
    private int countryId;
    private int cityId;
    private String postalCode;
    private String streetAddress;
}
