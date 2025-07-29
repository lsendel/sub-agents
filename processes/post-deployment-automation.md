---
name: post-deployment-automation
type: process
version: 1.0.0
description: Fully automated post-deployment validation process with Lighthouse, Puppeteer, GPT analysis, and Slack reporting
author: Claude
tags: [deployment, automation, testing, monitoring, performance]
related_commands: [/deploy-validate, /performance-check]
---

# Post-Deployment Automation Process

> Version: 1.0.0
> Last updated: 2025-07-29
> Purpose: Automated quality assurance pipeline triggered after every deployment
> Output: Comprehensive Slack dashboard with performance, UX, and accessibility metrics

## Overview

This process automatically validates deployments through multiple quality checks:
1. Lighthouse performance audits
2. Puppeteer functional tests
3. GPT-powered visual analysis
4. Comprehensive error detection
5. Aggregated Slack reporting

## Related Standards

This automation process validates against:
- **[testing-standards.md](../standards/testing-standards.md)** - For automated test coverage requirements
- **[ui-design-guide.md](../standards/ui-design-guide.md)** - For UI/UX validation criteria
- **[best-practices.md](../standards/best-practices.md)** - For performance benchmarks
- **[api-design.md](../standards/api-design.md)** - For API endpoint testing

## Architecture

```mermaid
graph TD
    A[Deployment Complete] --> B[Trigger Webhook]
    B --> C[Post-Deploy Pipeline]
    
    C --> D[Lighthouse Audit]
    C --> E[Puppeteer Tests]
    C --> F[Visual Analysis]
    C --> G[Error Scanning]
    
    D --> H[Performance Metrics]
    E --> I[Functional Status]
    F --> J[UX Insights]
    G --> K[Error Report]
    
    H --> L[Report Aggregator]
    I --> L
    J --> L
    K --> L
    
    L --> M[Slack Dashboard]
    L --> N[Historical Database]
```

## Implementation

### 1. Pipeline Orchestrator

```typescript
// post-deploy-pipeline.ts
import { LighthouseAuditor } from './auditors/lighthouse';
import { PuppeteerTester } from './testers/puppeteer';
import { VisualAnalyzer } from './analyzers/visual';
import { ErrorScanner } from './scanners/errors';
import { SlackReporter } from './reporters/slack';
import { MetricsDatabase } from './storage/metrics';

interface DeploymentInfo {
  deploymentId: string;
  environment: 'production' | 'staging' | 'preview';
  deployedAt: Date;
  commitHash: string;
  deployedBy: string;
  baseUrl: string;
}

export class PostDeploymentPipeline {
  private lighthouse: LighthouseAuditor;
  private puppeteer: PuppeteerTester;
  private visual: VisualAnalyzer;
  private errorScanner: ErrorScanner;
  private slack: SlackReporter;
  private db: MetricsDatabase;

  constructor(config: PipelineConfig) {
    this.lighthouse = new LighthouseAuditor(config.lighthouse);
    this.puppeteer = new PuppeteerTester(config.puppeteer);
    this.visual = new VisualAnalyzer(config.visual);
    this.errorScanner = new ErrorScanner(config.errors);
    this.slack = new SlackReporter(config.slack);
    this.db = new MetricsDatabase(config.database);
  }

  async execute(deployment: DeploymentInfo): Promise<void> {
    console.log(`🚀 Starting post-deployment validation for ${deployment.deploymentId}`);
    
    const startTime = Date.now();
    const results = {
      deployment,
      lighthouse: null,
      puppeteer: null,
      visual: null,
      errors: null,
      duration: 0
    };

    try {
      // Run all checks in parallel for speed
      const [lighthouseResults, puppeteerResults, visualResults, errorResults] = 
        await Promise.allSettled([
          this.lighthouse.audit(deployment.baseUrl),
          this.puppeteer.test(deployment.baseUrl),
          this.visual.analyze(deployment.baseUrl),
          this.errorScanner.scan(deployment.baseUrl)
        ]);

      // Process results
      results.lighthouse = this.processResult(lighthouseResults);
      results.puppeteer = this.processResult(puppeteerResults);
      results.visual = this.processResult(visualResults);
      results.errors = this.processResult(errorResults);
      results.duration = Date.now() - startTime;

      // Store in database
      await this.db.store(results);

      // Send to Slack
      await this.slack.report(results);

      console.log(`✅ Post-deployment validation completed in ${results.duration}ms`);
    } catch (error) {
      console.error('❌ Pipeline failed:', error);
      await this.slack.reportError(deployment, error);
    }
  }

  private processResult(result: PromiseSettledResult<any>): any {
    if (result.status === 'fulfilled') {
      return result.value;
    } else {
      return { error: result.reason.message };
    }
  }
}
```

### 2. Lighthouse Auditor

