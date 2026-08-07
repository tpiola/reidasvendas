#!/usr/bin/env node
import { rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const generatedDir = join(scriptsDir, '..', '.next');

rmSync(generatedDir, { recursive: true, force: true });
