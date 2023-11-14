package edu.ucsb.cs156.organic.repositories;

import edu.ucsb.cs156.organic.entities.CourseStaff;
import edu.ucsb.cs156.organic.models.CourseStaffKey;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CourseStaffRepository extends CrudRepository<CourseStaff, CourseStaffKey> {
}