```typescript
// auditors/lighthouse.ts
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

export interface LighthouseConfig {
  categories: string[];
  throttling: 'mobile' | 'desktop';
  pages: PageConfig[];
}

export interface PageConfig {
  path: string;
  name: string;
  waitForSelector?: string;
}

export interface LighthouseResults {
  summary: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
  };
  pages: PageAudit[];
  insights: string[];
}

interface PageAudit {
  path: string;
  name: string;
  scores: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    pwa: number;
  };
  metrics: {
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
  };
  opportunities: Opportunity[];
  diagnostics: Diagnostic[];
}

export class LighthouseAuditor {
  constructor(private config: LighthouseConfig) {}

  async audit(baseUrl: string): Promise<LighthouseResults> {
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox']
    });

    try {
      const results: PageAudit[] = [];
      
      for (const page of this.config.pages) {
        const url = `${baseUrl}${page.path}`;
        console.log(`🔍 Auditing ${page.name} at ${url}`);
        
        const options = {
          logLevel: 'error',
          output: 'json',
          onlyCategories: this.config.categories,
          port: chrome.port,
          throttling: this.getThrottlingConfig()
        };

        const runnerResult = await lighthouse(url, options);
        const audit = this.processAuditResult(page, runnerResult.lhr);
        results.push(audit);
      }

      return {
        summary: this.calculateSummary(results),
        pages: results,
        insights: this.generateInsights(results)
      };
    } finally {
      await chrome.kill();
    }
  }

  private processAuditResult(page: PageConfig, lhr: any): PageAudit {
    return {
      path: page.path,
      name: page.name,
      scores: {
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
        pwa: Math.round(lhr.categories.pwa?.score * 100 || 0)
      },
      metrics: {
        firstContentfulPaint: lhr.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: lhr.audits['largest-contentful-paint'].numericValue,
        totalBlockingTime: lhr.audits['total-blocking-time'].numericValue,
        cumulativeLayoutShift: lhr.audits['cumulative-layout-shift'].numericValue,
        speedIndex: lhr.audits['speed-index'].numericValue
      },
      opportunities: this.extractOpportunities(lhr),
      diagnostics: this.extractDiagnostics(lhr)
    };
  }

  private extractOpportunities(lhr: any): Opportunity[] {
    return Object.values(lhr.audits)
      .filter((audit: any) => 
        audit.details?.type === 'opportunity' && 
        audit.score !== null && 
        audit.score < 0.9
      )
      .map((audit: any) => ({
        title: audit.title,
        description: audit.description,
        savings: audit.details.overallSavingsMs
      }))
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 5);
  }

  private getThrottlingConfig() {
    return this.config.throttling === 'mobile' 
      ? lighthouse.constants.throttling.mobileSlow4G
      : lighthouse.constants.throttling.desktopDense4G;
  }

  private calculateSummary(results: PageAudit[]): LighthouseResults['summary'] {
    const avg = (key: keyof PageAudit['scores']) => 
      Math.round(results.reduce((sum, r) => sum + r.scores[key], 0) / results.length);

    return {
      performance: avg('performance'),
      accessibility: avg('accessibility'),
      bestPractices: avg('bestPractices'),
      seo: avg('seo'),
      pwa: avg('pwa')
    };
  }

  private generateInsights(results: PageAudit[]): string[] {
    const insights: string[] = [];
    
    // Performance insights
    const avgPerf = results.reduce((sum, r) => sum + r.scores.performance, 0) / results.length;
    if (avgPerf < 50) {
      insights.push('⚠️ Critical performance issues detected across multiple pages');
    } else if (avgPerf < 75) {
      insights.push('🟡 Performance could be improved for better user experience');
    } else {
      insights.push('✅ Performance scores are good across all pages');
    }

    // Accessibility insights
    const a11yIssues = results.filter(r => r.scores.accessibility < 90);
    if (a11yIssues.length > 0) {
      insights.push(`🔴 ${a11yIssues.length} pages have accessibility issues`);
    }

    return insights;
  }
}
```

### 3. Puppeteer Test Suite

```typescript
// testers/puppeteer.ts
import puppeteer, { Browser, Page } from 'puppeteer';

export interface PuppeteerConfig {
  viewport: { width: number; height: number };
  timeout: number;
  tests: TestScenario[];
}

export interface TestScenario {
  name: string;
  path: string;
  actions: TestAction[];
  assertions: TestAssertion[];
  screenshot: boolean;
}

type TestAction = 
  | { type: 'click'; selector: string }
  | { type: 'type'; selector: string; text: string }
  | { type: 'wait'; selector: string }
  | { type: 'navigate'; path: string }
  | { type: 'scroll'; x: number; y: number };

type TestAssertion = 
  | { type: 'element-exists'; selector: string }
  | { type: 'text-contains'; selector: string; text: string }
  | { type: 'url-matches'; pattern: string }
  | { type: 'no-console-errors' };

export interface PuppeteerResults {
  passed: number;
  failed: number;
  tests: TestResult[];
  screenshots: Screenshot[];
  criticalPaths: CriticalPathStatus[];
}

interface TestResult {
  name: string;
  status: 'passed' | 'failed';
  duration: number;
  error?: string;
  screenshot?: string;
}

interface Screenshot {
  name: string;
  path: string;
  base64: string;
}

interface CriticalPathStatus {
  name: string;
  path: string;
  status: 'working' | 'broken';
  issue?: string;
}

export class PuppeteerTester {
  private browser: Browser | null = null;
  
  constructor(private config: PuppeteerConfig) {}

  async test(baseUrl: string): Promise<PuppeteerResults> {
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const results: TestResult[] = [];
    const screenshots: Screenshot[] = [];
    const criticalPaths: CriticalPathStatus[] = [];

    try {
      for (const scenario of this.config.tests) {
        const result = await this.runScenario(baseUrl, scenario, screenshots);
        results.push(result);
        
        // Track critical paths
        if (scenario.name.includes('critical')) {
          criticalPaths.push({
            name: scenario.name,
            path: scenario.path,
            status: result.status === 'passed' ? 'working' : 'broken',
            issue: result.error
          });
        }
      }

      return {
        passed: results.filter(r => r.status === 'passed').length,
        failed: results.filter(r => r.status === 'failed').length,
        tests: results,
        screenshots,
        criticalPaths
      };
    } finally {
      await this.browser.close();
    }
  }

  private async runScenario(
    baseUrl: string, 
    scenario: TestScenario,
    screenshots: Screenshot[]
  ): Promise<TestResult> {
    const page = await this.browser!.newPage();
    await page.setViewport(this.config.viewport);
    
    const startTime = Date.now();
    const consoleErrors: string[] = [];
    
    // Track console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    try {
      // Navigate to starting page
      await page.goto(`${baseUrl}${scenario.path}`, {
        waitUntil: 'networkidle2',
        timeout: this.config.timeout
      });

      // Execute actions
      for (const action of scenario.actions) {
        await this.executeAction(page, action);
      }

      // Run assertions
      for (const assertion of scenario.assertions) {
        await this.runAssertion(page, assertion, consoleErrors);
      }

      // Take screenshot if requested
      if (scenario.screenshot) {
        const screenshotBuffer = await page.screenshot({ fullPage: true });
        screenshots.push({
          name: scenario.name,
          path: scenario.path,
          base64: screenshotBuffer.toString('base64')
        });
      }

      return {
        name: scenario.name,
        status: 'passed',
        duration: Date.now() - startTime
      };
    } catch (error) {
      // Take error screenshot
      try {
        const errorScreenshot = await page.screenshot({ fullPage: true });
        return {
          name: scenario.name,
          status: 'failed',
          duration: Date.now() - startTime,
          error: error.message,
          screenshot: errorScreenshot.toString('base64')
        };
      } catch {
        return {
          name: scenario.name,
          status: 'failed',
          duration: Date.now() - startTime,
          error: error.message
        };
      }
    } finally {
      await page.close();
    }
  }

  private async executeAction(page: Page, action: TestAction): Promise<void> {
    switch (action.type) {
      case 'click':
        await page.waitForSelector(action.selector, { timeout: this.config.timeout });
        await page.click(action.selector);
        break;
        
      case 'type':
        await page.waitForSelector(action.selector, { timeout: this.config.timeout });
        await page.type(action.selector, action.text);
        break;
        
      case 'wait':
        await page.waitForSelector(action.selector, { timeout: this.config.timeout });
        break;
        
      case 'navigate':
        await page.goto(action.path, { waitUntil: 'networkidle2' });
        break;
        
      case 'scroll':
        await page.evaluate((x, y) => window.scrollTo(x, y), action.x, action.y);
        break;
    }
  }

  private async runAssertion(
    page: Page, 
    assertion: TestAssertion,
    consoleErrors: string[]
  ): Promise<void> {
    switch (assertion.type) {
      case 'element-exists':
        const element = await page.$(assertion.selector);
        if (!element) {
          throw new Error(`Element not found: ${assertion.selector}`);
        }
        break;
        
      case 'text-contains':
        const text = await page.$eval(assertion.selector, el => el.textContent);
        if (!text?.includes(assertion.text)) {
          throw new Error(`Text "${assertion.text}" not found in ${assertion.selector}`);
        }
        break;
        
      case 'url-matches':
        const url = page.url();
        if (!url.match(new RegExp(assertion.pattern))) {
          throw new Error(`URL ${url} doesn't match pattern ${assertion.pattern}`);
        }
        break;
        
      case 'no-console-errors':
        if (consoleErrors.length > 0) {
          throw new Error(`Console errors found: ${consoleErrors.join(', ')}`);
        }
        break;
    }
  }
}
```

### 4. GPT Visual Analyzer

```typescript
// analyzers/visual.ts
import { OpenAI } from 'openai';
import puppeteer from 'puppeteer';

