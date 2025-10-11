---
layout: home
title: Mail Server Factory - Enterprise Mail Server Automation
description: Deploy production-ready mail server infrastructure with zero hassle
---

<section class="hero">
  <div class="hero-content">
    <div class="hero-badge">
      <span class="badge-text">100% Test Success</span>
      <span class="badge-divider">•</span>
      <span class="badge-text">47 Tests Passing</span>
      <span class="badge-divider">•</span>
      <span class="badge-text">Production Ready</span>
    </div>
    <h1 class="hero-title">Run Your Mail Server <span class="highlight">Like The Boss</span></h1>
    <p class="hero-subtitle">Enterprise-grade mail server automation powered by Kotlin, Docker, and proven technology. Deploy complete mail infrastructure with a single JSON configuration file.</p>
    <div class="hero-cta">
      <a href="https://github.com/Server-Factory/Mail-Server-Factory/releases" class="btn btn-primary" target="_blank">
        <span class="btn-icon">⬇</span> Download Latest Release
      </a>
      <a href="https://github.com/Server-Factory/Mail-Server-Factory" class="btn btn-secondary" target="_blank">
        <span class="btn-icon">⭐</span> View on GitHub
      </a>
    </div>
    <div class="hero-stats">
      <div class="stat">
        <div class="stat-value">Kotlin 2.0.21</div>
        <div class="stat-label">Modern Language</div>
      </div>
      <div class="stat">
        <div class="stat-value">Docker-Based</div>
        <div class="stat-label">Container Ready</div>
      </div>
      <div class="stat">
        <div class="stat-value">6 Services</div>
        <div class="stat-label">Complete Stack</div>
      </div>
      <div class="stat">
        <div class="stat-value">JSON Config</div>
        <div class="stat-label">Simple Setup</div>
      </div>
    </div>
  </div>
</section>

<section class="features">
  <div class="container">
    <h2 class="section-title">Why Mail Server Factory?</h2>
    <p class="section-subtitle">Enterprise features without the enterprise complexity</p>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Zero-Touch Deployment</h3>
        <p>Write a simple JSON configuration file and let Mail Server Factory handle everything - from installation to initialization. No manual configuration needed.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🐳</div>
        <h3>Docker Native</h3>
        <p>Every component runs in its own Docker container, ensuring isolation, scalability, and easy management. Deploy on any Docker-capable host.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Security Built-In</h3>
        <p>Automatic TLS certificate generation with self-signed CA, SSH key-based authentication, and industry-standard security practices out of the box.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h3>Battle-Tested Code</h3>
        <p>100% test execution success rate with 47 comprehensive tests. Every component is validated before release.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🔧</div>
        <h3>SSH-Based Remote Execution</h3>
        <p>Deploy to remote servers via SSH with connection pooling, automatic file transfers, and robust error handling.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📦</div>
        <h3>Complete Stack</h3>
        <p>Postfix, Dovecot, PostgreSQL, Rspamd, Redis, and ClamAV pre-configured and working together seamlessly.</p>
      </div>
    </div>
  </div>
</section>

<section class="tech-stack">
  <div class="container">
    <h2 class="section-title">Technology Stack</h2>
    <p class="section-subtitle">Powered by industry-leading open source technologies</p>

    <div class="stack-grid">
      <div class="tech-item">
        <div class="tech-icon">📮</div>
        <h4>Postfix</h4>
        <p>SMTP Server</p>
      </div>
      <div class="tech-item">
        <div class="tech-icon">📧</div>
        <h4>Dovecot</h4>
        <p>IMAP/POP3 Server</p>
      </div>
      <div class="tech-item">
        <div class="tech-icon">🗄️</div>
        <h4>PostgreSQL</h4>
        <p>Main Database</p>
      </div>
      <div class="tech-item">
        <div class="tech-icon">🛡️</div>
        <h4>Rspamd</h4>
        <p>Anti-Spam Engine</p>
      </div>
      <div class="tech-item">
        <div class="tech-icon">⚡</div>
        <h4>Redis</h4>
        <p>Cache Layer</p>
      </div>
      <div class="tech-item">
        <div class="tech-icon">🦠</div>
        <h4>ClamAV</h4>
        <p>Anti-Virus</p>
      </div>
    </div>

    <div class="stack-architecture">
      <h3>Built With Modern Tools</h3>
      <div class="architecture-badges">
        <span class="arch-badge">Kotlin 2.0.21</span>
        <span class="arch-badge">Java 17</span>
        <span class="arch-badge">Gradle 8.14.3</span>
        <span class="arch-badge">Docker</span>
        <span class="arch-badge">SSH Protocol</span>
        <span class="arch-badge">JSON Configuration</span>
      </div>
    </div>
  </div>
</section>

