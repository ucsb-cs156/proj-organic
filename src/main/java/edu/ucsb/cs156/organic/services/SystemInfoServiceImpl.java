package edu.ucsb.cs156.organic.services;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;

import edu.ucsb.cs156.organic.models.SystemInfo;

// This class relies on property values
// For hints on testing, see: https://www.baeldung.com/spring-boot-testing-configurationproperties
@PropertySources(
  @PropertySource("classpath:git.properties")
)
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

  @Value("${git.commit.message.short:unknown}")
  private String commitMessage;

  @Value("${git.commit.id.abbrev:unknown}")
  private String commitId;

  public static String githubUrl(String repo, String commit) {
    return commit != null && repo != null ? repo + "/commit/" + commit : null;
  }

  public SystemInfo getSystemInfo() {
    SystemInfo si = SystemInfo.builder()
    .springH2ConsoleEnabled(this.springH2ConsoleEnabled)
    .showSwaggerUILink(this.showSwaggerUILink)
    .sourceRepo(this.sourceRepo)
    .commitMessage(this.commitMessage)
    .commitId(this.commitId)
    .githubUrl(githubUrl(this.sourceRepo, this.commitId))
    .build();
  log.info("getSystemInfo returns {}",si);
  return si;
  }

}
