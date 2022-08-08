import { Router } from 'express';
import Path from 'path';
import { readdirSync, lstatSync } from 'fs';

const router = Router();

const modulesDirContent = readdirSync(Path.join(__dirname, '../modules'));

function getRoutes() {
  modulesDirContent.forEach(async (item) => {
    const currentItemPath = Path.join(__dirname, `../modules/${item}`);
    const isDirectory = lstatSync(currentItemPath).isDirectory();

    if (isDirectory) {
      const routerFilePath = Path.join(
        __dirname,
        `../modules/${item}/${item}.router.js`
      );
      const module = await import(routerFilePath);

      if (module && module.default) {
        router.use(`/${item}`, module.default);
      }
    }
  });
}
getRoutes();
export default router;
