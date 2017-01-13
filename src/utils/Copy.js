/**
 * Copy to clipboard
 */

import { spawn } from 'child_process';

const copy = spawn('pbcopy')

function Copy(data) {
  copy.stdin.write(data);
  copy.stdin.end();
}

export default Copy