<section class="how-it-works">
  <div class="container">
    <h2 class="section-title">How It Works</h2>
    <p class="section-subtitle">Three simple steps to your production mail server</p>

    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>Configure</h3>
          <p>Create a JSON configuration file specifying your mail server details, accounts, and target host.</p>
          <div class="code-sample">
            <pre>{
  "hostname": "mail.example.com",
  "accounts": [...],
  "database": {...}
}</pre>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Deploy</h3>
          <p>Run the mail_factory launcher with your configuration. Sit back while it installs and configures everything.</p>
          <div class="code-sample">
            <pre>./mail_factory config.json</pre>
          </div>
        </div>
      </div>

      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Use</h3>
          <p>Connect your email clients to the deployed server. All services are running, configured, and ready to handle email.</p>
          <div class="code-sample">
            <pre>docker ps -a  # Verify running services</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="quick-start">
  <div class="container">
    <h2 class="section-title">Quick Start</h2>

    <div class="quick-start-tabs">
      <div class="tab-content">
        <h3>Web Installer (Recommended)</h3>
        <div class="code-block">
          <pre>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Server-Factory/Utils/master/web_installer.sh)"</pre>
        </div>

        <h3>Manual Installation</h3>
        <div class="code-block">
          <pre># Clone the repository
mkdir Factory && cd Factory
git clone --recurse-submodules git@github.com:Server-Factory/Mail-Server-Factory.git .

# Build the project
./gradlew assemble

# Run with your configuration
./mail_factory Examples/Centos_8.json</pre>
        </div>

        <h3>Setup SSH Access</h3>
        <div class="code-block">
          <pre># Enable passwordless SSH to target host
sh Core/Utils/init_ssh_access.sh your-server.local</pre>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="testing">
  <div class="container">
    <h2 class="section-title">Quality & Testing</h2>
    <p class="section-subtitle">Comprehensive test coverage ensures reliability</p>

    <div class="testing-grid">
      <div class="test-stat-card">
        <div class="test-stat-value">47</div>
        <div class="test-stat-label">Total Tests</div>
      </div>
      <div class="test-stat-card highlight-card">
        <div class="test-stat-value">100%</div>
        <div class="test-stat-label">Success Rate</div>
      </div>
      <div class="test-stat-card">
        <div class="test-stat-value">33</div>
        <div class="test-stat-label">Factory Tests</div>
      </div>
      <div class="test-stat-card">
        <div class="test-stat-value">14</div>
        <div class="test-stat-label">Framework Tests</div>
      </div>
    </div>

    <div class="testing-details">
      <h3>Test Coverage by Module</h3>
      <div class="coverage-bars">
        <div class="coverage-item">
          <div class="coverage-header">
            <span class="coverage-name">Factory Module</span>
            <span class="coverage-value">100% Coverage</span>
          </div>
          <div class="coverage-bar">
            <div class="coverage-fill" style="width: 100%"></div>
          </div>
        </div>
        <div class="coverage-item">
          <div class="coverage-header">
            <span class="coverage-name">Core Framework</span>
            <span class="coverage-value">21% Coverage</span>
          </div>
          <div class="coverage-bar">
            <div class="coverage-fill" style="width: 21%"></div>
          </div>
        </div>
      </div>

      <p class="testing-note">Run tests locally with: <code>./gradlew test</code></p>
    </div>
  </div>
</section>

<section class="compatibility">
  <div class="container">
    <h2 class="section-title">OS Compatibility</h2>
    <p class="section-subtitle">Deploy on your preferred Linux distribution</p>

    <div class="os-grid">
      <div class="os-card">
        <div class="os-icon">🐧</div>
        <h4>CentOS</h4>
        <p>Versions 7 & 8</p>
      </div>
      <div class="os-card">
        <div class="os-icon">🎩</div>
        <h4>Fedora Server</h4>
        <p>Versions 30-34</p>
      </div>
      <div class="os-card">
        <div class="os-icon">🎯</div>
        <h4>Fedora Workstation</h4>
        <p>Versions 30-34</p>
      </div>
      <div class="os-card">
        <div class="os-icon">🟠</div>
        <h4>Ubuntu Desktop</h4>
        <p>Versions 20 & 21</p>
      </div>
    </div>

    <p class="compatibility-note">Note: SELinux enforcing is not currently supported. More distributions coming soon.</p>
  </div>
</section>

