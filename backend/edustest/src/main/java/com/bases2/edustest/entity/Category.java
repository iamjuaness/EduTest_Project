package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Category {
    @Id
    private int categoryId;
    private String categoryDescription;
}