export interface VisualAnalyzerConfig {
  apiKey: string;
  model: string;
  pages: VisualPage[];
  aspectsToAnalyze: AnalysisAspect[];
}

interface VisualPage {
  path: string;
  name: string;
  waitForSelector?: string;
}

type AnalysisAspect = 
  | 'layout-consistency'
  | 'color-contrast'
  | 'visual-hierarchy'
  | 'mobile-responsiveness'
  | 'loading-state'
  | 'error-states'
  | 'accessibility-visual';

export interface VisualAnalysisResults {
  overall: {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    summary: string;
  };
  pages: PageAnalysis[];
  recommendations: UXRecommendation[];
  accessibilityIssues: AccessibilityIssue[];
}

interface PageAnalysis {
  path: string;
  name: string;
  screenshot: string;
  analysis: {
    layoutScore: number;
    visualHierarchy: string;
    colorContrast: string;
    responsiveness: string;
    issues: string[];
    suggestions: string[];
  };
}

interface UXRecommendation {
  priority: 'high' | 'medium' | 'low';
  category: string;
  issue: string;
  suggestion: string;
  affectedPages: string[];
}

interface AccessibilityIssue {
  severity: 'critical' | 'major' | 'minor';
  type: string;
  description: string;
  pages: string[];
}

export class VisualAnalyzer {
  private openai: OpenAI;
  
  constructor(private config: VisualAnalyzerConfig) {
    this.openai = new OpenAI({ apiKey: config.apiKey });
  }

