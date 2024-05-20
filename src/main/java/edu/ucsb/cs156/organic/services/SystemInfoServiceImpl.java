package edu.ucsb.cs156.organic.services;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;

import edu.ucsb.cs156.organic.models.SystemInfo;

// This class relies on property values
// For hints on testing, see: https://www.baeldung.com/spring-boot-testing-configurationproperties

@Slf4j
@Service("systemInfo")
@ConfigurationProperties
public class SystemInfoServiceImpl extends SystemInfoService {
  
  @Value("${spring.h2.console.enabled:false}")
  private boolean springH2ConsoleEnabled;

  @Value("${app.showSwaggerUILink:false}")
  private boolean showSwaggerUILink;

  @Value("${app.sourceRepo}")
  private String sourceRepo = "https://github.com/ucsb-cs156/proj-organic";

<<<<<<< HEAD
  //@Value("${git.commit.message.short}")
  private String commitMessage = "PLACEHOLDER";

  //@Value("${git.branch}")
  private String branch = "PLACEHOLDER";

  //@Value("${git.commit.id}")
  private String commitId = "PLACEHOLDER";
=======
  @Value("${git.commit.message.short}")
  private String commitMessage = "PLACEHOLDER";

  @Value("${git.branch}")
  private String branch = "PLACEHOLDER";

  @Value("${git.commit.id}")
  private String commitIde = "PLACEHOLDER";
>>>>>>> c835d39ce311ae6427228e10e7d1151fd39965a0

  public SystemInfo getSystemInfo() {
    SystemInfo si = SystemInfo.builder()
    .springH2ConsoleEnabled(this.springH2ConsoleEnabled)
    .showSwaggerUILink(this.showSwaggerUILink)
    .sourceRepo(this.sourceRepo)
    .commitMessage(this.commitMessage)
    .branch(this.branch)
    .commitId(this.commitId)
    .githubUrl(commitId != null && sourceRepo != null ? sourceRepo + "/commits/" + commitId : null)
    .build();
  log.info("getSystemInfo returns {}",si);
  return si;
  }

}
