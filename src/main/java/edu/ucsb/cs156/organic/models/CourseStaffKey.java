package edu.ucsb.cs156.organic.models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class CourseStaffKey implements Serializable {

    @Column(name = "user_githubId")
    Integer userGithubId;

    @Column(name = "course_id")
    Long courseId;
}