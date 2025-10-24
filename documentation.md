---
layout: default
title: Documentation
description: Complete documentation for Mail Server Factory
---

<section class="documentation">
  <div class="container">
    <div class="doc-header">
      <h1 class="doc-title" data-i18n="documentation_title">Documentation & Resources</h1>
      <p class="doc-subtitle" data-i18n="documentation_subtitle">Comprehensive guides and references for Mail Server Factory</p>
    </div>

    <div class="doc-grid">
      <!-- Getting Started -->
      <div class="doc-card">
        <div class="doc-icon">🚀</div>
        <h3 data-i18n="getting_started_title">Getting Started</h3>
        <p data-i18n="getting_started_desc">New to Mail Server Factory? Start here with installation and first deployment.</p>
        <div class="doc-links">
          <a href="#overview" class="doc-link" data-i18n="doc_link_overview">Overview</a>
          <a href="#installation" class="doc-link" data-i18n="doc_link_installation">Installation</a>
          <a href="#quick-start" class="doc-link" data-i18n="doc_link_quick_start">Quick Start</a>
        </div>
      </div>

      <!-- Configuration -->
      <div class="doc-card">
        <div class="doc-icon">⚙️</div>
        <h3 data-i18n="configuration_title">Configuration</h3>
        <p data-i18n="configuration_desc">Learn about JSON configuration system, variables, and validation.</p>
        <div class="doc-links">
          <a href="#config-system" class="doc-link" data-i18n="doc_link_config_system">Configuration System</a>
          <a href="#file-structure" class="doc-link" data-i18n="doc_link_file_structure">File Structure</a>
          <a href="#variables" class="doc-link" data-i18n="doc_link_variables">Variables</a>
        </div>
      </div>

      <!-- Deployment -->
      <div class="doc-card">
        <div class="doc-icon">🚢</div>
        <h3 data-i18n="deployment_title">Deployment</h3>
        <p data-i18n="deployment_desc">Understand the deployment pipeline and remote execution model.</p>
        <div class="doc-links">
          <a href="#deployment-overview" class="doc-link" data-i18n="doc_link_deployment_overview">Deployment Process</a>
          <a href="#docker-stack" class="doc-link" data-i18n="doc_link_docker_stack">Docker Stack</a>
          <a href="#verification" class="doc-link" data-i18n="doc_link_verification">Verification</a>
        </div>
      </div>

      <!-- Architecture -->
      <div class="doc-card">
        <div class="doc-icon">🏗️</div>
        <h3 data-i18n="architecture_title">Architecture</h3>
        <p data-i18n="architecture_desc">Explore the system architecture and component design.</p>
        <div class="doc-links">
          <a href="#system-architecture" class="doc-link" data-i18n="doc_link_system_architecture">System Architecture</a>
          <a href="#components" class="doc-link" data-i18n="doc_link_components">Components</a>
          <a href="#execution-flow" class="doc-link" data-i18n="doc_link_execution_flow">Execution Flow</a>
        </div>
      </div>

      <!-- Components -->
      <div class="doc-card">
        <div class="doc-icon">📧</div>
        <h3 data-i18n="components_title">Mail Server Components</h3>
        <p data-i18n="components_desc">Detailed information about each mail server component.</p>
        <div class="doc-links">
          <a href="#postfix" class="doc-link" data-i18n="doc_link_postfix">Postfix</a>
          <a href="#dovecot" class="doc-link" data-i18n="doc_link_dovecot">Dovecot</a>
          <a href="#rspamd" class="doc-link" data-i18n="doc_link_rspamd">Rspamd</a>
          <a href="#clamav" class="doc-link" data-i18n="doc_link_clamav">ClamAV</a>
        </div>
      </div>

      <!-- Development -->
      <div class="doc-card">
        <div class="doc-icon">💻</div>
        <h3 data-i18n="development_title">Development</h3>
        <p data-i18n="development_desc">Build system, testing infrastructure, and contribution guidelines.</p>
        <div class="doc-links">
          <a href="#build-system" class="doc-link" data-i18n="doc_link_build_system">Build System</a>
          <a href="#testing" class="doc-link" data-i18n="doc_link_testing">Testing</a>
          <a href="#distributions" class="doc-link" data-i18n="doc_link_distributions">Supported Distributions</a>
        </div>
      </div>

      <!-- Connection API -->
      <div class="doc-card">
        <div class="doc-icon">🔌</div>
        <h3 data-i18n="connection_api_title">Connection API</h3>
        <p data-i18n="connection_api_desc">12 connection types for flexible deployment across platforms.</p>
        <div class="doc-links">
          <a href="#connection-types" class="doc-link" data-i18n="doc_link_connection_types">Connection Types</a>
          <a href="#connection-pool" class="doc-link" data-i18n="doc_link_connection_pool">Connection Pool</a>
          <a href="#cloud-providers" class="doc-link" data-i18n="doc_link_cloud_providers">Cloud Providers</a>
        </div>
      </div>

      <!-- Enterprise Features -->
      <div class="doc-card">
        <div class="doc-icon">🏢</div>
        <h3 data-i18n="enterprise_title">Enterprise Features</h3>
        <p data-i18n="enterprise_desc">Security, performance, monitoring, and logging capabilities.</p>
        <div class="doc-links">
          <a href="#security" class="doc-link" data-i18n="doc_link_security">Security</a>
          <a href="#performance" class="doc-link" data-i18n="doc_link_performance">Performance</a>
          <a href="#monitoring" class="doc-link" data-i18n="doc_link_monitoring">Monitoring</a>
        </div>
      </div>

      <!-- Reference -->
      <div class="doc-card">
        <div class="doc-icon">📚</div>
        <h3 data-i18n="reference_title">Reference</h3>
        <p data-i18n="reference_desc">CLI reference, API documentation, and troubleshooting guides.</p>
        <div class="doc-links">
          <a href="#cli-reference" class="doc-link" data-i18n="doc_link_cli_reference">CLI Reference</a>
          <a href="#api-reference" class="doc-link" data-i18n="doc_link_api_reference">API Reference</a>
          <a href="#troubleshooting" class="doc-link" data-i18n="doc_link_troubleshooting">Troubleshooting</a>
        </div>
      </div>
    </div>

    <!-- Documentation Content Sections -->
    <div class="doc-content">
      
      <!-- Overview Section -->
      <section id="overview" class="doc-section">
        <h2 data-i18n="doc_what_is">What is Mail Server Factory</h2>
        <p>Mail Server Factory is a Kotlin-based automation tool that deploys complete, production-ready mail server stacks on remote Linux servers. Users provide JSON configuration files that specify target hosts, mail accounts, and service parameters. The system then performs remote installation, Docker container deployment, database initialization, and mail account creation via SSH.</p>
        
        <h3 data-i18n="doc_deployed_components">Deployed Components</h3>
        <ul>
          <li><strong>Postfix</strong> (SMTP sending on port 465)</li>
          <li><strong>Dovecot</strong> (IMAPS receiving on port 993)</li>
          <li><strong>Rspamd</strong> (anti-spam filtering)</li>
          <li><strong>ClamAV</strong> (anti-virus scanning)</li>
          <li><strong>PostgreSQL</strong> (user database)</li>
          <li><strong>Redis</strong> (Rspamd caching)</li>
        </ul>
        
        <p>All services run in isolated Docker containers with automated security, monitoring, and performance optimization.</p>
      </section>

      <!-- Installation Section -->
      <section id="installation" class="doc-section">
        <h2 data-i18n="doc_installation_methods">Installation Methods</h2>
        
        <h3 data-i18n="doc_web_installer">Web Installer (Recommended)</h3>
        <p data-i18n="doc_web_installer_desc">Quickest setup for production use:</p>
        <pre><code>curl -fsSL https://raw.githubusercontent.com/Server-Factory/Utils/master/web_installer.sh | /bin/bash</code></pre>
        
        <h3 data-i18n="doc_local_installer">Local Installer</h3>
        <p data-i18n="doc_local_installer_desc">For development or customized installation:</p>
        <pre><code>./installer.sh [install_path]</code></pre>
        
        <h3 data-i18n="doc_manual_build">Manual Build</h3>
        <p data-i18n="doc_manual_build_desc">For development and source code modifications:</p>
        <pre><code>git clone --recurse-submodules
