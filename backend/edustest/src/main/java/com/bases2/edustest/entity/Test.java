package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Test {
    @Id
    private int testId;
    private int categoryId;
    private int groupId;
    private int moduleId;
    private Date startDate;
    private Date endDate;
    private int questionsQuantity;
    private int questionsShown;
    private int timeLimit;
    private float weightInCourse;
    private float approvalThreshold;
    private String testName;
    private String testDescription;
}
