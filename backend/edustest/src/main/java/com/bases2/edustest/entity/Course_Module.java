package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Course_Module {
    @Id
    private int moduleId;
    private int courseId;
    private int topicId;
    private String moduleName;
    private String content;
}
