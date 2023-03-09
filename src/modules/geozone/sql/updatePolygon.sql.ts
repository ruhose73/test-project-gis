export const updatePolygonSql = (
  geozoneId: string,
  title: string,
  linestring: string,
) => `
UPDATE public."Geozone"
SET 
    title = COALESCE('${title}', title), 
    polygon = COALESCE(ST_GeomFromText('POLYGON((${linestring}))', 4326), polygon)
WHERE id = '${geozoneId}';
`;
