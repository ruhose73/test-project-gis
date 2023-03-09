export const checkCoordinatesInGeozonsSql = (dto: any) => `
SELECT json_build_object(
    'id',"id",
    'title',"title",
    'polygon',ST_AsGeoJSON("polygon")::jsonb
  ) 
  FROM public."Geozone" 
  WHERE ST_Intersects(polygon, ST_GeomFromText('POINT(${dto.lng} ${dto.lat})', 4326));
`;
