package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class City {
    @Id
    private int cityId;
    private String cityName;
}
