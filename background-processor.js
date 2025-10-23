const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

/**
 * Background Processor for Mail Server Factory
 * Handles long-running tasks without blocking the main process
 */

class BackgroundProcessor {
    constructor() {
        this.tasks = {};
        this.statusFile = path.join(__dirname, 'processor-status.json');
        this.loadStatus();
    }

    /**
     * Load status from file
     */
    loadStatus() {
        try {
            if (fs.existsSync(this.statusFile)) {
                const data = fs.readFileSync(this.statusFile, 'utf8');
                this.tasks = JSON.parse(data);
            }
        } catch (error) {
            console.error('Failed to load processor status:', error.message);
            this.tasks = {};
        }
    }

    /**
     * Save status to file
     */
    saveStatus() {
        try {
            fs.writeFileSync(this.statusFile, JSON.stringify(this.tasks, null, 2));
        } catch (error) {
            console.error('Failed to save processor status:', error.message);
        }
    }

    /**
     * Start a background task
     */
    async startTask(taskId, command, args = [], options = {}) {
        return new Promise((resolve, reject) => {
            console.log(`🚀 Starting background task: ${taskId}`);

            this.tasks[taskId] = {
                id: taskId,
                command,
                args,
                status: 'running',
                startTime: new Date().toISOString(),
                progress: 0,
                logs: [],
                pid: null
            };

            const child = spawn(command, args, {
                stdio: ['pipe', 'pipe', 'pipe'],
                ...options
            });

            this.tasks[taskId].pid = child.pid;
            this.saveStatus();

            // Handle stdout
            child.stdout.on('data', (data) => {
                const output = data.toString().trim();
                if (output) {
                    this.tasks[taskId].logs.push({ type: 'stdout', message: output, timestamp: new Date().toISOString() });
                    console.log(`[${taskId}] ${output}`);
                }
            });

            // Handle stderr
            child.stderr.on('data', (data) => {
                const output = data.toString().trim();
                if (output) {
                    this.tasks[taskId].logs.push({ type: 'stderr', message: output, timestamp: new Date().toISOString() });
                    console.error(`[${taskId}] ${output}`);
                }
            });

            // Handle completion
            child.on('close', (code) => {
                this.tasks[taskId].status = code === 0 ? 'completed' : 'failed';
                this.tasks[taskId].endTime = new Date().toISOString();
                this.tasks[taskId].exitCode = code;
                this.tasks[taskId].progress = 100;
                this.saveStatus();

                if (code === 0) {
                    console.log(`✅ Task ${taskId} completed successfully`);
                    resolve(this.tasks[taskId]);
                } else {
                    console.error(`❌ Task ${taskId} failed with code ${code}`);
                    reject(new Error(`Task failed with code ${code}`));
                }
            });

            // Handle errors
            child.on('error', (error) => {
                this.tasks[taskId].status = 'failed';
                this.tasks[taskId].error = error.message;
                this.tasks[taskId].endTime = new Date().toISOString();
                this.saveStatus();

                console.error(`❌ Task ${taskId} error:`, error.message);
                reject(error);
            });
        });
    }

    /**
     * Start translation task
     */
    async startTranslationTask(targetLang, missingKeys = null) {
        const taskId = `translate-${targetLang}-${Date.now()}`;

        let args = ['offline-translation-manager.js', 'translate-missing', targetLang];

        if (missingKeys && missingKeys.length > 0) {
            // Create temp file with missing keys
            const tempFile = path.join(__dirname, `temp-missing-${targetLang}.json`);
            fs.writeFileSync(tempFile, JSON.stringify(missingKeys));
            args.push('--keys-file', tempFile);
        }

        return this.startTask(taskId, 'node', args);
    }

    /**
     * Start comprehensive test task
     */
    async startTestTask(url = 'http://localhost:4000') {
        const taskId = `test-${Date.now()}`;
        return this.startTask(taskId, 'node', ['comprehensive-test-runner.js', url]);
    }

    /**
     * Start batch processing task
     */
    async startBatchProcessingTask() {
        const taskId = `batch-process-${Date.now()}`;
        return this.startTask(taskId, 'node', ['offline-translation-manager.js', 'process-batch']);
    }

