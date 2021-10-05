import { pascalCase } from 'change-case';
import fs from 'fs/promises';
import { JSONSchema4 } from 'json-schema';
import { compile } from 'json-schema-to-typescript';
import { singular } from 'pluralize'
import path from 'path';
import { apiSchemaToJsonSchema } from './schema';

/** 結果ファイル */
type SchemaDef = {
  apiName: string;
  schema: JSONSchema4;
};

/** スキーマのディレクトリ */
const schemasDir = path.join(__dirname, '..', 'schemas');

/** JSON ファイル名から apiName を取得する */
const getApiName = (fileName: string): string | null => {
  const basename = path.basename(fileName);
  const matches = /^api-(.+)(?:-[0-9]+)\.json$/.exec(basename);

  return matches && singular(pascalCase(matches[1]));
};

/** メインプロセス */
(async function main() {
  const dirFiles = await fs.readdir(schemasDir);
  const schemas = await Promise.all(
    dirFiles.map(async (fileName): Promise<SchemaDef | null> => {
      const filePath = path.join(schemasDir, fileName);
      const stat = await fs.stat(filePath);
      const extname = path.extname(filePath);

      // JSON ファイル以外の場合は終了
      if (!stat.isFile() || extname !== '.json') {
        return null;
      }

      const json = JSON.parse(await fs.readFile(filePath, 'utf-8'));
      const apiName = getApiName(fileName);

      if (!json || !apiName) {
        return null;
      }

      return { apiName, schema: apiSchemaToJsonSchema(json) };
    })
  );

  console.log(
    await Promise.all(
      schemas
        .filter((v): v is NonNullable<typeof v> => v != null)
        .map(async ({ apiName, schema }) => await compile(schema, `${apiName}Schema`, { bannerComment: '' }))
    )
  );
})();
