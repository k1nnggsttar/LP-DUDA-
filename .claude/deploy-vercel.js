// Hook PostToolUse: publica na Vercel sempre que o index.html desta pasta for editado.
let s = '';
process.stdin.on('data', (d) => (s += d)).on('end', () => {
  let p = '';
  try { p = JSON.parse(s).tool_input.file_path || ''; } catch {}
  if (!/[\\/]12\.12[\\/]index\.html$/i.test(p)) return;
  const r = require('child_process').spawnSync('npx', ['--yes', 'vercel', 'deploy', '--prod', '--yes'], {
    cwd: require('path').join(__dirname, '..'), shell: true, encoding: 'utf8',
  });
  const msg = r.status === 0
    ? 'Vercel atualizada: https://a-chave-do-exito.vercel.app'
    : 'Falha no deploy da Vercel: ' + ((r.stderr || '') + (r.stdout || '')).slice(-300);
  console.log(JSON.stringify({ systemMessage: msg }));
});
