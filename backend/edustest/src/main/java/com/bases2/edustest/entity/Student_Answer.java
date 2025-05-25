package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Student_Answer {
    @Id
    private int studentAnswerId;
    private int studentId;
    private int examSubmittedId;
    private int selectedOptionId;
    private int fillInAnswerId;
    private int orderedAnswerId;
    private Timestamp submissionDate;
}
