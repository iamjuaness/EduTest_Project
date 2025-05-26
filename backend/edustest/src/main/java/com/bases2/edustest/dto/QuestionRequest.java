package com.bases2.edustest.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class QuestionRequest {
    private int questionId;
    private int topicId;
    private int typeId;
    private int questionSubquestionId;
    private boolean isPublic;
    private int timeMax;
    private int questionWeight;
    private String questionText;
    private int versionNumber;
    private String retiredDate;
    private List<?> options;
}