  async analyze(baseUrl: string): Promise<VisualAnalysisResults> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    try {
      const pageAnalyses: PageAnalysis[] = [];
      
      // Capture screenshots and analyze each page
      for (const pageConfig of this.config.pages) {
        const analysis = await this.analyzePage(browser, baseUrl, pageConfig);
        pageAnalyses.push(analysis);
      }

      // Generate overall analysis
      const overallAnalysis = await this.generateOverallAnalysis(pageAnalyses);
      
      return overallAnalysis;
    } finally {
      await browser.close();
    }
  }

  private async analyzePage(
    browser: any, 
    baseUrl: string, 
    pageConfig: VisualPage
  ): Promise<PageAnalysis> {
    const page = await browser.newPage();
    
    // Set multiple viewport sizes for responsive analysis
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];

    const screenshots: { [key: string]: string } = {};
    
    for (const viewport of viewports) {
      await page.setViewport(viewport);
      await page.goto(`${baseUrl}${pageConfig.path}`, {
        waitUntil: 'networkidle2'
      });
      
      if (pageConfig.waitForSelector) {
        await page.waitForSelector(pageConfig.waitForSelector);
      }
      
      const screenshot = await page.screenshot({ 
        fullPage: true, 
        encoding: 'base64' 
      });
      screenshots[viewport.name] = screenshot;
    }

    await page.close();

    // Analyze with GPT-4 Vision
    const analysis = await this.analyzeWithGPT(pageConfig, screenshots);
    
    return {
      path: pageConfig.path,
      name: pageConfig.name,
      screenshot: screenshots.desktop, // Primary screenshot
      analysis
    };
  }

  private async analyzeWithGPT(
    pageConfig: VisualPage,
    screenshots: { [key: string]: string }
  ): Promise<PageAnalysis['analysis']> {
    const prompt = `
    Analyze these screenshots of a web page across different devices.
    Page: ${pageConfig.name}
    
    Please evaluate:
    1. Layout consistency across devices
    2. Visual hierarchy and information flow
    3. Color contrast and readability
    4. Mobile responsiveness issues
    5. Any visual bugs or misalignments
    6. Accessibility concerns visible in the UI
    
    Provide:
    - Layout score (0-100)
    - Specific issues found
    - Actionable suggestions for improvement
    
    Format your response as JSON.
    `;

    const messages = [
      {
        role: 'user' as const,
        content: [
          { type: 'text' as const, text: prompt },
          ...Object.entries(screenshots).map(([device, screenshot]) => ({
            type: 'image_url' as const,
            image_url: {
              url: `data:image/png;base64,${screenshot}`,
              detail: 'high' as const
            }
          }))
        ]
      }
    ];

    const response = await this.openai.chat.completions.create({
      model: this.config.model,
      messages,
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    
    return {
      layoutScore: result.layoutScore || 0,
      visualHierarchy: result.visualHierarchy || 'Not analyzed',
      colorContrast: result.colorContrast || 'Not analyzed',
      responsiveness: result.responsiveness || 'Not analyzed',
      issues: result.issues || [],
      suggestions: result.suggestions || []
    };
  }

  private async generateOverallAnalysis(
    pageAnalyses: PageAnalysis[]
  ): Promise<VisualAnalysisResults> {
    // Aggregate scores
    const avgScore = pageAnalyses.reduce(
      (sum, p) => sum + p.analysis.layoutScore, 0
    ) / pageAnalyses.length;
    
    const grade = this.scoreToGrade(avgScore);
    
    // Collect all issues and suggestions
    const allIssues = pageAnalyses.flatMap(p => 
      p.analysis.issues.map(issue => ({ issue, page: p.name }))
    );
    
    const recommendations = this.generateRecommendations(pageAnalyses);
    const accessibilityIssues = this.extractAccessibilityIssues(pageAnalyses);
    
    return {
      overall: {
        score: Math.round(avgScore),
        grade,
        summary: this.generateSummary(avgScore, pageAnalyses)
      },
      pages: pageAnalyses,
      recommendations,
      accessibilityIssues
    };
  }

  private scoreToGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  }

  private generateSummary(score: number, analyses: PageAnalysis[]): string {
    const issueCount = analyses.reduce(
      (sum, p) => sum + p.analysis.issues.length, 0
    );
    
    if (score >= 90) {
      return `Excellent visual quality across all ${analyses.length} pages with minimal issues.`;
    } else if (score >= 70) {
      return `Good visual quality with ${issueCount} minor issues to address.`;
    } else {
      return `Significant visual issues detected. ${issueCount} problems need attention.`;
    }
  }

  private generateRecommendations(analyses: PageAnalysis[]): UXRecommendation[] {
    const recommendations: UXRecommendation[] = [];
    
    // Analyze common issues across pages
    const issueFrequency = new Map<string, string[]>();
    
    analyses.forEach(page => {
      page.analysis.issues.forEach(issue => {
        if (!issueFrequency.has(issue)) {
          issueFrequency.set(issue, []);
        }
        issueFrequency.get(issue)!.push(page.name);
      });
    });
    
    // Create recommendations for frequent issues
    issueFrequency.forEach((pages, issue) => {
      const priority = pages.length > analyses.length / 2 ? 'high' : 
                      pages.length > 1 ? 'medium' : 'low';
      
      recommendations.push({
        priority,
        category: this.categorizeIssue(issue),
        issue,
        suggestion: this.generateSuggestion(issue),
        affectedPages: pages
      });
    });
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  private categorizeIssue(issue: string): string {
    if (issue.includes('contrast') || issue.includes('color')) return 'Color & Contrast';
    if (issue.includes('mobile') || issue.includes('responsive')) return 'Responsiveness';
    if (issue.includes('layout') || issue.includes('alignment')) return 'Layout';
    if (issue.includes('text') || issue.includes('font')) return 'Typography';
    return 'General';
  }

  private generateSuggestion(issue: string): string {
    // Map common issues to suggestions
    const suggestionMap: { [key: string]: string } = {
      'contrast': 'Increase color contrast to meet WCAG AA standards (4.5:1 for normal text)',
      'mobile': 'Adjust layout for mobile devices using responsive design techniques',
      'alignment': 'Use consistent spacing and alignment grid system',
      'hierarchy': 'Establish clear visual hierarchy with size, weight, and spacing'
    };
    
    for (const [key, suggestion] of Object.entries(suggestionMap)) {
      if (issue.toLowerCase().includes(key)) {
        return suggestion;
      }
    }
    
    return 'Review and fix the identified issue';
  }

  private extractAccessibilityIssues(analyses: PageAnalysis[]): AccessibilityIssue[] {
    const issues: AccessibilityIssue[] = [];
    
    analyses.forEach(page => {
      page.analysis.issues.forEach(issue => {
        if (this.isAccessibilityIssue(issue)) {
          const existingIssue = issues.find(i => i.description === issue);
          if (existingIssue) {
            existingIssue.pages.push(page.name);
          } else {
            issues.push({
              severity: this.getAccessibilitySeverity(issue),
              type: this.getAccessibilityType(issue),
              description: issue,
              pages: [page.name]
            });
          }
        }
      });
    });
    
    return issues;
  }

  private isAccessibilityIssue(issue: string): boolean {
    const a11yKeywords = ['contrast', 'aria', 'alt', 'focus', 'keyboard', 'screen reader'];
    return a11yKeywords.some(keyword => issue.toLowerCase().includes(keyword));
  }

  private getAccessibilitySeverity(issue: string): 'critical' | 'major' | 'minor' {
    if (issue.includes('contrast') && issue.includes('fail')) return 'critical';
    if (issue.includes('keyboard') || issue.includes('screen reader')) return 'major';
    return 'minor';
  }

  private getAccessibilityType(issue: string): string {
    if (issue.includes('contrast')) return 'Color Contrast';
    if (issue.includes('keyboard')) return 'Keyboard Navigation';
    if (issue.includes('aria')) return 'ARIA Labels';
    if (issue.includes('alt')) return 'Alternative Text';
    return 'General Accessibility';
  }
}
```

### 5. Error Scanner

```typescript
// scanners/errors.ts
import puppeteer from 'puppeteer';
import { SourceMapConsumer } from 'source-map';

export interface ErrorScannerConfig {
  pages: string[];
  errorTypes: ErrorType[];
  timeout: number;
}

type ErrorType = 
  | 'javascript-errors'
  | 'network-errors'
  | '404-errors'
  | 'mixed-content'
  | 'cors-errors'
  | 'csp-violations';

export interface ErrorScanResults {
  summary: {
    totalErrors: number;
    criticalErrors: number;
    byType: { [key: string]: number };
  };
  errors: DetailedError[];
  brokenLinks: BrokenLink[];
  securityIssues: SecurityIssue[];
}

interface DetailedError {
  type: ErrorType;
  severity: 'critical' | 'warning' | 'info';
  page: string;
  message: string;
  stack?: string;
  timestamp: string;
  context?: any;
}

interface BrokenLink {
  page: string;
  url: string;
  statusCode: number;
  element: string;
}

interface SecurityIssue {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  pages: string[];
}

export class ErrorScanner {
  constructor(private config: ErrorScannerConfig) {}

  async scan(baseUrl: string): Promise<ErrorScanResults> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });

    const errors: DetailedError[] = [];
    const brokenLinks: BrokenLink[] = [];
    const securityIssues: SecurityIssue[] = [];

    try {
      for (const pagePath of this.config.pages) {
        await this.scanPage(
          browser,
          `${baseUrl}${pagePath}`,
          pagePath,
          errors,
          brokenLinks,
          securityIssues
        );
      }

      return {
        summary: this.generateSummary(errors),
        errors,
        brokenLinks,
        securityIssues
      };
    } finally {
      await browser.close();
    }
  }

  private async scanPage(
    browser: any,
    url: string,
    pagePath: string,
    errors: DetailedError[],
    brokenLinks: BrokenLink[],
    securityIssues: SecurityIssue[]
  ): Promise<void> {
    const page = await browser.newPage();
    
    // Set up error tracking
    const pageErrors: DetailedError[] = [];
    const networkErrors: Map<string, number> = new Map();
    
    // JavaScript errors
    page.on('pageerror', (error: Error) => {
      pageErrors.push({
        type: 'javascript-errors',
        severity: 'critical',
        page: pagePath,
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Console messages
    page.on('console', (msg: any) => {
      if (msg.type() === 'error') {
        pageErrors.push({
          type: 'javascript-errors',
          severity: 'warning',
          page: pagePath,
          message: msg.text(),
          timestamp: new Date().toISOString()
        });
      }
    });

    // Network errors
    page.on('response', (response: any) => {
      const status = response.status();
      const url = response.url();
      
      if (status >= 400) {
        networkErrors.set(url, status);
        
        if (status === 404) {
          pageErrors.push({
            type: '404-errors',
            severity: 'warning',
            page: pagePath,
            message: `404 Not Found: ${url}`,
            timestamp: new Date().toISOString()
          });
        }
      }
      
      // Check for mixed content
      if (url.startsWith('http://') && !url.startsWith('http://localhost')) {
        pageErrors.push({
          type: 'mixed-content',
          severity: 'critical',
          page: pagePath,
          message: `Mixed content: Loading HTTP resource on HTTPS page: ${url}`,
          timestamp: new Date().toISOString()
        });
      }
    });

    // CORS errors
    page.on('requestfailed', (request: any) => {
      const failure = request.failure();
      if (failure && failure.errorText.includes('CORS')) {
        pageErrors.push({
          type: 'cors-errors',
          severity: 'critical',
          page: pagePath,
          message: `CORS error: ${request.url()}`,
          timestamp: new Date().toISOString()
        });
      }
    });

    try {
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: this.config.timeout
      });

      // Scan for broken links
      const links = await page.$$eval('a[href]', (links: any[]) => 
        links.map(link => ({
          href: link.href,
          text: link.textContent,
          selector: link.tagName.toLowerCase() + 
            (link.id ? `#${link.id}` : '') + 
            (link.className ? `.${link.className.split(' ').join('.')}` : '')
        }))
      );

      // Check each link
      for (const link of links) {
        if (networkErrors.has(link.href)) {
          brokenLinks.push({
            page: pagePath,
            url: link.href,
            statusCode: networkErrors.get(link.href)!,
            element: link.selector
          });
        }
      }

      // Security checks
      await this.performSecurityChecks(page, pagePath, securityIssues);

      // Add collected errors
      errors.push(...pageErrors);

    } catch (error) {
      errors.push({
        type: 'javascript-errors',
        severity: 'critical',
        page: pagePath,
        message: `Page load failed: ${error.message}`,
        timestamp: new Date().toISOString()
      });
    } finally {
      await page.close();
    }
  }

  private async performSecurityChecks(
    page: any,
    pagePath: string,
    securityIssues: SecurityIssue[]
  ): Promise<void> {
    // Check for exposed sensitive data
    const pageContent = await page.content();
    
    // API keys
    const apiKeyPattern = /(?:api[_-]?key|apikey)["\s]*[:=]["\s]*["']([^"']+)["']/gi;
    if (apiKeyPattern.test(pageContent)) {
      this.addSecurityIssue(securityIssues, {
        type: 'exposed-api-key',
        severity: 'high',
        description: 'Potential API key exposed in client-side code',
        pages: [pagePath]
      });
    }

    // Check for insecure forms
    const forms = await page.$$eval('form', (forms: any[]) => 
      forms.map(form => ({
        action: form.action,
        method: form.method,
        hasPassword: !!form.querySelector('input[type="password"]')
      }))
    );

    forms.forEach(form => {
      if (form.hasPassword && !form.action.startsWith('https://')) {
        this.addSecurityIssue(securityIssues, {
          type: 'insecure-form',
          severity: 'high',
          description: 'Password form submitted over non-HTTPS connection',
          pages: [pagePath]
        });
      }
    });

    // Check CSP
    const cspHeader = await page.evaluate(() => {
      const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      return meta?.getAttribute('content');
    });

    if (!cspHeader) {
      this.addSecurityIssue(securityIssues, {
        type: 'missing-csp',
        severity: 'medium',
        description: 'Content Security Policy not implemented',
        pages: [pagePath]
      });
    }
  }

  private addSecurityIssue(
    issues: SecurityIssue[],
    newIssue: SecurityIssue
  ): void {
    const existing = issues.find(i => 
      i.type === newIssue.type && 
      i.description === newIssue.description
    );
    
    if (existing) {
      existing.pages.push(...newIssue.pages);
    } else {
      issues.push(newIssue);
    }
  }

  private generateSummary(errors: DetailedError[]): ErrorScanResults['summary'] {
    const byType: { [key: string]: number } = {};
    
    errors.forEach(error => {
      byType[error.type] = (byType[error.type] || 0) + 1;
    });

    return {
      totalErrors: errors.length,
      criticalErrors: errors.filter(e => e.severity === 'critical').length,
      byType
    };
  }
}
```

### 6. Slack Reporter

```typescript
// reporters/slack.ts
import { WebClient } from '@slack/web-api';

export interface SlackConfig {
  token: string;
  channel: string;
  mentionOnFailure: string[];
  webhookUrl?: string;
}

export class SlackReporter {
  private client: WebClient;
  
  constructor(private config: SlackConfig) {
    this.client = new WebClient(config.token);
  }

  async report(results: any): Promise<void> {
    const message = this.buildDashboardMessage(results);
    
    try {
      await this.client.chat.postMessage({
        channel: this.config.channel,
        blocks: message.blocks,
        attachments: message.attachments,
        text: message.text
      });
    } catch (error) {
      console.error('Failed to send Slack message:', error);
    }
  }

  private buildDashboardMessage(results: any): any {
    const { deployment, lighthouse, puppeteer, visual, errors } = results;
    const overallStatus = this.calculateOverallStatus(results);
    
    const blocks = [
      // Header
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `🚀 Deployment Report: ${deployment.environment}`,
          emoji: true
        }
      },
      
      // Deployment info
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Environment:*\n${deployment.environment}`
          },
          {
            type: 'mrkdwn',
            text: `*Deploy Time:*\n${new Date(deployment.deployedAt).toLocaleString()}`
          },
          {
            type: 'mrkdwn',
            text: `*Deployed By:*\n${deployment.deployedBy}`
          },
          {
            type: 'mrkdwn',
            text: `*Commit:*\n${deployment.commitHash.substring(0, 8)}`
          }
        ]
      },
      
      // Overall status
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Overall Status:* ${overallStatus.emoji} ${overallStatus.text}`
        }
      },
      
      // Lighthouse results
      this.buildLighthouseBlock(lighthouse),
      
      // Puppeteer results
      this.buildPuppeteerBlock(puppeteer),
      
      // Visual analysis results
      this.buildVisualBlock(visual),
      
      // Error scan results
      this.buildErrorBlock(errors),
      
      // Actions
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View Full Report'
            },
            url: `${deployment.baseUrl}/deployment-report/${deployment.deploymentId}`,
            style: 'primary'
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View Lighthouse Details'
            },
            url: `${deployment.baseUrl}/lighthouse-report/${deployment.deploymentId}`
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Rollback'
            },
            style: 'danger',
            confirm: {
              title: {
                type: 'plain_text',
                text: 'Confirm Rollback'
              },
              text: {
                type: 'plain_text',
                text: 'Are you sure you want to rollback this deployment?'
              },
              confirm: {
                type: 'plain_text',
                text: 'Rollback'
              },
              deny: {
                type: 'plain_text',
                text: 'Cancel'
              }
            }
          }
        ]
      }
    ];

    // Add mention if critical issues
    if (overallStatus.severity === 'critical') {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `🚨 ${this.config.mentionOnFailure.map(u => `<@${u}>`).join(' ')} Critical issues detected!`
        }
      });
    }

    return {
      blocks,
      text: `Deployment Report: ${overallStatus.text}`,
      attachments: this.buildAttachments(results)
    };
  }

  private buildLighthouseBlock(lighthouse: any): any {
    if (!lighthouse || lighthouse.error) {
      return {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*🏗 Lighthouse:* ❌ Failed to run audits`
        }
      };
    }

    const { summary } = lighthouse;
    const getScoreEmoji = (score: number) => {
      if (score >= 90) return '🟢';
      if (score >= 70) return '🟡';
      return '🔴';
    };

    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🏗 Lighthouse Performance Audit*`
      },
      fields: [
        {
          type: 'mrkdwn',
          text: `${getScoreEmoji(summary.performance)} Performance: ${summary.performance}`
        },
        {
          type: 'mrkdwn',
          text: `${getScoreEmoji(summary.accessibility)} Accessibility: ${summary.accessibility}`
        },
        {
          type: 'mrkdwn',
          text: `${getScoreEmoji(summary.bestPractices)} Best Practices: ${summary.bestPractices}`
        },
        {
          type: 'mrkdwn',
          text: `${getScoreEmoji(summary.seo)} SEO: ${summary.seo}`
        }
      ],
      accessory: {
        type: 'image',
        image_url: this.generateScoreChart(summary),
        alt_text: 'Lighthouse scores'
      }
    };
  }

  private buildPuppeteerBlock(puppeteer: any): any {
    if (!puppeteer || puppeteer.error) {
      return {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*🎭 Functional Tests:* ❌ Failed to run tests`
        }
      };
    }

    const criticalFailing = puppeteer.criticalPaths.filter((p: any) => p.status === 'broken');
    const statusEmoji = puppeteer.failed === 0 ? '✅' : 
                       criticalFailing.length > 0 ? '🔴' : '🟡';

    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🎭 Functional Tests:* ${statusEmoji} ${puppeteer.passed}/${puppeteer.passed + puppeteer.failed} passed`
      },
      fields: criticalFailing.length > 0 ? [
        {
          type: 'mrkdwn',
          text: `*Critical Paths Broken:*\n${criticalFailing.map((p: any) => `• ${p.name}`).join('\n')}`
        }
      ] : undefined
    };
  }

  private buildVisualBlock(visual: any): any {
    if (!visual || visual.error) {
      return {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*👁 Visual Analysis:* ❌ Failed to analyze`
        }
      };
    }

    const { overall, recommendations, accessibilityIssues } = visual;
    const gradeEmoji = {
      'A': '🟢',
      'B': '🟡',
      'C': '🟠',
      'D': '🔴',
      'F': '🔴'
    };

    const highPriorityRecs = recommendations.filter((r: any) => r.priority === 'high');
    const criticalA11y = accessibilityIssues.filter((i: any) => i.severity === 'critical');

    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*👁 Visual Analysis:* ${gradeEmoji[overall.grade]} Grade ${overall.grade} (${overall.score}/100)\n${overall.summary}`
      },
      fields: [
        highPriorityRecs.length > 0 ? {
          type: 'mrkdwn',
          text: `*🔺 High Priority Issues:*\n${highPriorityRecs.slice(0, 3).map((r: any) => `• ${r.issue}`).join('\n')}`
        } : null,
        criticalA11y.length > 0 ? {
          type: 'mrkdwn',
          text: `*♿ Critical Accessibility:*\n${criticalA11y.map((i: any) => `• ${i.description}`).join('\n')}`
        } : null
      ].filter(Boolean)
    };
  }

  private buildErrorBlock(errors: any): any {
    if (!errors || errors.error) {
      return {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*🐛 Error Scan:* ❌ Failed to scan`
        }
      };
    }

    const { summary, securityIssues } = errors;
    const statusEmoji = summary.criticalErrors > 0 ? '🔴' : 
                       summary.totalErrors > 0 ? '🟡' : '✅';
    
    const highSecurityIssues = securityIssues.filter((i: any) => i.severity === 'high');

    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*🐛 Error Scan:* ${statusEmoji} ${summary.totalErrors} errors found (${summary.criticalErrors} critical)`
      },
      fields: [
        Object.keys(summary.byType).length > 0 ? {
          type: 'mrkdwn',
          text: `*Error Types:*\n${Object.entries(summary.byType).map(([type, count]) => `• ${type}: ${count}`).join('\n')}`
        } : null,
        highSecurityIssues.length > 0 ? {
          type: 'mrkdwn',
          text: `*🔒 Security Issues:*\n${highSecurityIssues.map((i: any) => `• ${i.description}`).join('\n')}`
        } : null
      ].filter(Boolean)
    };
  }

  private buildAttachments(results: any): any[] {
    const attachments = [];

    // Add screenshots if visual analysis included them
    if (results.visual?.pages) {
      const firstPage = results.visual.pages[0];
      if (firstPage?.screenshot) {
        attachments.push({
          title: 'Homepage Screenshot',
          image_url: `data:image/png;base64,${firstPage.screenshot}`,
          color: this.getStatusColor(results.visual.overall.grade)
        });
      }
    }

    return attachments;
  }

  private calculateOverallStatus(results: any): any {
    let severity = 'success';
    let text = 'All checks passed';
    let emoji = '✅';

    // Critical failures
    if (results.puppeteer?.criticalPaths?.some((p: any) => p.status === 'broken') ||
        results.errors?.summary?.criticalErrors > 0 ||
        results.errors?.securityIssues?.some((i: any) => i.severity === 'high')) {
      severity = 'critical';
      text = 'Critical issues detected';
      emoji = '🚨';
    }
    // Major issues
    else if (results.lighthouse?.summary?.performance < 50 ||
             results.lighthouse?.summary?.accessibility < 70 ||
             results.visual?.overall?.grade === 'F' ||
             results.puppeteer?.failed > 0) {
      severity = 'warning';
      text = 'Performance or quality issues detected';
      emoji = '⚠️';
    }
    // Minor issues
    else if (results.lighthouse?.summary?.performance < 75 ||
             results.visual?.overall?.grade === 'C' ||
             results.errors?.summary?.totalErrors > 0) {
      severity = 'info';
      text = 'Minor issues to address';
      emoji = '💡';
    }

    return { severity, text, emoji };
  }

  private generateScoreChart(scores: any): string {
    // In a real implementation, this would generate a chart image
    // For now, return a placeholder
    return 'https://via.placeholder.com/200x100/ffffff/000000?text=Score+Chart';
  }

  private getStatusColor(grade: string): string {
    const colors = {
      'A': '#36a64f',
      'B': '#3aa3e3',
      'C': '#ff9900',
      'D': '#ff6600',
      'F': '#ff0000'
    };
    return colors[grade] || '#cccccc';
  }

  async reportError(deployment: any, error: Error): Promise<void> {
    await this.client.chat.postMessage({
      channel: this.config.channel,
      text: `🚨 Post-deployment validation failed for ${deployment.environment}`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🚨 Deployment Validation Failed'
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Environment: *${deployment.environment}*\nError: ${error.message}`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${this.config.mentionOnFailure.map(u => `<@${u}>`).join(' ')} Please investigate immediately.`
          }
        }
      ]
    });
  }
}
```

### 7. Configuration File

```yaml
# post-deploy-config.yaml
pipeline:
  enabled: true
  environments:
    - production
    - staging
  webhook_secret: ${POST_DEPLOY_WEBHOOK_SECRET}

