export const deletePolygonSql = (geozoneId:string) => `
DELETE FROM public."Geozone" WHERE id = '${geozoneId}';
;`
