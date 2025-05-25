package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Course {
    @Id
    private int courseId;
    private String courseName;
    private String schedule;
    private String courseDescription;
}