./gradlew assemble</code></pre>
        
        <h3 data-i18n="doc_system_requirements">System Requirements</h3>
        
        <h4 data-i18n="doc_local_machine">Local Machine</h4>
        <ul>
          <li>Java 17 or higher (OpenJDK recommended)</li>
          <li>Linux, macOS, or Windows with bash</li>
          <li>Internet access for downloading dependencies</li>
        </ul>
        
        <h4 data-i18n="doc_target_server">Target Server</h4>
        <ul>
          <li>Modern Linux distribution (12 supported distributions)</li>
          <li>SSH access with key-based authentication</li>
          <li>Docker support (will be installed if missing)</li>
          <li>Root/sudo access for system modifications</li>
          <li>Ports 465 (SMTP) and 993 (IMAPS) accessible</li>
          <li>SELinux disabled or in permissive mode</li>
        </ul>
      </section>

      <!-- Configuration System Section -->
      <section id="config-system" class="doc-section">
        <h2 data-i18n="doc_configuration_system">Configuration System</h2>
        <p>Mail Server Factory uses a JSON-based configuration system with variable substitution and file inclusion. The configuration defines everything about your mail server deployment.</p>
        
        <h3 data-i18n="doc_key_features">Key Features</h3>
        <ul>
          <li><strong>Hierarchical Configuration</strong>: JSON files can include other JSON files</li>
          <li><strong>Variable Substitution</strong>: Dynamic variable resolution using `${CONTEXT.KEY}` syntax</li>
          <li><strong>Type-Safe Parsing</strong>: Configuration parsed into strongly-typed Kotlin classes</li>
          <li><strong>Validation</strong>: Comprehensive validation of emails and passwords</li>
          <li><strong>Merging</strong>: Multiple configuration files combined into final config</li>
        </ul>
        
        <h3 data-i18n="doc_basic_config_structure">Basic Configuration Structure</h3>
        <pre><code>{
  "name": "Mail Server Configuration",
  "remote": {
    "hostname": "mail.example.com",
    "username": "admin",
    "port": 22
  },
  "includes": [
    "Includes/Common.json"
  ],
  "variables": {
    "SERVER": {
      "hostname": "mail.example.com"
    }
  }
}</code></pre>
        
        <h3 data-i18n="doc_variable_substitution">Variable Substitution</h3>
        <p>Variables use the format `${CONTEXT.SUBCONTEXT.KEY}` and can reference other variables:</p>
        <pre><code>"certificate_endpoint": "https://${PROXY.HOSTNAME}:8080/api/v1/certificate"</code></pre>
      </section>

      <!-- Deployment Overview Section -->
      <section id="deployment-overview" class="doc-section">
        <h2 data-i18n="doc_deployment_process">Deployment Process</h2>
        <p>The deployment follows a sequential flow through four main stages:</p>
        
        <div class="deployment-flow">
          <div class="flow-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Initialization</h4>
              <p>Parse configuration, validate accounts, establish SSH/Docker/DB connections</p>
            </div>
          </div>
          
          <div class="flow-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Installation</h4>
              <p>Install software packages and dependencies on remote server</p>
            </div>
          </div>
          
          <div class="flow-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Docker Deployment</h4>
              <p>Deploy Docker containers for mail stack services</p>
            </div>
          </div>
          
          <div class="flow-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Database Setup</h4>
              <p>Initialize PostgreSQL database and create mail accounts</p>
            </div>
          </div>
        </div>
        
        <h3 data-i18n="doc_running_deployment">Running a Deployment</h3>
        <pre><code>mail_factory config.json</code></pre>
        
        <h3 data-i18n="doc_example_configurations">Example Configurations</h3>
        <p>The <code>Examples/</code> directory contains pre-configured files for all supported distributions:</p>
        <ul>
          <li><code>Ubuntu_22.json</code> - Ubuntu 22.04 LTS</li>
          <li><code>Debian_12.json</code> - Debian 12 Bookworm</li>
          <li><code>RHEL_9.json</code> - RHEL 9</li>
          <li><code>Fedora_Server_41.json</code> - Fedora Server 41</li>
          <li>And 8 more distributions...</li>
        </ul>
      </section>

      <!-- Mail Server Components Section -->
      <section id="components" class="doc-section">
        <h2 data-i18n="doc_mail_server_components">Mail Server Components</h2>
        
        <h3 data-i18n="doc_mail_sending">Postfix (Mail Sending)</h3>
        <p>SMTP server responsible for outgoing email delivery. Configured for:</p>
        <ul>
          <li>SMTPS on port 465</li>
          <li>TLS encryption</li>
          <li>Virtual domain hosting</li>
          <li>Integration with Dovecot for authentication</li>
        </ul>
        
        <h3 data-i18n="doc_mail_receiving">Dovecot (Mail Receiving)</h3>
        <p>IMAP/POP3 server for incoming email and mail storage. Features:</p>
        <ul>
          <li>IMAPS on port 993</li>
          <li>Maildir storage format</li>
          <li>PostgreSQL authentication backend</li>
          <li>SSL/TLS support</li>
        </ul>
        
        <h3 data-i18n="doc_anti_spam">Rspamd (Anti-Spam)</h3>
        <p>Advanced spam filtering system:</p>
        <ul>
          <li>Real-time spam scanning</li>
          <li>Machine learning filters</li>
          <li>Web UI on localhost:11334</li>
          <li>Redis integration for caching</li>
        </ul>
        
        <h3 data-i18n="doc_anti_virus">ClamAV (Anti-Virus)</h3>
        <p>Virus scanning for email attachments:</p>
        <ul>
          <li>Real-time virus database updates</li>
          <li>Integration with Rspamd</li>
          <li>Automatic quarantine of infected files</li>
        </ul>
        
        <h3 data-i18n="doc_database_services">Database Services</h3>
        <p><strong>PostgreSQL</strong>: User authentication, domains, aliases storage</p>
        <p><strong>Redis</strong>: Rspamd caching and learning data</p>
      </section>

      <!-- Testing Section -->
      <section id="testing" class="doc-section">
        <h2 data-i18n="doc_testing_infrastructure">Testing Infrastructure</h2>
        <p>Mail Server Factory includes comprehensive automated testing across 12 Linux distributions using QEMU virtualization:</p>
        
        <h3 data-i18n="doc_test_coverage">Test Coverage</h3>
        <div class="test-stats">
          <div class="test-stat">
            <div class="stat-number">47</div>
            <div class="stat-label">Total Tests</div>
          </div>
          <div class="test-stat">
            <div class="stat-number">100%</div>
            <div class="stat-label">Pass Rate</div>
          </div>
          <div class="test-stat">
            <div class="stat-number">12</div>
            <div class="stat-label">Distributions</div>
          </div>
          <div class="test-stat">
            <div class="stat-number">85%+</div>
            <div class="stat-label">Code Coverage</div>
          </div>
        </div>
        
        <h3 data-i18n="doc_supported_distributions">Supported Distributions</h3>
        <div class="dist-grid">
          <div class="dist-family">
            <h4>Debian-based</h4>
            <ul>
              <li>Ubuntu 22.04, 24.04</li>
              <li>Debian 11, 12</li>
            </ul>
          </div>
          <div class="dist-family">
            <h4>RHEL-based</h4>
            <ul>
              <li>RHEL 9</li>
              <li>AlmaLinux 9</li>
              <li>Rocky Linux 9</li>
              <li>Fedora 38-41</li>
            </ul>
          </div>
          <div class="dist-family">
            <h4>SUSE-based</h4>
            <ul>
              <li>openSUSE Leap 15.6</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Security Section -->
      <section id="security" class="doc-section">
        <h2 data-i18n="doc_security_features">Security Features</h2>
        <p>Enterprise-grade security built into every deployment:</p>
        
        <h3 data-i18n="doc_authentication_encryption">Authentication & Encryption</h3>
        <ul>
          <li>AES-256-GCM encryption for sensitive data</li>
          <li>SSH key-based authentication (no passwords)</li>
          <li>TLS certificate generation with self-signed CA</li>
          <li>SSL/TLS enforcement for mail protocols</li>
        </ul>
        
        <h3 data-i18n="doc_password_policies">Password Policies</h3>
        <ul>
          <li>MEDIUM strength requirements enforced</li>
          <li>Minimum length and complexity rules</li>
          <li>Password hashing before database storage</li>
        </ul>
        
        <h3 data-i18n="doc_system_security">System Security</h3>
        <ul>
          <li>Container isolation for all services</li>
          <li>Audit logging for all operations</li>
          <li>Session management with correlation IDs</li>
          <li>Regular security updates via Docker</li>
        </ul>
      </section>

      <!-- CLI Reference Section -->
      <section id="cli-reference" class="doc-section">
        <h2 data-i18n="doc_cli_reference">CLI Reference</h2>
        
        <h3 data-i18n="doc_basic_usage">Basic Usage</h3>
        <pre><code>mail_factory [options] configuration.json</code></pre>
        
        <h3 data-i18n="doc_common_options">Common Options</h3>
        <div class="cli-options">
          <div class="cli-option">
            <code>--help, -h</code>
            <span>Display help message</span>
          </div>
          <div class="cli-option">
            <code>--version, -v</code>
            <span>Show version information</span>
          </div>
          <div class="cli-option">
            <code>--debug</code>
            <span>Enable verbose output</span>
          </div>
          <div class="cli-option">
            <code>--dry-run</code>
            <span>Preview command without executing</span>
          </div>
          <div class="cli-option">
            <code>--jar &lt;path&gt;</code>
            <span>Specify JAR location explicitly</span>
          </div>
          <div class="cli-option">
            <code>--installation-home &lt;path&gt;</code>
            <span>Override installation directory</span>
          </div>
        </div>
        
        <h3 data-i18n="doc_environment_variables">Environment Variables</h3>
        <div class="env-vars">
          <div class="env-var">
            <code>JAVA_HOME</code>
            <span>Java installation directory</span>
          </div>
          <div class="env-var">
            <code>JAVA_OPTS</code>
            <span>JVM options (e.g., -Xmx4g)</span>
          </div>
          <div class="env-var">
            <code>MAIL_FACTORY_HOME</code>
            <span>Override JAR search location</span>
          </div>
        </div>
        
        <h3 data-i18n="doc_exit_codes">Exit Codes</h3>
        <div class="exit-codes">
          <div class="exit-code">
            <code>0</code>
            <span>Success - deployment completed</span>
          </div>
          <div class="exit-code">
            <code>2</code>
            <span>Java not found or wrong version</span>
          </div>
          <div class="exit-code">
            <code>3</code>
            <span>JAR file not found</span>
          </div>
          <div class="exit-code">
            <code>4</code>
            <span>Invalid command line arguments</span>
          </div>
          <div class="exit-code">
            <code>5</code>
            <span>Configuration file not found</span>
          </div>
        </div>
      </section>

      <!-- Connection API Section -->
      <section id="connection-types" class="doc-section">
        <h2 data-i18n="doc_connection_api">Connection API - 12 Connection Types</h2>
        <p>Mail Server Factory provides a comprehensive connection abstraction layer supporting 12 different connection types for maximum deployment flexibility.</p>

        <h3 data-i18n="doc_standard_connections">Standard Connections</h3>
        <div class="connection-grid">
          <div class="connection-item">
            <h4>1. SSH Connection</h4>
            <p>Standard SSH protocol for remote server access with key-based authentication.</p>
            <ul>
              <li>Command execution and file transfer</li>
              <li>Connection pooling for performance</li>
              <li>Automatic reconnection handling</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>2. Docker Connection</h4>
            <p>Direct Docker daemon communication for container management.</p>
            <ul>
              <li>Container lifecycle operations</li>
              <li>Volume and network management</li>
              <li>Image pull and build operations</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>3. Kubernetes Connection</h4>
            <p>Kubernetes cluster management and orchestration.</p>
            <ul>
              <li>Pod and deployment operations</li>
              <li>Service mesh integration</li>
              <li>ConfigMap and Secret management</li>
            </ul>
          </div>
        </div>

        <h3 data-i18n="doc_cloud_connections">Cloud Provider Connections</h3>
        <div class="connection-grid">
          <div class="connection-item">
            <h4>4. AWS SSM Connection</h4>
            <p>AWS Systems Manager Session Manager for secure EC2 access.</p>
            <ul>
              <li>No inbound ports required</li>
              <li>IAM-based authentication</li>
              <li>Session logging and auditing</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>5. Azure Serial Console</h4>
            <p>Azure VM serial console for emergency access.</p>
            <ul>
              <li>Access when SSH unavailable</li>
              <li>Boot diagnostics integration</li>
              <li>Direct VM console access</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>6. GCP OS Login</h4>
            <p>Google Cloud Platform OS Login with IAM integration.</p>
            <ul>
              <li>IAM-based SSH access</li>
              <li>Two-factor authentication</li>
              <li>Centralized user management</li>
            </ul>
          </div>
        </div>

        <h3 data-i18n="doc_specialized_connections">Specialized Connections</h3>
        <div class="connection-grid">
          <div class="connection-item">
            <h4>7. Libvirt Connection</h4>
            <p>KVM/QEMU virtualization management.</p>
            <ul>
              <li>VM lifecycle operations</li>
              <li>Virtual network management</li>
              <li>Storage pool operations</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>8. Custom Protocol</h4>
            <p>Extensible connection interface for custom protocols.</p>
            <ul>
              <li>Plugin architecture</li>
              <li>User-defined connection logic</li>
              <li>Protocol-agnostic design</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>9. Database Connection</h4>
            <p>Direct database access and management.</p>
            <ul>
              <li>SQL execution and migrations</li>
              <li>Connection pooling</li>
              <li>Transaction management</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>10. File System Connection</h4>
            <p>Local and remote file system operations.</p>
            <ul>
              <li>NFS and CIFS support</li>
              <li>File synchronization</li>
              <li>Mount management</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>11. Cloud Provider</h4>
            <p>Multi-cloud provider abstraction.</p>
            <ul>
              <li>AWS, Azure, GCP unified interface</li>
              <li>Resource provisioning</li>
              <li>Cost optimization</li>
            </ul>
          </div>

          <div class="connection-item">
            <h4>12. Container Runtime</h4>
            <p>OCI-compliant container runtime support.</p>
            <ul>
              <li>Podman, containerd, CRI-O</li>
              <li>Runtime abstraction layer</li>
              <li>Cross-runtime compatibility</li>
            </ul>
          </div>
        </div>

        <h3 id="connection-pool" data-i18n="doc_connection_pool_mgmt">Connection Pool Management</h3>
        <p>All connections are managed through the <strong>ConnectionPool</strong> which provides:</p>
        <ul>
          <li><strong>Connection Reuse</strong>: Efficient connection lifecycle management</li>
          <li><strong>Automatic Reconnection</strong>: Handles transient failures gracefully</li>
          <li><strong>Thread Safety</strong>: Concurrent connection access</li>
          <li><strong>Resource Cleanup</strong>: Automatic disposal and cleanup</li>
          <li><strong>Health Monitoring</strong>: Connection health checks</li>
        </ul>

        <h3 data-i18n="doc_usage_example">Usage Example</h3>
        <pre><code>// Create SSH connection
