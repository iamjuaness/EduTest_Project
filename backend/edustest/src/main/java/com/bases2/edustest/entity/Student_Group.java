package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Student_Group {
    @Id
    private int studentId;
    @Id
    private int groupId;
    private Date enrollmentDate;
}