lighthouse:
  categories:
    - performance
    - accessibility
    - best-practices
    - seo
  throttling: mobile
  pages:
    - path: /
      name: Homepage
    - path: /products
      name: Products Page
    - path: /checkout
      name: Checkout Flow
      waitForSelector: .checkout-form
    - path: /account/dashboard
      name: User Dashboard
      waitForSelector: .dashboard-content

puppeteer:
  viewport:
    width: 1920
    height: 1080
  timeout: 30000
  tests:
    - name: Critical - User Login Flow
      path: /login
      actions:
        - type: type
          selector: '#email'
          text: test@example.com
        - type: type
          selector: '#password'
          text: testpassword123
        - type: click
          selector: '#login-button'
        - type: wait
          selector: '.dashboard-content'
      assertions:
        - type: url-matches
          pattern: /dashboard
        - type: element-exists
          selector: .user-profile
        - type: no-console-errors
      screenshot: true
    
    - name: Critical - Checkout Process
      path: /products
      actions:
        - type: click
          selector: .product-card:first-child .add-to-cart
        - type: wait
          selector: .cart-notification
        - type: navigate
          path: /checkout
        - type: wait
          selector: .checkout-form
      assertions:
        - type: element-exists
          selector: .order-summary
        - type: text-contains
          selector: .cart-items
          text: '1 item'
      screenshot: true

    - name: Search Functionality
      path: /
      actions:
        - type: type
          selector: '#search-input'
          text: 'test product'
        - type: click
          selector: '#search-button'
        - type: wait
          selector: .search-results
      assertions:
        - type: element-exists
          selector: .search-results
        - type: url-matches
          pattern: /search\?q=test
      screenshot: false

    - name: Mobile Menu Navigation
      path: /
      actions:
        - type: click
          selector: .mobile-menu-toggle
        - type: wait
          selector: .mobile-menu
      assertions:
        - type: element-exists
          selector: .mobile-menu.open
      screenshot: true

