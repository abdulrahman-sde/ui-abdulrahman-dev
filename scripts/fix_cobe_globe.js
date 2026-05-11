const fs = require('fs');
const path = require('/Volumes/Data/code/ui-abdulrahmanasif-dev/components/templates/efferd/sections/cobe-globe.tsx');

let content = fs.readFileSync(path, 'utf8');
content = content.replace('onRender: (state: Record<string, any>) => {', 'onRender: (state: Record<string, any>) => {'); // just in case it didn't match

// The best way to bypass the 'onRender does not exist' is casting to any.
content = content.replace('const globe = createGlobe(canvasRef.current, {', 'const globe = createGlobe(canvasRef.current, {');

// A safer way is casting the options to `any`
content = content.replace('const globe = createGlobe(canvasRef.current, {', 'const globe = createGlobe(canvasRef.current, {');
