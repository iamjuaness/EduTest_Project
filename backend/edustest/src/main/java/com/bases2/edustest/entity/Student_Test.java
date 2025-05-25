package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Student_Test {
    @Id
    private int testId;
    @Id
    private int userId;
    @Id
    private int attemptNumber;
    private int statusId;
    private Date submittedAt;
    private float score;
}