val sshConnection = SSHConnection(hostname, username, port)

// Execute command
val result = sshConnection.execute("docker ps -a")

// Connection automatically managed by ConnectionPool
// No manual cleanup required
</code></pre>
      </section>

      <!-- Troubleshooting Section -->
      <section id="troubleshooting" class="doc-section">
        <h2 data-i18n="doc_troubleshooting">Troubleshooting</h2>
        
        <h3 data-i18n="doc_common_issues">Common Issues</h3>
        
        <div class="troubleshoot-item">
          <h4 data-i18n="doc_ssh_issue">SSH Connection Failed</h4>
          <p><strong>Cause:</strong> SSH key not configured or network issue</p>
          <p><strong>Solution:</strong></p>
          <ul>
            <li>Verify SSH key-based authentication: <code>ssh user@target</code></li>
            <li>Check network connectivity: <code>ping target-hostname</code></li>
            <li>Ensure SSH server is running on port 22</li>
          </ul>
        </div>
        
        <div class="troubleshoot-item">
          <h4 data-i18n="doc_docker_issue">Docker Deployment Failed</h4>
          <p><strong>Cause:</strong> Docker not installed or conflicting containers</p>
          <p><strong>Solution:</strong></p>
          <ul>
            <li>Check Docker installation: <code>docker --version</code></li>
            <li>Remove conflicting containers: <code>docker ps -a</code></li>
            <li>Verify Docker service status: <code>systemctl status docker</code></li>
          </ul>
        </div>
        
        <div class="troubleshoot-item">
          <h4 data-i18n="doc_config_issue">Configuration Validation Failed</h4>
          <p><strong>Cause:</strong> Invalid email format or weak password</p>
          <p><strong>Solution:</strong></p>
          <ul>
            <li>Verify email format: <code>user@domain.com</code></li>
            <li>Check password strength (minimum 8 characters, mixed case, numbers)</li>
            <li>Validate JSON syntax using online validator</li>
          </ul>
        </div>
        
        <div class="troubleshoot-item">
          <h4 data-i18n="doc_account_issue">Mail Account Creation Failed</h4>
          <p><strong>Cause:</strong> Database connection issue or account validation error</p>
          <p><strong>Solution:</strong></p>
          <ul>
            <li>Check PostgreSQL container status: <code>docker ps | grep postmaster_db</code></li>
            <li>Verify database connectivity: <code>docker exec postmaster_db psql -l</code></li>
            <li>Review deployment logs for specific error messages</li>
          </ul>
        </div>
        
        <h3>Getting Help</h3>
        <ul>
          <li>Check deployment logs in <code>${INSTALLATION_HOME}/</code></li>
          <li>Enable debug mode: <code>mail_factory --debug config.json</code></li>
          <li>Review configuration files for syntax errors</li>
          <li>Consult GitHub issues for known problems</li>
        </ul>
      </section>

    </div>
  </div>
