package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Exam_Submitted {
    @Id
    private int examSubmittedId;
    private int studentTestUserId;
    private Date presentatuonDate;
    private String ipAddress;
    private int timeSpent;
    private float score;
}
