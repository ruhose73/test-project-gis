export const getPolygonByIdSql = (geozoneId: string) =>`
SELECT json_agg(json_build_object(
        'title',"title",
        'polygon',ST_AsGeoJSON("polygon")::jsonb,
        'id',"id",
        'createDateTime',"createDateTime",
        'lastChangedDateTime',"lastChangedDateTime"
      ))
      FROM public."Geozone"
      WHERE id = '${geozoneId}';
`;
