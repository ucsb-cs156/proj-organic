package edu.ucsb.cs156.organic.entities;

import lombok.*;
import javax.persistence.*;
import edu.ucsb.cs156.organic.models.CourseStaffKey;


/**
 * The CourseStaff entity represents a course staff member.
 * It is a join table between the Course and User entities.
 * See: <a href="https://www.baeldung.com/jpa-many-to-many">https://www.baeldung.com/jpa-many-to-many</a>
 */

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity(name = "course_staff")
public class CourseStaff {

  @EmbeddedId
  CourseStaffKey id;

  @ManyToOne
  @MapsId("userGithubId")
  @JoinColumn(name = "user_github_id")
  User user;

  @ManyToOne
  @MapsId("courseId")
  @JoinColumn(name = "course_id")
  Course course;
}
