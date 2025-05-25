package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Question {
    @Id
    private int questionId;
    private int teacherId;
    private int topicId;
    private int typeId;
    private int questionSubquestionId;
    private int isPublic;
    private int timeMax;
    private float questionWeight;
    private String questionText;
}