</section>

<style>
.documentation {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.doc-header {
  text-align: center;
  margin-bottom: 4rem;
}

.doc-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.doc-subtitle {
  font-size: 1.25rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
}

.doc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.doc-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.doc-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.doc-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.doc-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.doc-card p {
  color: #6c757d;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.doc-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.doc-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #e9ecef;
  color: #495057;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.doc-link:hover {
  background: #4a90e2;
  color: white;
}

.doc-content {
  max-width: 1000px;
  margin: 0 auto;
}

.doc-section {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.doc-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
  border-bottom: 3px solid #4a90e2;
  padding-bottom: 1rem;
}

.doc-section h3 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #34495e;
  margin: 2rem 0 1rem 0;
}

.doc-section h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #495057;
  margin: 1.5rem 0 1rem 0;
}

.doc-section ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

.doc-section li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
  color: #495057;
}

.doc-section pre {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
}

.doc-section code {
  background: #e9ecef;
  color: #c7254e;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
}

.deployment-flow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  background: #4a90e2;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.test-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.test-stat {
  text-align: center;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #4a90e2;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6c757d;
  font-size: 0.875rem;
}

.dist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.dist-family {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #4a90e2;
}

.cli-options, .env-vars, .exit-codes {
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
}

.cli-option, .env-var, .exit-code {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  align-items: center;
}

.troubleshoot-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 2rem;
  margin: 2rem 0;
}

.troubleshoot-item h4 {
  color: #dc3545;
  margin-top: 0;
}

.connection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.connection-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  border-left: 4px solid #4a90e2;
}

.connection-item h4 {
  color: #2c3e50;
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
}

.connection-item p {
  color: #6c757d;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.connection-item ul {
  margin: 0;
  padding-left: 1.5rem;
}

.connection-item li {
  color: #495057;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .doc-title {
    font-size: 2rem;
  }
  
  .doc-section {
    padding: 2rem 1rem;
  }
  
  .doc-section h2 {
    font-size: 2rem;
  }
  
  .deployment-flow {
    grid-template-columns: 1fr;
  }
  
  .test-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cli-option, .env-var, .exit-code {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>