export const checkPolygonSql = (title: string) => `
SELECT id, title FROM public."Geozone" WHERE title = '${title}';
;`;
