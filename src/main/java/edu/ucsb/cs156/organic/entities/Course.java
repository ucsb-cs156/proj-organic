package edu.ucsb.cs156.organic.entities;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity(name = "courses")
public class Course {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private String name;
  private String school;
  private String term;
  private LocalDateTime start;
  private LocalDateTime end;
  private String githubOrg;

 
  @OneToMany(mappedBy = "course", cascade = CascadeType.REMOVE)
  Set<CourseStaff> staffMembers;

}
