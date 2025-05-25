package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Question_Option {
    @Id
    private int optionId;
    private int questionId;
    private int isCorrect;
    private String optionText;
}