visual:
  apiKey: ${OPENAI_API_KEY}
  model: gpt-4-vision-preview
  pages:
    - path: /
      name: Homepage
    - path: /products
      name: Product Listing
    - path: /product/sample
      name: Product Detail
    - path: /checkout
      name: Checkout Page
      waitForSelector: .checkout-form
  aspectsToAnalyze:
    - layout-consistency
    - color-contrast
    - visual-hierarchy
    - mobile-responsiveness
    - loading-state
    - accessibility-visual

errors:
  pages:
    - /
    - /products
    - /product/sample
    - /checkout
    - /account/dashboard
    - /api/health
  errorTypes:
    - javascript-errors
    - network-errors
    - 404-errors
    - mixed-content
    - cors-errors
    - csp-violations
  timeout: 60000

slack:
  token: ${SLACK_BOT_TOKEN}
  channel: deployment-alerts
  mentionOnFailure:
    - U123456789  # Tech lead user ID
    - U987654321  # DevOps lead user ID
  webhookUrl: ${SLACK_WEBHOOK_URL}

database:
  connectionString: ${DATABASE_URL}
  retention: 30  # days

# Performance thresholds for alerts
thresholds:
  lighthouse:
    performance: 70
    accessibility: 85
    seo: 80
  errors:
    critical: 0
    total: 5
  visual:
    minGrade: B
