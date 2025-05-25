package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Question_Orden_Item {
    @Id
    private int orderItemId;
    private int questionId;
    private int correctPosition;
    private String itemText;
}
