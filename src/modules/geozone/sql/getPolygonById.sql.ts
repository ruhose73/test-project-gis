export const getPolygonByIdSql = (geozoneId: string) => `
SELECT json_agg(json_build_object(
        'id',"id",
        'title',"title",
        'polygon',ST_AsGeoJSON("polygon")::jsonb
      ))
      FROM public."Geozone"
      WHERE id = '${geozoneId}';
`;
