package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Course_Group {
    @Id
    private int groupId;
    private int courseId;
    private int classroomId;
    private String groupDescription;
}