    /**
     * Get task status
     */
    getTaskStatus(taskId) {
        return this.tasks[taskId] || null;
    }

    /**
     * Get all tasks
     */
    getAllTasks() {
        return Object.values(this.tasks);
    }

    /**
     * Get running tasks
     */
    getRunningTasks() {
        return Object.values(this.tasks).filter(task => task.status === 'running');
    }

    /**
     * Kill a running task
     */
    killTask(taskId) {
        const task = this.tasks[taskId];
        if (task && task.status === 'running' && task.pid) {
            try {
                process.kill(task.pid, 'SIGTERM');
                task.status = 'killed';
                task.endTime = new Date().toISOString();
                this.saveStatus();
                console.log(`🛑 Killed task: ${taskId}`);
                return true;
            } catch (error) {
                console.error(`Failed to kill task ${taskId}:`, error.message);
                return false;
            }
        }
        return false;
    }

    /**
     * Clean up old completed tasks
     */
    cleanupOldTasks(maxAgeHours = 24) {
        const cutoff = new Date();
        cutoff.setHours(cutoff.getHours() - maxAgeHours);

        let cleaned = 0;
        for (const [taskId, task] of Object.entries(this.tasks)) {
            if (task.endTime && new Date(task.endTime) < cutoff) {
                delete this.tasks[taskId];
                cleaned++;
            }
        }

        if (cleaned > 0) {
            this.saveStatus();
            console.log(`🧹 Cleaned up ${cleaned} old tasks`);
        }

        return cleaned;
    }

    /**
     * Get status summary
     */
    getStatusSummary() {
        const tasks = Object.values(this.tasks);
        const summary = {
            total: tasks.length,
            running: tasks.filter(t => t.status === 'running').length,
            completed: tasks.filter(t => t.status === 'completed').length,
            failed: tasks.filter(t => t.status === 'failed').length,
            killed: tasks.filter(t => t.status === 'killed').length
        };

        return summary;
    }
}

// CLI interface
async function main() {
    const processor = new BackgroundProcessor();
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'start-translation':
            if (args.length < 2) {
                console.error('Usage: node background-processor.js start-translation <lang> [keys-file]');
                process.exit(1);
            }
            const lang = args[1];
            let keys = null;
            if (args[2]) {
                keys = JSON.parse(fs.readFileSync(args[2], 'utf8'));
            }
            await processor.startTranslationTask(lang, keys);
            break;

        case 'start-test':
            const url = args[1] || 'http://localhost:4000';
            await processor.startTestTask(url);
            break;

        case 'start-batch':
            await processor.startBatchProcessingTask();
            break;

        case 'status':
            const summary = processor.getStatusSummary();
            console.log('📊 Background Processor Status:');
            console.log(JSON.stringify(summary, null, 2));

            const running = processor.getRunningTasks();
            if (running.length > 0) {
                console.log('\n🏃 Running Tasks:');
                running.forEach(task => {
                    console.log(`  ${task.id} (PID: ${task.pid}) - Started: ${task.startTime}`);
                });
            }
            break;

        case 'list':
            const allTasks = processor.getAllTasks();
            console.log('📋 All Tasks:');
            allTasks.forEach(task => {
                console.log(`  ${task.id}: ${task.status} (${task.startTime})`);
            });
            break;

        case 'kill':
            if (args.length < 2) {
                console.error('Usage: node background-processor.js kill <task-id>');
                process.exit(1);
            }
            const taskId = args[1];
            const killed = processor.killTask(taskId);
            console.log(killed ? '✅ Task killed' : '❌ Failed to kill task');
            break;

        case 'cleanup':
            const cleaned = processor.cleanupOldTasks();
            console.log(`🧹 Cleaned up ${cleaned} old tasks`);
            break;

        default:
            console.log('📖 Background Processor Commands:');
            console.log('  start-translation <lang> [keys-file]  Start translation task');
            console.log('  start-test [url]                      Start comprehensive test');
            console.log('  start-batch                           Start batch processing');
            console.log('  status                                Show status summary');
            console.log('  list                                  List all tasks');
            console.log('  kill <task-id>                        Kill running task');
            console.log('  cleanup                               Clean old completed tasks');
            break;
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = BackgroundProcessor;