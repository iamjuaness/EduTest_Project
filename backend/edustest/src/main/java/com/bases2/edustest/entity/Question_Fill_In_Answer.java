package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Question_Fill_In_Answer {
    @Id
    private int answerId;
    private int questionId;
    private String correctAnswer;
}