```

### 8. GitHub Actions Workflow

```yaml
# .github/workflows/post-deploy-validation.yml
name: Post-Deployment Validation

on:
  deployment_status:
    types: [created]

jobs:
  validate-deployment:
    if: github.event.deployment_status.state == 'success'
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run post-deployment validation
        env:
          DEPLOYMENT_URL: ${{ github.event.deployment.payload.web_url }}
          DEPLOYMENT_ID: ${{ github.event.deployment.id }}
          DEPLOYMENT_ENV: ${{ github.event.deployment.environment }}
          SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          npm run post-deploy:validate -- \
            --url "$DEPLOYMENT_URL" \
            --deployment-id "$DEPLOYMENT_ID" \
            --environment "$DEPLOYMENT_ENV" \
            --commit-hash "${{ github.sha }}" \
            --deployed-by "${{ github.actor }}"
      
      - name: Upload artifacts
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: deployment-validation-${{ github.event.deployment.id }}
          path: |
            reports/lighthouse/
            reports/screenshots/
            reports/errors/
            reports/summary.json
```

### 9. Usage Instructions

```markdown
## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install --save-dev \
     lighthouse \
     puppeteer \
     @slack/web-api \
     chrome-launcher \
     openai \
     source-map
   ```

2. **Configure Environment Variables**
   ```bash
   # .env
   SLACK_BOT_TOKEN=xoxb-your-token
   OPENAI_API_KEY=sk-your-key
   DATABASE_URL=postgresql://...
   POST_DEPLOY_WEBHOOK_SECRET=your-secret
   ```

3. **Set up Slack App**
   - Create a Slack app at api.slack.com
   - Add bot token scopes: chat:write, files:write
   - Install to workspace and get bot token

4. **Configure Deployment Webhook**
   - Add webhook to your deployment platform
   - Point to: `https://your-app.com/api/webhooks/post-deploy`
   - Include deployment info in payload

5. **Run Manually**
   ```bash
   npm run post-deploy:validate -- \
     --url https://staging.example.com \
     --environment staging
   ```

## Customization

### Adding New Pages to Test
Edit `post-deploy-config.yaml` and add pages to relevant sections:
- lighthouse.pages
- puppeteer.tests
- visual.pages
- errors.pages

### Adjusting Thresholds
Modify `thresholds` section in config to set acceptable limits.

### Adding Custom Tests
Create new test scenarios in puppeteer.tests with actions and assertions.

## Monitoring

- Dashboard: `https://your-app.com/deployment-metrics`
- Slack channel: #deployment-alerts
- Historical data retention: 30 days
```

This comprehensive post-deployment automation process provides:

1. **Lighthouse Audits** - Performance, accessibility, SEO, and best practices scoring
2. **Puppeteer Tests** - Functional testing of critical user paths
3. **GPT Visual Analysis** - AI-powered UX and visual consistency checking
4. **Error Scanning** - JavaScript errors, network issues, security vulnerabilities
5. **Slack Reporting** - Beautiful, actionable dashboard messages with all metrics

The system runs automatically after each deployment and provides immediate feedback to the team.