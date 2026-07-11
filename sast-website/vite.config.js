import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom dev-server API to fetch and save local JSON data files
function localCmsPlugin() {
  return {
    name: 'local-cms-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/')) {
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          
          if (req.method === 'GET' && url.pathname === '/api/data') {
            const type = url.searchParams.get('type');
            const allowedTypes = ['projects', 'achievements', 'events', 'team', 'divisions', 'about'];
            if (!allowedTypes.includes(type)) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid type' }));
              return;
            }
            try {
              const filePath = path.resolve(process.cwd(), `src/data/${type}.json`);
              if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf-8');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
              } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'File not found' }));
              }
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
            return;
          }
          
          if (req.method === 'POST' && url.pathname === '/api/save') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const payload = JSON.parse(body);
                const { type, data } = payload;
                const allowedTypes = ['projects', 'achievements', 'events', 'team', 'divisions', 'about'];
                if (!allowedTypes.includes(type)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Invalid type' }));
                  return;
                }
                
                const filePath = path.resolve(process.cwd(), `src/data/${type}.json`);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true }));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            });
            return;
          }
        }
        next();
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localCmsPlugin()],
})

