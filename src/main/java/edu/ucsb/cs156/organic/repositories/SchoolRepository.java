package edu.ucsb.cs156.organic.repositories;

import edu.ucsb.cs156.organic.entities.School;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;


import java.util.Optional;


@Repository
public interface SchoolRepository extends CrudRepository<School, String> {
    Optional<School> findById(String id);
}