<section class="launcher">
  <div class="container">
    <h2 class="section-title">Launcher Features</h2>
    <p class="section-subtitle">Production-ready bash wrapper with enterprise-grade error handling</p>

    <div class="launcher-features">
      <div class="launcher-feature">
        <span class="launcher-icon">🔍</span>
        <div>
          <h4>Automatic JAR Discovery</h4>
          <p>Searches 7 standard locations for the Application JAR</p>
        </div>
      </div>
      <div class="launcher-feature">
        <span class="launcher-icon">☕</span>
        <div>
          <h4>Java Detection</h4>
          <p>Finds Java runtime and validates version (minimum Java 17)</p>
        </div>
      </div>
      <div class="launcher-feature">
        <span class="launcher-icon">⚙️</span>
        <div>
          <h4>Environment Variables</h4>
          <p>Supports JAVA_OPTS, JAVA_HOME, MAIL_FACTORY_HOME</p>
        </div>
      </div>
      <div class="launcher-feature">
        <span class="launcher-icon">✅</span>
        <div>
          <h4>41 Test Cases</h4>
          <p>Comprehensive test suite validates all launcher functionality</p>
        </div>
      </div>
    </div>

    <div class="launcher-commands">
      <h3>Launcher Options</h3>
      <div class="command-list">
        <div class="command-item">
          <code>--help, -h</code>
          <span>Show help message</span>
        </div>
        <div class="command-item">
          <code>--version, -v</code>
          <span>Show version information</span>
        </div>
        <div class="command-item">
          <code>--debug</code>
          <span>Enable verbose debugging output</span>
        </div>
        <div class="command-item">
          <code>--dry-run</code>
          <span>Show command without executing</span>
        </div>
        <div class="command-item">
          <code>--jar &lt;path&gt;</code>
          <span>Override JAR location</span>
        </div>
        <div class="command-item">
          <code>--installation-home=X</code>
          <span>Custom installation home directory</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="use-cases">
  <div class="container">
    <h2 class="section-title">Who Uses Mail Server Factory?</h2>

    <div class="use-case-grid">
      <div class="use-case">
        <h4>🏢 Small Businesses</h4>
        <p>Own your email infrastructure without vendor lock-in. Full control over data and privacy.</p>
      </div>
      <div class="use-case">
        <h4>👨‍💻 DevOps Engineers</h4>
        <p>Automate mail server deployments across multiple environments with consistent configuration.</p>
      </div>
      <div class="use-case">
        <h4>🔐 Privacy-Conscious Organizations</h4>
        <p>Keep email data on-premises with complete control over security and compliance.</p>
      </div>
      <div class="use-case">
        <h4>🎓 Educational Institutions</h4>
        <p>Deploy cost-effective mail servers for students and staff with minimal maintenance.</p>
      </div>
    </div>
  </div>
</section>

<section class="documentation">
  <div class="container">
    <h2 class="section-title">Documentation & Resources</h2>

    <div class="docs-grid">
      <a href="https://github.com/Server-Factory/Mail-Server-Factory/blob/master/README.md" class="doc-card" target="_blank">
        <div class="doc-icon">📘</div>
        <h4>README</h4>
        <p>Complete project overview and getting started guide</p>
      </a>
      <a href="https://github.com/Server-Factory/Mail-Server-Factory/blob/master/TESTING.md" class="doc-card" target="_blank">
        <div class="doc-icon">🧪</div>
        <h4>Testing Guide</h4>
        <p>Comprehensive testing documentation and best practices</p>
      </a>
      <a href="https://github.com/Server-Factory/Mail-Server-Factory/blob/master/CLAUDE.md" class="doc-card" target="_blank">
        <div class="doc-icon">🤖</div>
        <h4>Developer Guide</h4>
        <p>Architecture, build system, and contribution guidelines</p>
      </a>
      <a href="https://github.com/Server-Factory/Mail-Server-Factory/tree/master/Examples" class="doc-card" target="_blank">
        <div class="doc-icon">💡</div>
        <h4>Examples</h4>
        <p>Sample JSON configurations for different scenarios</p>
      </a>
      <a href="https://github.com/Server-Factory/Mail-Server-Factory/releases" class="doc-card" target="_blank">
        <div class="doc-icon">🚀</div>
        <h4>Releases</h4>
        <p>Download stable releases and view changelog</p>
      </a>
      <a href="https://github.com/Server-Factory/Mail-Server-Factory/issues" class="doc-card" target="_blank">
        <div class="doc-icon">🐛</div>
        <h4>Issues</h4>
        <p>Report bugs or request new features</p>
      </a>
    </div>
  </div>
</section>

<section class="cta">
  <div class="container">
    <div class="cta-content">
      <h2>Ready to Deploy Your Mail Server?</h2>
      <p>Join the Mail Server Factory community and take control of your email infrastructure today.</p>
      <div class="cta-buttons">
        <a href="https://github.com/Server-Factory/Mail-Server-Factory/releases" class="btn btn-primary btn-large" target="_blank">
          Download Now
        </a>
        <a href="https://github.com/Server-Factory/Mail-Server-Factory" class="btn btn-secondary btn-large" target="_blank">
          View on GitHub
        </a>
      </div>
      <p class="cta-note">Open source • Free forever • Community supported</p>
    </div>
  </div>
</section>
