package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Question_Test {
    @Id
    private int testId;
    @Id
    private int questionId;
}
